import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button/Button";
import styles from "@/components/pages/settlement-main-page/GroupPaymentStateCard/GroupPaymentStateCard.module.css";

interface GroupPaymentStateCardProps {
  totalAmount: number;
  courseName: string;
}

const GroupPaymentStateCard: React.FC<GroupPaymentStateCardProps> = ({
  totalAmount,
  courseName,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.label}>우리 그룹 총 지출</div>
        <div className={styles.amountCourse}>
          <span className={styles.amount}>₩{totalAmount.toLocaleString()}</span>
          <span className={styles.course}> / {courseName}</span>
        </div>
      </div>
      <Button type="button" variant="primary" onClick={() => navigate("/settlement/add")}>
        정산내역 추가하기
      </Button>
    </div>
  );
};

export default GroupPaymentStateCard;
