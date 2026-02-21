import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import GroupPaymentStateCard from "@/components/pages/settlement-main-page/GroupPaymentStateCard/GroupPaymentStateCard";
import MemberAccountCard, { type MemberAccount } from "@/components/pages/settlement-main-page/MemberAccountCard/MemberAccountCard";
import PayHistoryCard from "@/components/pages/settlement-main-page/PayHistoryCard";
import styles from "@/pages/SettlementMainPage/SettlementMainPage.module.css";

const GROUP_NAME = "제주 런케이션";
const TOTAL_EXPENDITURE = 10_000_000;

const MEMBER_ACCOUNTS: MemberAccount[] = [
  { name: "김민수", initial: "김민", bank: "신한", account: "110-***-1234", accountForCopy: "1101234567890", color: "orange" },
  { name: "최짜장", initial: "최짜", bank: "신한", account: "110-***-1234", accountForCopy: "1101234567891", color: "blue" },
  { name: "김민수", initial: "김민", bank: "신한", account: "110-***-1234", accountForCopy: "1101234567892", color: "purple" },
  { name: "박지훈", initial: "박지", bank: "국민", account: "123-***-5678", accountForCopy: "1234567890123", color: "orange" },
  { name: "이예슬", initial: "이예", bank: "농협", account: "352-***-7890", accountForCopy: "3521234567890", color: "blue" },
];

const RECENT_SETTLEMENTS: Array<{
  id: string;
  imgUrl: string;
  title: string;
  date: string;
  userName: string;
  price: number;
  myPrice?: number;
  status?: string;
}> = [
    {
      id: "1",
      imgUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=96&h=96&fit=crop",
      title: "제주 흑돼지 저녁 식사",
      date: "10월 24일",
      userName: "김민수",
      price: 145000,
      myPrice: 36250,
    },
    {
      id: "2",
      imgUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=96&h=96&fit=crop",
      title: "제주 흑돼지 저녁 식사",
      date: "10월 24일",
      userName: "김민수",
      price: 145000,
      myPrice: 36250,
    },
    {
      id: "3",
      imgUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=96&h=96&fit=crop",
      title: "제주 흑돼지 저녁 식사",
      date: "10월 24일",
      userName: "김민수",
      price: 145000,
      status: "정산 진행 중",
    },
  ];

export default function SettlementMainPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Header title="정산" onBack={() => navigate(-1)} />

      <main className={styles.main}>
        <GroupPaymentStateCard
          totalAmount={TOTAL_EXPENDITURE}
          groupName={GROUP_NAME}
          onAddClick={() => navigate("/settlement-add-history-page")}
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
              onClick={() => navigate("/settlement-history")}
            >
              더보기
            </button>
          </div>
          <div className={styles.historyList}>
            {RECENT_SETTLEMENTS.map((item) => (
              <PayHistoryCard
                key={item.id}
                imgUrl={item.imgUrl}
                title={item.title}
                date={item.date}
                userName={item.userName}
                price={item.price}
                myPrice={item.myPrice}
                status={item.status}
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
