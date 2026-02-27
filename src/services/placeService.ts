import { supabase } from "@/lib/supabase";
import type { TablesInsert } from "@/types/supabase";
import { uploadImage } from "@/utils/supabase/storage";

interface AddStampParams extends TablesInsert<"places"> {
  file: File;
}

export async function addPlaces(params: AddStampParams) {
  const imageUploadUrl = await uploadImage("images/stamp", params.file);
  if (!imageUploadUrl) {
    throw new Error("이미지 업로드에 실패했습니다");
  }

  const { data: placeData, error: insertPlaceError } = await supabase
    .from("places")
    .insert({
      ...params,
      file: undefined,
    })
    .select()
    .single();

  if (insertPlaceError) {
    throw new Error(insertPlaceError.message);
  }

  if (!placeData) {
    throw new Error("도장 찍기에 실패했습니다");
  }

  const { data: photoData, error: insertPhotoError } = await supabase
    .from("photos")
    .insert({
      type: "place",
      content_id: placeData.id,
      order: 0,
      image_url: imageUploadUrl,
    })
    .select()
    .single();

  if (insertPhotoError) {
    await supabase.from("places").delete().eq("id", placeData.id);
    throw new Error(insertPhotoError.message);
  }

  if (!photoData) {
    await supabase.from("places").delete().eq("id", placeData.id);
    throw new Error("이미지 업로드에 실패했습니다");
  }

  return {
    ...placeData,
  };
}

export async function getPlaces(userId: string) {
  const { data: places, error } = await supabase
    .from("places")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  if (!places?.length) {
    return [];
  }

  const placeIds = places.map((p) => p.id);

  const { data: photosData, error: photosError } = await supabase
    .from("photos")
    .select("*")
    .eq("type", "place")
    .in("content_id", placeIds)
    .order("order", { ascending: true });

  if (photosError) {
    throw new Error(photosError.message);
  }

  const photoByPlaceId = new Map<string, (typeof photosData)[0]>();
  photosData?.forEach((photo) => {
    if (photo.content_id && !photoByPlaceId.has(photo.content_id)) {
      photoByPlaceId.set(photo.content_id, photo);
    }
  });

  return places.map((place) => ({
    ...place,
    photo: photoByPlaceId.get(place.id) ?? null,
  }));
}
