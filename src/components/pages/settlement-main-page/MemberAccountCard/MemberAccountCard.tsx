import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import styles from "./MemberAccountCard.module.css";

export interface MemberAccount {
  name: string;
  initial: string;
  bank: string;
  account: string;
  accountForCopy: string;
  color: "orange" | "blue" | "purple";
}

export interface MemberAccountCardProps {
  members: MemberAccount[];
  visibleCount?: number;
}

export default function MemberAccountCard({
  members,
  visibleCount = 3,
}: MemberAccountCardProps) {
  const addToast = useToastStore((s) => s.addToast);
  const [expanded, setExpanded] = useState(false);

  const visibleMembers = expanded ? members : members.slice(0, visibleCount);
  const hasMore = members.length > visibleCount && !expanded;
  const canCollapse = expanded && members.length > visibleCount;

  const handleCopy = (accountForCopy: string) => {
    navigator.clipboard.writeText(accountForCopy).then(
      () => addToast("복사되었습니다", "", "success"),
      () => addToast("복사에 실패했습니다", "", "error")
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.rowHeader}>
        <span className={styles.colMember}>멤버</span>
        <span className={styles.colBank}>은행</span>
        <span className={styles.colAccount}>계좌번호</span>
        <span className={styles.colCopy} />
      </div>
      {visibleMembers.map((m, i) => (
        <div key={i} className={styles.row}>
          <div className={styles.colMember}>
            <div className={`${styles.avatar} ${styles[m.color]}`}>{m.initial}</div>
            <span className={styles.memberName}>{m.name}</span>
          </div>
          <span className={styles.colBank}>{m.bank}</span>
          <span className={styles.colAccount}>{m.account}</span>
          <div className={styles.colCopy}>
            <button
              type="button"
              className={styles.copyButton}
              onClick={() => handleCopy(m.accountForCopy)}
              aria-label={`${m.name} 계좌번호 복사`}
            >
              <MdContentCopy size={16} />
            </button>
          </div>
        </div>
      ))}
      {(hasMore || canCollapse) && (
        <button
          type="button"
          className={styles.moreButton}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
}
