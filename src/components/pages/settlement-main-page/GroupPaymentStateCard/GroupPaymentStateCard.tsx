import React from "react";
import styles from "@/components/pages/settlement-main-page/GroupPaymentStateCard/GroupPaymentStateCard.module.css";

interface GroupPaymentStateCardProps {
  totalAmount: number;
  courseName: string;
  onAddPayment: () => void;
}

const GroupPaymentStateCard: React.FC<GroupPaymentStateCardProps> = ({
  totalAmount,
  courseName,
  onAddPayment,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.label}>우리 그룹 총 지출</div>
        <div className={styles.amountCourse}>
          <span className={styles.amount}>₩{totalAmount.toLocaleString()}</span>
          <span className={styles.course}> / {courseName}</span>
        </div>
      </div>
      <button type="button" className={styles.addButton} onClick={onAddPayment}>
        정산내역 추가하기
      </button>
    </div>
  );
};

export default GroupPaymentStateCard;
