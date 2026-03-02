import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import styles from "./PendingSettlementPanel.module.css";

interface Props {
  count: number;
}
export default function PendingSettlementPanel({ count }: Props) {
  return (
    <Link to="/settlement" className={styles.container}>
      <div className={styles.icon}>
        <FaRegBell size={20} style={{ color: "var(--badge-label-orange)" }} />
      </div>
      <div className={styles.content}>
        <span className={styles.title}>SETTLEMENT</span>
        <span className={styles.description}>정산 대기 {count}건</span>
      </div>
    </Link>
  );
}
