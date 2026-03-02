import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/supabase";

/**
 * 방명록 조회 (author, group, photo 1:1 매칭)
 */
export type GuestBook = Tables<"guestbook_posts"> & {
  author: Tables<"users">;
  group: Tables<"groups">;
  photo: Tables<"photos"> | null;
};

export async function getGuestBookList(): Promise<GuestBook[]> {
  const { data: posts, error } = await supabase
    .from("guestbook_posts")
    .select("*, author:author_id(*), group:group_id(*)")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  if (!posts?.length) {
    return [];
  }

  const postIds = posts.map((p) => p.id);

  const { data: photosData, error: photosError } = await supabase
    .from("photos")
    .select("*")
    .in("type", ["place"])
    .in("content_id", postIds)
    .order("order", { ascending: true });

  if (photosError) {
    throw photosError;
  }

  const photoByPostId = new Map<string, (typeof photosData)[0]>();
  photosData?.forEach((photo) => {
    if (photo.content_id && !photoByPostId.has(photo.content_id)) {
      photoByPostId.set(photo.content_id, photo);
    }
  });

  return posts.map((post) => ({
    ...post,
    photo: photoByPostId.get(post.id) ?? null,
  }));
}
