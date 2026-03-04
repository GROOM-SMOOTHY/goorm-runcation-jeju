import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { useUser } from "@/store";
import useSettlementList, { type SettlementType } from "./useSettlementList";
import SettlementCardList from "./SettlementCardList";
import styles from "./SettlementListPage.module.css";

export default function SettlementListPage() {
  const navigate = useNavigate();
  const { id: userId } = useUser((state) => state);
  const {
    type,
    filter,
    setType,
    setFilter,
    settlements,
    totalPaid,
    totalToPay,
    refetch,
  } = useSettlementList();

  return (
    <div className={styles.page}>
      <Header title="정산 내역" onBack={() => navigate(-1)} />

      <main className={styles.main}>
        <section className={styles.summaryCard}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>지금까지 낸 금액</span>
            <span className={styles.summaryAmountPaid}>
              ₩{totalPaid.toLocaleString()}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>내야할 금액</span>
            <span className={styles.summaryAmountToPay}>
              ₩{totalToPay.toLocaleString()}
            </span>
          </div>
        </section>

        <Tabs
          value={type}
          onValueChange={(value) => setType(value as SettlementType)}
        >
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="my">내가 포함된 정산</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <SettlementCardList
              settlements={settlements}
              userId={userId}
              filter={filter}
              setFilter={setFilter}
              onSettleStatusChange={refetch}
            />
          </TabsContent>
          <TabsContent value="my">
            <SettlementCardList
              settlements={settlements}
              userId={userId}
              filter={filter}
              setFilter={setFilter}
              onSettleStatusChange={refetch}
            />
          </TabsContent>
        </Tabs>
      </main>

      <div className={styles.bottomNavWrap}>
        <BottomNavigation />
      </div>
      <AnimatedToast />
    </div>
  );
}
