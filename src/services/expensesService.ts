import { supabase } from "@/lib/supabase";
import type {
  SettlementType,
  SettlementFilterType,
} from "@/pages/SettlementPage/SettlementListPage/useSettlementList";
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

/** expense_participants row with user join */
type ParticipantRow = Tables<"expense_participants"> & {
  user: Pick<Tables<"users">, "id" | "nickname" | "profile">;
};

/** getSettlements 반환 타입 */
export type SettlementRow = Tables<"expenses"> & {
  payer: Pick<Tables<"users">, "id" | "nickname" | "profile"> | null;
  participants: ParticipantRow[];
};

interface GetSettlementListParams {
  groupId: string;
  userId: string;
  type: SettlementType;
  filter: SettlementFilterType;
}

/**
 * 정산 내역 조회
 * @param type - 'all': 전체 정산, 'my': 내가 참여한 정산
 * @param filter - 'pending': 미완료, 'completed': 완료
 *   - type='all' + filter='pending': 전체 정산이 미완료된 것 (모든 참여자 미입금)
 *   - type='all' + filter='completed': 전체 정산이 완료된 것 (모든 참여자 입금 완료)
 *   - type='my' + filter='pending': 내 정산이 미완료된 것 (내가 아직 안 냄)
 *   - type='my' + filter='completed': 내 정산이 완료된 것 (내가 돈 냄)
 */
export async function getSettlements({
  groupId,
  userId,
  type,
  filter,
}: GetSettlementListParams): Promise<SettlementRow[]> {
  const { data, error } = await supabase
    .from("expenses")
    .select(
      `
      *,
      payer:users (
        id,
        nickname,
        profile
      ),
      participants:expense_participants (
        *,
        user:users (id, nickname, profile)
      )
    `,
    )
    .eq("group_id", groupId)
    .order("expense_date", { ascending: false });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as SettlementRow[];

  return rows.filter((row) => {
    const participants = row.participants ?? [];
    const totalCount = participants.length;

    // 전체 정산 완료 여부: 모든 참여자가 COMPLETE
    const allCompleted =
      totalCount > 0 && participants.every((p) => p.state === "COMPLETE");

    // 전체 정산 미완료 여부: 모든 참여자가 PENDING (아무도 안 냄)
    const allPending =
      totalCount > 0 && participants.some((p) => p.state === "PENDING");

    // 내 참여 여부 및 내 입금 상태
    const myParticipant = participants.find((p) => p.user_id === userId);
    const isMeInvolved = myParticipant != null;
    const isMeCompleted = myParticipant?.state === "COMPLETE";

    if (type === "all") {
      if (filter === "pending") {
        return allPending;
      }
      if (filter === "completed") {
        return allCompleted;
      }
    }

    if (type === "my") {
      if (!isMeInvolved) return false;
      if (filter === "pending") {
        return !isMeCompleted;
      }
      if (filter === "completed") {
        return isMeCompleted;
      }
    }

    return true;
  });
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

  return data ?? [];
}

/**
 * 지출 내역 상세 조회
 */

export type ExpenseParticipantRow = Tables<"expense_participants"> & {
  user: Tables<"users">;
};
export type ExpenseDetail = Tables<"expenses"> & {
  payer: Tables<"users"> & {
    account_id: string;
    account_bank: Tables<"account_infos">[];
  };
  participants: ExpenseParticipantRow[];
};

export async function getExpenseDetail(
  expenseId: string,
): Promise<ExpenseDetail> {
  const { data, error } = await supabase
    .from("expenses")
    .select(
      `
      *, 
      payer:users (
        id, 
        nickname, 
        profile,
        account_id,
        account_bank:account_infos (id, account_holder, account_number, bank_name)
      ), 
      participants:expense_participants (
        *,
        user:users (id, nickname, profile)
      )
        `,
    )
    .eq("id", expenseId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * 내 정산 상태 변경
 */
export async function updateMySettleStatus(
  expenseId: string,
  userId: string,
  state: "COMPLETE" | "PENDING",
): Promise<boolean> {
  const { error } = await supabase
    .from("expense_participants")
    .update({ state })
    .eq("expense_id", expenseId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return true;
}
