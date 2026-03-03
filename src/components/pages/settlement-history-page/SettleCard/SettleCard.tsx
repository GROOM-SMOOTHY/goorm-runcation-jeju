import React, { useState } from "react";
import {
  PiForkKnifeFill,
  PiCarFill,
  PiDotsThreeCircleFill,
} from "react-icons/pi";
import { FaCoffee } from "react-icons/fa";

import SettleCardDetail from "./SettleCardDetail";

import styles from "@/components/pages/settlement-history-page/SettleCard/SettleCard.module.css";

const CATEGORY_ICONS = {
  food: <PiForkKnifeFill size={24} color="var(--brand-primary)" />,
  transportation: <PiCarFill size={24} color="var(--brand-primary)" />,
  cafe: <FaCoffee size={24} color="var(--brand-primary)" />,
  etc: <PiDotsThreeCircleFill size={24} color="var(--brand-primary)" />,
};

export type SettlementStatus = "completed" | "pending";

export interface AccountHolder {
  name: string;
  bank: string;
  accountNumberMasked: string;
  accountNumberForCopy: string;
}

export interface SettlementMember {
  name: string;
}

interface Props {
  expenseId: string;
  title: string;
  category: string;
  expenseDate: string;
  memberCount: number;
  isProgressFull: boolean;
}
const SettleCard: React.FC<Props> = ({
  expenseId,
  title,
  category,
  expenseDate,
  memberCount,
  isProgressFull,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className={`${styles.card} ${expanded ? styles.cardExpanded : ""}`}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className={styles.iconBlock}>
          {CATEGORY_ICONS[(category ?? "etc") as keyof typeof CATEGORY_ICONS]}
        </div>
        <div className={styles.headerText}>
          <span className={styles.title}>{title}</span>
          <span className={styles.subtitle}>
            {expenseDate} • {memberCount}명
          </span>
        </div>
        <span
          className={
            isProgressFull ? styles.badgeCompleted : styles.badgePending
          }
        >
          {isProgressFull ? "정산완료" : "정산 미완료"}
        </span>
      </button>
      {expanded && (
        <SettleCardDetail expanded={expanded} expenseId={expenseId} />
      )}
    </div>
  );
};

export default SettleCard;
