import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';
import BottomNavigation from '@/components/common/BottomNavigation/BottomNavigation';
import SettleCard, {
  type SettleCardProps,
  type AccountHolder,
} from "@/components/pages/settlement-history-page/SettleCard/SettleCard";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";
import styles from "@/pages/SettlementPage/SettlementMainPage/SettlementMainPage.module.css";

const accountHolder: AccountHolder = {
  name: '김나영',
  bank: '농협',
  accountNumberMasked: '000-****-****-00',
  accountNumberForCopy: '352-1234-56789-00',
};

const makeMembers = (name: string, count: number) =>
  Array.from({ length: count }, () => ({ name }));

const MOCK_SETTLEMENTS: SettleCardProps[] = [
  {
    title: '점심 밥 모임',
    date: '2025.02.10',
    totalMemberCount: 20,
    totalAmount: 600000,
    completedMembers: [...makeMembers('이권우', 19), { name: '이예슬' }],
    pendingMembers: [],
    accountHolder,
    status: 'completed',
    currentUserName: '이예슬',
    defaultExpanded: false,
  },
  {
    title: '저녁 회식',
    date: '2025.02.12',
    totalMemberCount: 8,
    totalAmount: 240000,
    completedMembers: makeMembers('이권우', 5),
    pendingMembers: [...makeMembers('박지훈', 2), { name: '이예슬' }],
    accountHolder: { ...accountHolder, name: '박지훈' },
    status: 'pending',
    currentUserName: '이예슬',
    defaultExpanded: false,
  },
  {
    title: '주말 여행 정산',
    date: '2025.02.15',
    totalMemberCount: 4,
    totalAmount: 320000,
    completedMembers: makeMembers('이권우', 2),
    pendingMembers: [...makeMembers('김철수', 1), { name: '이예슬' }],
    accountHolder,
    status: 'pending',
    currentUserName: '이예슬',
    defaultExpanded: false,
  },
];

export default function SettlementListPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.page}>
        <Header title="정산 내역" onBack={() => navigate(-1)} />
        <main className={styles.main}>
          <section className={styles.summaryCard}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>지금까지 낸 금액</span>
              <span className={styles.summaryAmountPaid}>₩142,500</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>내야할 금액</span>
              <span className={styles.summaryAmountToPay}>₩32,000</span>
            </div>
          </section>
          <h2 className={styles.sectionTitle}>정산 목록</h2>
          <div className={styles.cardList}>
            {MOCK_SETTLEMENTS.map((settlement, i) => (
              <SettleCard
                key={`${settlement.title}-${settlement.date}-${i}`}
                {...settlement}
              />
            ))}
          </div>
        </main>
        <div className={styles.bottomNavWrap}>
          <BottomNavigation />
        </div>
      </div>
      <AnimatedToast />
    </>
  );
}
