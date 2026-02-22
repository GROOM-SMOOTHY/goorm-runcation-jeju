import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import styles from "@/pages/SettlementAddHistoryPage/SettlementAddHistoryPage.module.css";

export default function SettlementAddHistoryPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Header title="정산내역 추가" onBack={() => navigate(-1)} />
      <main className={styles.main} />
    </div>
  );
}
