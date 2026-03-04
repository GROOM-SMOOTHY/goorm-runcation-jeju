import { getTotalPaidAndToPay } from "@/services/expenseParticipantsService";
import { getSettlements, type SettlementRow } from "@/services/expensesService";
import { useGroup, useUser } from "@/store";
import { useEffect, useState } from "react";

export type SettlementType = "all" | "my";
export type SettlementFilterType = "pending" | "completed";

export default function useSettlementList() {
  const [type, setType] = useState<SettlementType>("all");
  const [filter, setFilter] = useState<SettlementFilterType>("pending");
  const [settlements, setSettlements] = useState<SettlementRow[]>([]);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalToPay, setTotalToPay] = useState<number>(0);
  const { id: userId } = useUser();
  const { group } = useGroup();

  useEffect(() => {
    const fetchSettlements = async () => {
      const data = await getSettlements({
        userId,
        groupId: group?.id ?? "",
        type,
        filter,
      });

      setSettlements(data);
    };

    fetchSettlements();
  }, [userId, group?.id, type, filter]);

  useEffect(() => {
    const fetchTotalPaidAndToPay = async () => {
      const groupId = group?.id ?? "";

      const paid = await getTotalPaidAndToPay(groupId, userId, "paid");
      const toPay = await getTotalPaidAndToPay(groupId, userId, "toPay");
      setTotalPaid(paid);
      setTotalToPay(toPay);
    };

    fetchTotalPaidAndToPay();
  }, [userId, group?.id]);

  return {
    type,
    setType,
    filter,
    setFilter,
    settlements,
    totalPaid,
    totalToPay,
  };
}
