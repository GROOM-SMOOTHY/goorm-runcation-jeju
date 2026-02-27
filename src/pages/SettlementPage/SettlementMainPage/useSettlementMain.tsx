import {
  getGroupTotalExpenses,
  getRecentSettlements,
} from "@/services/expensesService";
import { useGroup, useUser } from "@/store";
import type { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";

export default function useSettlementMain() {
  const { group } = useGroup();
  const { id: userId } = useUser();
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [recentSettlements, setRecentSettlements] = useState<
    (Tables<"expense_participants"> & {
      payer: Tables<"users">;
      expense: Tables<"expenses">;
    })[]
  >([]);

  useEffect(() => {
    if (!group) return;

    getGroupTotalExpenses(group.id).then((total) => {
      setTotalExpenses(total);
    });

    getRecentSettlements(userId).then((settlements) => {
      setRecentSettlements(settlements);
    });
  }, []);

  return {
    totalExpenses,
    recentSettlements,
    group,
  };
}
