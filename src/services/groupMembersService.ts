import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/supabase";

/**
 * 그룹 맴버 리스트 조회
 */
export async function getGroupMembers(
  groupId: string,
): Promise<Tables<"group_members">[]> {
  const { data, error } = await supabase
    .from("group_members")
    .select("*")
    .eq("group_id", groupId);

  if (error) {
    throw error;
  }

  return data;
}
