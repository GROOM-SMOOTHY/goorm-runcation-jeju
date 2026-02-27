import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import GroupPaymentStateCard from "@/components/pages/settlement-main-page/GroupPaymentStateCard/GroupPaymentStateCard";
import MemberAccountCard from "@/components/pages/settlement-main-page/MemberAccountCard/MemberAccountCard";
import PayHistoryCard from "@/components/pages/settlement-main-page/PayHistoryCard";
import styles from "@/pages/SettlementPage/SettlementMainPage/SettlementMainPage.module.css";
import useSettlementMain from "./useSettlementMain";

export default function SettlementMainPage() {
  const navigate = useNavigate();

  const { totalExpenses, group, recentSettlements, memberAccountInfos } =
    useSettlementMain();

  return (
    <div className={styles.page}>
      <Header title="정산" onBack={() => navigate(-1)} />

      <main className={styles.main}>
        <GroupPaymentStateCard
          totalAmount={totalExpenses}
          groupName={group?.name ?? ""}
          onAddClick={() => navigate("/settlement/add")}
        />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>멤버 계좌 정보</h2>
          <MemberAccountCard members={memberAccountInfos} visibleCount={3} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>최근 정산 내역</h2>
            <button
              type="button"
              className={styles.moreLink}
              onClick={() => navigate("/settlement/list")}
            >
              더보기
            </button>
          </div>
          <div className={styles.historyList}>
            {recentSettlements.map((item) => (
              <PayHistoryCard
                key={item.id}
                category={item.expense.category}
                title={item.expense.payment_title}
                date={item.expense.expense_date ?? ""}
                userName={item.expense.payer.nickname ?? ""}
                price={item.expense.total_amount}
                myPrice={item.amount ?? 0}
                status={item.state ?? ""}
              />
            ))}
          </div>
        </section>
      </main>

      <div className={styles.bottomNavWrap}>
        <BottomNavigation />
      </div>
    </div>
  );
}
