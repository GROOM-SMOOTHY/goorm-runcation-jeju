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
  onSettleStatusChange?: () => void | Promise<void>;
}

export default function useSettleCard({
  expanded,
  expenseId,
  onSettleStatusChange,
}: Props) {
  const [expense, setExpense] = useState<ExpenseDetail | null>(null);
  const [members, setMembers] = useState<ExpenseParticipantRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id: userId } = useUser((state) => state);

  useEffect(() => {
    if (!expenseId || !expanded) return;
    setIsLoading(true);
    const fetchExpenseDetail = async () => {
      try {
        const expenseDetail = await getExpenseDetail(expenseId);
        setExpense(expenseDetail);
        setMembers(expenseDetail.participants);
      } finally {
        setIsLoading(false);
      }
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

      await onSettleStatusChange?.();
    }
  };

  return {
    expense,
    members,
    isLoading,
    handleMySettleStatusToggle,
  };
}
