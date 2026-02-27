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
 * @param userId - 내 id
 * @returns 최근 정산 내역
 */
export async function getRecentSettlements(userId: string): Promise<
  (Tables<"expense_participants"> & {
    expense: Tables<"expenses"> & {
      payer: Tables<"users">;
    };
  })[]
> {
  const { data, error } = await supabase
    .from("expense_participants")
    .select(
      `
      *,
      expense:expenses (
        *,
        payer:users (
          id,
          nickname,
          profile
        )
      )
      `,
    )
    .eq("user_id", userId)
    .limit(3);

  if (error) {
    throw error;
  }

  // Supabase 타입 추론 한계로 data가 null일 수 있음. 빈 배열 반환
  return data ?? [];
}
