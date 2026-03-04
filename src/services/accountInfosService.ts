import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/supabase";

/**
 * 맴버 계좌 정보 가져오기
 */
export async function getGroupMemberAccountInfos(
  groupId: string,
): Promise<(Tables<"account_infos"> & { users?: Tables<"users"> | null })[]> {
  // LEFT JOIN account_infos.user_id = users.id
  const { data, error } = await supabase
    .from("account_infos")
    .select("*, users:user_id(*)") // left join users on user_id
    .eq("group_id", groupId);

  if (error) {
    throw error;
  }

  console.log(data);

  return data ?? [];
}
