import {
  getExpenseDetail,
  type ExpenseDetail,
} from "@/services/expensesService";
import { useEffect, useState } from "react";

interface Props {
  expanded: boolean;
  expenseId: string;
}

export default function useSettleCard({ expanded, expenseId }: Props) {
  const [expense, setExpense] = useState<ExpenseDetail | null>(null);

  useEffect(() => {
    if (!expenseId || !expanded) return;
    const fetchExpenseDetail = async () => {
      const expenseDetail = await getExpenseDetail(expenseId);
      setExpense(expenseDetail);
    };

    fetchExpenseDetail();
  }, [expenseId, expanded]);

  return {
    expense,
    members: expense?.participants ?? [],
  };
}
