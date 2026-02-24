import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import styles from "@/pages/SettlementHistoryPage/SettlementHistoryPage.module.css";

export default function SettlementHistoryPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Header title="정산 내역" onBack={() => navigate(-1)} />
      <main className={styles.main} />
    </div>
  );
}
