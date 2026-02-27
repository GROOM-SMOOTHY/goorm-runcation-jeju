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
      expense: Tables<"expenses"> & {
        payer: Tables<"users">;
      };
    })[]
  >([]);

  useEffect(() => {
    if (!group) return;
    if (!userId) return;

    getGroupTotalExpenses(group.id).then((total) => {
      setTotalExpenses(total);
    });

    getRecentSettlements(userId).then((settlements) => {
      setRecentSettlements(settlements);
    });
  }, [group, userId]);

  return {
    totalExpenses,
    recentSettlements,
    group,
  };
}
