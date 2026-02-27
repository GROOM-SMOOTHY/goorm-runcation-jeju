import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/supabase";

/**
 * 그룹 총 지출 금액 조회
 * @param groupId - 그룹 ID
 * @returns 그룹 총 지출 금액
 */
export async function getGroupTotalExpenses(groupId: string): Promise<number> {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("group_id", groupId);

  if (error) {
    throw error;
  }

  return data.reduce((acc, cur) => acc + cur.total_amount, 0);
}

/**
 * 최근 정산 내역 조회 (3개)
 * @param groupId - 그룹 ID
 * @returns 최근 정산 내역
 */
export async function getRecentSettlements(userId: string): Promise<
  (Tables<"expense_participants"> & {
    payer: Tables<"users">;
    expense: Tables<"expenses">;
  })[]
> {
  const { data, error } = await supabase
    .from("expense_participants")
    .select(
      `
      *,
      payer:users (
        id,
        nickname,
        profile
      ),
      expense:expenses (
        *
      )
    `,
    )
    .eq("user_id", userId)
    .limit(3);

  if (error) {
    throw error;
  }

  return data;
}
