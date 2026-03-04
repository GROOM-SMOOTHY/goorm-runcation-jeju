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

/**
 * 지금까지 낸 금액, 내야할 금액 조회
 */
export async function getTotalPaidAndToPay(
  groupId: string,
  userId: string,
  type: "paid" | "toPay",
): Promise<number> {
  const { data, error } = await supabase
    .from("expense_participants")
    .select("amount, expense:expenses(group_id)")
    .eq("expense.group_id", groupId)
    .eq("user_id", userId)
    .eq("state", type === "paid" ? "COMPLETE" : "PENDING");

  if (error) {
    throw error;
  }

  // Sum up amounts
  const sum = (data ?? []).reduce((acc, cur) => acc + (cur.amount ?? 0), 0);
  return sum;
}
