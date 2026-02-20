import styles from "./GroupPaymentStateCard.module.css";

export interface GroupPaymentStateCardProps {
  /** 그룹 총 지출 금액 */
  totalAmount: number;
  /** 그룹명 (예: "제주 런케이션") */
  groupName: string;
  /** 정산내역 추가하기 버튼 클릭 시 */
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
        <span className={styles.context}>/ {groupName}</span>
      </div>
      <button type="button" className={styles.addButton} onClick={onAddClick}>
        정산내역 추가하기
      </button>
    </section>
  );
}
