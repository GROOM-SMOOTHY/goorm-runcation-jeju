import { FaRegBell } from "react-icons/fa";
import styles from "./PendingSettlementPanel.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  count: number;
}
export default function PendingSettlementPanel({ count }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.container} onClick={() => navigate("/settlement")}>
      <div className={styles.icon}>
        <FaRegBell size={20} style={{ color: "var(--badge-label-orange)" }} />
      </div>
      <div className={styles.content}>
        <span className={styles.title}>SETTLEMENT</span>
        <span className={styles.description}>정산 대기 {count}건</span>
      </div>
    </div>
  );
}
