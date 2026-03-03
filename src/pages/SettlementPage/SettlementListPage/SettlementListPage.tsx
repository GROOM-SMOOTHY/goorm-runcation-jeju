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
  const { type, filter, setType, setFilter, settlements } = useSettlementList();

  return (
    <div className={styles.page}>
      <Header title="정산 내역" onBack={() => navigate(-1)} />

      <main className={styles.main}>
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
            />
          </TabsContent>
          <TabsContent value="my">
            <SettlementCardList
              settlements={settlements}
              userId={userId}
              filter={filter}
              setFilter={setFilter}
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
