import { format } from "date-fns";
import SettleCard from "@/components/pages/settlement-history-page/SettleCard/SettleCard";
import SettlementFilter from "@/components/pages/settlement-main-page/SettlementFilter/SettlementFilter";
import type { SettlementRow } from "@/services/expensesService";
import type { SettlementFilterType } from "./useSettlementList";
import styles from "./SettlementListPage.module.css";

interface Props {
  settlements: SettlementRow[];
  userId: string | undefined;
  filter: SettlementFilterType;
  setFilter: (filter: SettlementFilterType) => void;
}

export default function SettlementCardList({
  settlements,
  userId,
  filter,
  setFilter,
}: Props) {
  return (
    <>
      <SettlementFilter filter={filter} setFilter={setFilter} />
      <div className={styles.cardList}>
        {settlements.map((s) => (
          <SettleCard
            key={s.id}
            expenseId={s.id}
            title={s.payment_title}
            category={s.category ?? "etc"}
            expenseDate={
              s.expense_date ? format(new Date(s.expense_date), "yy.MM.dd") : ""
            }
            memberCount={s.participants.length}
            isProgressFull={s.participants.every((p) => p.state === "COMPLETE")}
            isPaid={
              s.participants.find(
                (p) => p.user_id === userId && p.state === "COMPLETE",
              ) !== undefined
            }
          />
        ))}
      </div>
    </>
  );
}
