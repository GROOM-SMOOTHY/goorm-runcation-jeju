import {
  getExpenseDetail,
  updateMySettleStatus,
  type ExpenseDetail,
  type ExpenseParticipantRow,
} from "@/services/expensesService";
import { useUser } from "@/store";
import { useEffect, useState } from "react";

interface Props {
  expanded: boolean;
  expenseId: string;
}

export default function useSettleCard({ expanded, expenseId }: Props) {
  const [expense, setExpense] = useState<ExpenseDetail | null>(null);
  const [members, setMembers] = useState<ExpenseParticipantRow[]>([]);
  const { id: userId } = useUser((state) => state);
  useEffect(() => {
    if (!expenseId || !expanded) return;
    const fetchExpenseDetail = async () => {
      const expenseDetail = await getExpenseDetail(expenseId);
      setExpense(expenseDetail);
      setMembers(expenseDetail.participants);
    };

    fetchExpenseDetail();
  }, [expenseId, expanded]);

  const handleMySettleStatusToggle = async (state: "COMPLETE" | "PENDING") => {
    if (!expense) return;

    const result = await updateMySettleStatus(expense.id, userId, state);

    if (result) {
      const myInfoIndex = members.findIndex((m) => m.user_id === userId);

      if (myInfoIndex !== -1) {
        setMembers((prev) => {
          const newMembers = [...prev];
          newMembers[myInfoIndex] = {
            ...newMembers[myInfoIndex],
            state,
          };
          return newMembers;
        });
      }
    }
  };

  return {
    expense,
    members,
    handleMySettleStatusToggle,
  };
}
