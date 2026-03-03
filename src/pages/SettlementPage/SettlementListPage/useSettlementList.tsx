import { getSettlements, type SettlementRow } from "@/services/expensesService";
import { useGroup, useUser } from "@/store";
import { useEffect, useState } from "react";

export type SettlementType = "all" | "my";
export type SettlementFilterType = "pending" | "completed";

export default function useSettlementList() {
  const [type, setType] = useState<SettlementType>("all");
  const [filter, setFilter] = useState<SettlementFilterType>("pending");
  const [settlements, setSettlements] = useState<SettlementRow[]>([]);
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

  return {
    type,
    setType,
    filter,
    setFilter,
    settlements,
  };
}
