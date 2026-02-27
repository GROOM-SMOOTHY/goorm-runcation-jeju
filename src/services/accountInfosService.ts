import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/supabase";
import { getGroupMembers } from "./groupMembersService";

/**
 * 맴버 계좌 정보 가져오기
 */
export async function getGroupMemberAccountInfos(
  groupId: string,
): Promise<(Tables<"account_infos"> & { users?: Tables<"users"> | null })[]> {
  const groupMembers = await getGroupMembers(groupId);
  const userIds = groupMembers.map((m) => m.user_id);

  if (userIds.length === 0) {
    return [];
  }

  // LEFT JOIN account_infos.user_id = users.id
  const { data, error } = await supabase
    .from("account_infos")
    .select("*, users:user_id(*)") // left join users on user_id
    .eq("group_id", groupId)
    .in("user_id", userIds);

  if (error) {
    throw error;
  }

  return data ?? [];
}
