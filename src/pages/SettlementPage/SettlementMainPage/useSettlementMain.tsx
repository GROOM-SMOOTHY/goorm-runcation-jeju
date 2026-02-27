import {
  getGroupTotalExpenses,
  getRecentSettlements,
} from "@/services/expensesService";
import { useGroup, useUser } from "@/store";
import type { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import { getGroupMemberAccountInfos } from "@/services/accountInfosService";

export default function useSettlementMain() {
  const { group } = useGroup();
  const { id: userId } = useUser();

  const [memberAccountInfos, setMemberAccountInfos] = useState<
    (Tables<"account_infos"> & { users?: Tables<"users"> | null })[]
  >([]);
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

    getGroupMemberAccountInfos(group.id).then((accountInfos) => {
      setMemberAccountInfos(accountInfos);
    });
  }, [group, userId]);

  return {
    totalExpenses,
    recentSettlements,
    memberAccountInfos: memberAccountInfos.map((info) => ({
      name: info.users?.nickname ?? "",
      initial: info.users?.nickname?.[0] ?? "",
      bank: info.bank_name,
      account: info.account_number,
      accountForCopy: info.account_number,
      color: "orange",
    })),
    group,
  };
}
