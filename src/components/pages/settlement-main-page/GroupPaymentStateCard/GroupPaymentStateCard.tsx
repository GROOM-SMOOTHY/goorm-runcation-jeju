import Button from "@/components/common/Button/Button";
import styles from "./GroupPaymentStateCard.module.css";

export interface GroupPaymentStateCardProps {
  totalAmount: number;
  groupName: string;
  onAddClick?: () => void;
}

export default function GroupPaymentStateCard({
  totalAmount,
  groupName,
  onAddClick,
}: GroupPaymentStateCardProps) {
  return (
    <section className={styles.card}>
      <span className={styles.label}>우리 그룹 총 지출</span>
      <div className={styles.row}>
        <span className={styles.amount}>₩{totalAmount.toLocaleString()}</span>
        {groupName && <span className={styles.context}>/ {groupName}</span>}
      </div>
      <Button type="button" onClick={onAddClick}>
        정산내역 추가하기
      </Button>
    </section>
  );
}
