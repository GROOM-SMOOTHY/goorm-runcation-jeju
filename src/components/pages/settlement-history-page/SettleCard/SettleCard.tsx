import React, { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { FaBuilding, FaUser, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import Progress from "@/components/common/Progress/Progress";
import styles from "@/components/pages/settlement-history-page/SettleCard/SettleCard.module.css";

/** 정산 완료 | 정산 미완료 */
export type SettlementStatus = "completed" | "pending";

export interface AccountHolder {
  name: string;
  bank: string;
  /** 화면에 표시할 마스킹된 계좌번호 */
  accountNumberMasked: string;
  /** 복사 버튼으로 복사할 실제 계좌번호 (숫자만 또는 000-0000-0000 형식) */
  accountNumberForCopy: string;
}

/** 미완료/완료 멤버 (이름만) */
export interface SettlementMember {
  name: string;
}

export interface SettleCardProps {
  title: string;
  date: string;
  /* 전체 인원 */
  totalMemberCount: number;
  /* 총 금액 (1인당 금액 = totalAmount / totalMemberCount) */
  totalAmount: number;
  /* 입금 완료한 멤버 */
  completedMembers: SettlementMember[];
  /* 입금 미완료 멤버 (새로 추가된 인원은 여기에 넣으면 미완료 쪽 인원이 늘어남) */
  pendingMembers: SettlementMember[];
  /* 받는 사람 (계좌 정보) */
  accountHolder: AccountHolder;
  /* 카드 타입: 정산완료 | 정산 미완료 */
  status: SettlementStatus;
  /* 현재 로그인한 사용자 이름 (미완료/완료 목록에서 "나" 표시용) */
  currentUserName?: string;
  defaultExpanded?: boolean;
  onStatusChange?: (status: SettlementStatus) => void;
}

const SettleCard: React.FC<SettleCardProps> = ({
  title,
  date,
  totalMemberCount,
  totalAmount,
  completedMembers,
  pendingMembers,
  accountHolder,
  status,
  currentUserName,
  defaultExpanded = false,
  onStatusChange,

}) => {

  const addToast = useToastStore((state) => state.addToast);
  const [expanded, setExpanded] = useState(defaultExpanded);

  /* 토글 ON = 나 입금 완료(완료 쪽), OFF = 나 미완료(미완료 쪽) */
  const [depositMarkedComplete, setDepositMarkedComplete] = useState(
    status === "completed"
  );

  /* 토글에 따라 "나"를 미완료/완료 중 한쪽에만 표시 */
  const displayedPending: SettlementMember[] = (() => {
    if (!currentUserName) return pendingMembers;
    if (depositMarkedComplete) {
      return pendingMembers.filter((m) => m.name !== currentUserName);
    }
    const alreadyInPending = pendingMembers.some((m) => m.name === currentUserName);
    return alreadyInPending ? pendingMembers : [...pendingMembers, { name: currentUserName }];
  })();

  const displayedCompleted: SettlementMember[] = (() => {
    if (!currentUserName) return completedMembers;
    if (depositMarkedComplete) {
      const alreadyInCompleted = completedMembers.some((m) => m.name === currentUserName);
      return alreadyInCompleted ? completedMembers : [...completedMembers, { name: currentUserName }];
    }
    return completedMembers.filter((m) => m.name !== currentUserName);
  })();

  /** "나"(currentUserName)를 항상 맨 앞으로 */
  const putMeFirst = (list: SettlementMember[]): SettlementMember[] => {
    if (!currentUserName) return list;
    const me = list.find((m) => m.name === currentUserName);
    const rest = list.filter((m) => m.name !== currentUserName);
    return me ? [me, ...rest] : list;
  };
  const pendingSorted = putMeFirst(displayedPending);
  const completedSorted = putMeFirst(displayedCompleted);

  const completedCount = displayedCompleted.length;
  const progressPercent = totalMemberCount > 0 ? (completedCount / totalMemberCount) * 100 : 0;
  
  /* 헤더 뱃지: 진행률이 다 찼을 때만 "정산완료", 아니면 "정산 미완료" */
  const isProgressFull = completedCount === totalMemberCount && totalMemberCount > 0;

  /* 1인당 금액 = 총액 ÷ 인원수 */
  const amountPerPerson =
    totalMemberCount > 0 ? Math.floor(totalAmount / totalMemberCount) : 0;

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountHolder.accountNumberForCopy);
      addToast("복사되었습니다", "", "success");
    } catch {
      addToast("복사에 실패했습니다", "", "error");
    }
  };

  return (
    <div className={`${styles.card} ${expanded ? styles.cardExpanded : ""}`}>
      {/* 헤더 */}
      <button
        type="button"
        className={styles.header}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-label={expanded ? "카드 접기" : "카드 펼치기"}
      >
        <div className={styles.iconBlock}>
          <FaBuilding className={styles.carIcon} aria-hidden />
        </div>
        <div className={styles.headerText}>
          <span className={styles.title}>{title}</span>
          <span className={styles.subtitle}>
            {date} • {totalMemberCount}명
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

      <div
        className={`${styles.bodyWrapper} ${expanded ? "" : styles.bodyWrapperCollapsed}`}
        aria-hidden={!expanded}
      >
        <div className={styles.body}>
          <div className={styles.bodyInner}>
          {/* 토글: 켜면 "입금이 완료되었습니다", 끄면 "입금이 미완료되었습니다" */}
          <div
            className={`${styles.statusRow} ${
              depositMarkedComplete ? styles.statusRowCompleted : styles.statusRowPending
            }`}
          >
            <div className={styles.statusMessage}>
              {depositMarkedComplete ? (
                <FaCheckCircle className={styles.statusIcon} aria-hidden />
              ) : (
                <FaExclamationTriangle className={styles.statusIcon} aria-hidden />
              )}
              <span>
                {depositMarkedComplete
                  ? "입금이 완료되었습니다"
                  : "입금이 미완료되었습니다"}
              </span>
            </div>
            <Switch.Root
              className={styles.statusSwitch}
              checked={depositMarkedComplete}
              onCheckedChange={(checked) => {
                setDepositMarkedComplete(checked);
                onStatusChange?.(checked ? "completed" : "pending");
              }}
              aria-label="입금 완료 여부 전환"
            >
              <Switch.Thumb className={styles.statusSwitchThumb} />
            </Switch.Root>
          </div>

          {/* TOTAL AMOUNT */}
          <div className={styles.totalSection}>
            <span className={styles.totalLabel}>TOTAL AMOUNT</span>
            <span className={styles.totalAmount}>
              {totalAmount.toLocaleString()} 원
            </span>
          </div>

          {/* 정산 진행률 */}
          <div className={styles.progressSection}>
            <span className={styles.progressLabel}>정산 진행률</span>
            <div className={styles.progressRow}>
              <div className={styles.progressWrapper}>
                <Progress progress={progressPercent} />
              </div>
              <span className={styles.progressText}>
                {completedCount} / {totalMemberCount}명
              </span>
            </div>
          </div>

          {/* 1인당 금액 (총액 ÷ 인원) */}
          <p className={styles.amountPerPerson}>
            1인당 {amountPerPerson.toLocaleString()}원
          </p>

          {/* 받는 사람 (계좌) — 입금자가 나일 때 뱃지 표시 */}
          <div className={styles.accountHolder}>
            <div className={styles.avatar}>
              <FaUser className={styles.avatarIcon} aria-hidden />
            </div>
            <div className={styles.accountHolderNameWrap}>
              <span className={styles.accountHolderName}>{accountHolder.name}</span>
              {currentUserName != null && accountHolder.name === currentUserName && (
                <span className={styles.accountHolderMeBadge}>나</span>
              )}
            </div>
            <span className={styles.accountNumber}>
              {accountHolder.bank} {accountHolder.accountNumberMasked}
            </span>
            <button
              type="button"
              className={styles.copyButton}
              onClick={handleCopyAccount}
              aria-label="계좌번호 복사"
            >
              <MdContentCopy aria-hidden />
            </button>
          </div>

          {/* 미완료 섹션 (토글 OFF면 "나" 여기, 새 인원도 여기) */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBarPending} />
              <span className={styles.sectionTitle}>미완료</span>
              <span className={styles.sectionCountPending}>
                {pendingSorted.length}명
              </span>
            </div>
            <div className={styles.memberTags}>
              {pendingSorted.map((m, idx) => {
                const isMe = currentUserName != null && m.name === currentUserName;
                return (
                  <div
                    key={idx}
                    className={`${styles.memberTag} ${isMe ? styles.memberTagIsMe : ""}`}
                  >
                    <div className={styles.memberTagAvatar} aria-hidden>
                      <FaUser className={styles.memberTagAvatarIcon} />
                    </div>
                    <span className={styles.memberTagName}>{m.name}</span>
                    {isMe && <span className={styles.memberTagMeLabel}>나</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 완료 섹션 (토글 ON이면 "나" 여기) */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBarCompleted} />
              <span className={styles.sectionTitle}>완료</span>
              <span className={styles.sectionCountCompleted}>
                {completedSorted.length}명
              </span>
            </div>
            <div className={styles.memberTags}>
              {completedSorted.map((m, idx) => {
                const isMe = currentUserName != null && m.name === currentUserName;
                return (
                  <div
                    key={idx}
                    className={`${styles.memberTag} ${isMe ? styles.memberTagIsMe : ""}`}
                  >
                    <div className={styles.memberTagAvatar} aria-hidden>
                      <FaUser className={styles.memberTagAvatarIcon} />
                    </div>
                    <span className={styles.memberTagName}>{m.name}</span>
                    {isMe && <span className={styles.memberTagMeLabel}>나</span>}
                  </div>
                );
              })}
            </div>
          </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettleCard;
