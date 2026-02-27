import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import GroupPaymentStateCard from "@/components/pages/settlement-main-page/GroupPaymentStateCard/GroupPaymentStateCard";
import MemberAccountCard, {
  type MemberAccount,
} from "@/components/pages/settlement-main-page/MemberAccountCard/MemberAccountCard";
import PayHistoryCard from "@/components/pages/settlement-main-page/PayHistoryCard";
import styles from "@/pages/SettlementPage/SettlementMainPage/SettlementMainPage.module.css";
import useSettlementMain from "./useSettlementMain";

const MEMBER_ACCOUNTS: MemberAccount[] = [
  {
    name: "김민수",
    initial: "김민",
    bank: "신한",
    account: "110-***-1234",
    accountForCopy: "1101234567890",
    color: "orange",
  },
  {
    name: "최짜장",
    initial: "최짜",
    bank: "신한",
    account: "110-***-1234",
    accountForCopy: "1101234567891",
    color: "blue",
  },
  {
    name: "김민수",
    initial: "김민",
    bank: "신한",
    account: "110-***-1234",
    accountForCopy: "1101234567892",
    color: "purple",
  },
  {
    name: "박지훈",
    initial: "박지",
    bank: "국민",
    account: "123-***-5678",
    accountForCopy: "1234567890123",
    color: "orange",
  },
  {
    name: "이예슬",
    initial: "이예",
    bank: "농협",
    account: "352-***-7890",
    accountForCopy: "3521234567890",
    color: "blue",
  },
];

export default function SettlementMainPage() {
  const navigate = useNavigate();

  const { totalExpenses, group, recentSettlements } = useSettlementMain();

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
          <MemberAccountCard members={MEMBER_ACCOUNTS} visibleCount={3} />
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
                userName={item.payer.nickname ?? ""}
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
