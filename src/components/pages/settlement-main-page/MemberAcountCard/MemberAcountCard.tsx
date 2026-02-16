import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import styles from "@/components/pages/settlement-main-page/MemberAcountCard/MemberAcountCard.module.css";

interface Member {
  name: string;
  bank: string;
  accountNumber: string;
  color?: "orange";
  avatarUrl?: string;
}

interface MemberAccountCardProps {
  members: Member[];
  initialVisibleCount?: number;
}

const colorMap = {
  orange: "var(--brand-primary)",
};

const maskAccountNumber = (accountNumber: string) => {
  return accountNumber.replace(/(\d{3,4})-(\d{2,3})-(\d{4})/, "$1-***-$3");
};

const MemberAccountCard: React.FC<MemberAccountCardProps> = ({
  members,
  initialVisibleCount = 3,
}) => {
  const [expanded, setExpanded] = useState(false);

  const visibleMembers = expanded
    ? members
    : members.slice(0, initialVisibleCount);

  return (
    <div className={styles.card}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.colMember}>멤버</div>
        <div className={styles.colBank}>은행</div>
        <div className={styles.colAccount}>계좌번호</div>
      </div>

      {/* 멤버 리스트 */}
      <div className={styles.body}>
        {visibleMembers.map((member, idx) => (
          <div key={idx} className={styles.row}>
            
            {/* 멤버 컬럼 (avatar + name 통합) */}
            <div className={styles.member}>
              <div className={styles.avatarWrapper}>
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className={styles.avatarImg}
                  />
                ) : (
                  <div
                    className={styles.avatarPlaceholder}
                    style={{ backgroundColor: colorMap[member.color || "orange"] }}
                  >
                    {member.name[0]}
                  </div>
                )}
              </div>
              <div>{member.name}</div>
            </div>

            <div className={styles.bank}>{member.bank}</div>
            <div className={styles.account}>
              {maskAccountNumber(member.accountNumber)}
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {members.length > initialVisibleCount && (
        <div
          className={styles.more}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <AiOutlineUp /> : <AiOutlineDown />}
          {expanded ? "접기" : "더보기"}
        </div>
      )}
    </div>
  );
};

export default MemberAccountCard;
