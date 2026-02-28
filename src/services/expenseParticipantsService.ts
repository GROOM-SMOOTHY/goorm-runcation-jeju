/**
 * 내 미정산 내역 개수 조회
 */

import { supabase } from "@/lib/supabase";

export async function getMyPendingSettlementCount(
  userId: string,
): Promise<number> {
  const { data, error } = await supabase
    .from("expense_participants")
    .select("*")
    .eq("user_id", userId)
    .eq("state", "PENDING");

  if (error) {
    throw error;
  }

  return data.length;
}
