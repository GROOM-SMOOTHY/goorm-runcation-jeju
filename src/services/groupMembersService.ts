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

/**
 * 그룹 맴버 리스트 조회 ( 유저 정보 포함 )
 * @param groupId 그룹 ID
 * @returns
 */
export async function getGroupMembersWithUsers(
  groupId: string,
): Promise<(Tables<"group_members"> & { user: Tables<"users"> })[]> {
  const { data, error } = await supabase
    .from("group_members")
    .select("*, user:user_id(*)")
    .eq("group_id", groupId);

  if (error) {
    throw error;
  }

  return data;
}
