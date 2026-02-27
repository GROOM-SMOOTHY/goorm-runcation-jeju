import { FaCoffee } from "react-icons/fa";
import {
  PiForkKnifeFill,
  PiCarFill,
  PiDotsThreeCircleFill,
} from "react-icons/pi";
import styles from "./PayHistoryCard.module.css";

const CATEGORY_ICONS = {
  food: <PiForkKnifeFill size={24} color="var(--text-tertiary)" />,
  transportation: <PiCarFill size={24} color="var(--text-tertiary)" />,
  cafe: <FaCoffee size={24} color="var(--text-tertiary)" />,
  etc: <PiDotsThreeCircleFill size={24} color="var(--text-tertiary)" />,
};

interface Props {
  category: string | null;
  title: string;
  date: string;
  userName: string;
  price: number;
  myPrice?: number;
  status?: string;
}

export default function PayHistoryCard({
  category,
  title,
  date,
  userName,
  price,
  myPrice,
  status,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.leftWrap}>
        <div className={styles.category}>
          {CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}
        </div>
        <div className={styles.titleWrap}>
          <span className={styles.title}>{title}</span>
          <span className={styles.date}>
            {date} · {userName} 결제
          </span>
        </div>
      </div>
      <div className={styles.rightWrap}>
        {status ? (
          <span className={styles.status}>
            {status === "PENDING" ? "정산 진행 중" : "정산 완료"}
          </span>
        ) : myPrice != null ? (
          <span className={styles.myPrice}>
            내 정산 금액 ₩{myPrice.toLocaleString()}
          </span>
        ) : null}
        <span className={styles.price}>₩{price.toLocaleString()}</span>
      </div>
    </div>
  );
}
