import React, { useState, useEffect } from "react";
import * as Switch from "@radix-ui/react-switch";
import { FaBuilding, FaUser, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import Progress from "@/components/common/Progress/Progress";
import styles from "@/components/pages/settlement-history-page/SettleCard/SettleCard.module.css";

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

export interface SettleCardProps {
  expenseId: string;
  title: string;
  date: string;
  totalMemberCount: number;
  totalAmount: number;
  completedMembers: SettlementMember[];
  pendingMembers: SettlementMember[];
  accountHolder: AccountHolder;
  status: SettlementStatus;
  currentUserName?: string;
  defaultExpanded?: boolean;
  onStatusChange?: (expenseId: string, newStatus: SettlementStatus) => Promise<void>; // 👈 인자 수정
}

const SettleCard: React.FC<SettleCardProps> = ({
  expenseId,
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

  // 1. 이미 완료된 상태인지 확인 (DB 기준)
  const isAlreadyCompleted = status === "completed";
  const [depositMarkedComplete, setDepositMarkedComplete] = useState(isAlreadyCompleted);
  
  useEffect(() => {
    setDepositMarkedComplete(isAlreadyCompleted);
  }, [status, isAlreadyCompleted]);

  // 2. 스위치 변경 핸들러
  const handleStatusToggle = async (checked: boolean) => {
    if (isAlreadyCompleted) return; // 이미 완료된 정산은 변경 불가 (고정)

    if (checked) {
      try {
        await onStatusChange?.(expenseId, "completed");
        setDepositMarkedComplete(true);
        addToast("정산 완료", "입금 확인 처리가 되었습니다.", "success");
      } catch (error) {
        setDepositMarkedComplete(false);
        addToast("오류 발생", "업데이트에 실패했습니다.", "error");
      }
    }
  };

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
  const isProgressFull = completedCount === totalMemberCount && totalMemberCount > 0;
  const amountPerPerson = totalMemberCount > 0 ? Math.floor(totalAmount / totalMemberCount) : 0;

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
      <button type="button" className={styles.header} onClick={() => setExpanded((prev) => !prev)}>
        <div className={styles.iconBlock}><FaBuilding className={styles.carIcon} /></div>
        <div className={styles.headerText}>
          <span className={styles.title}>{title}</span>
          <span className={styles.subtitle}>{date} • {totalMemberCount}명</span>
        </div>
        <span className={isProgressFull ? styles.badgeCompleted : styles.badgePending}>
          {isProgressFull ? "정산완료" : "정산 미완료"}
        </span>
      </button>

      <div className={`${styles.bodyWrapper} ${expanded ? "" : styles.bodyWrapperCollapsed}`}>
        <div className={styles.body}>
          <div className={styles.bodyInner}>
            <div className={`${styles.statusRow} ${depositMarkedComplete ? styles.statusRowCompleted : styles.statusRowPending}`}>
              <div className={styles.statusMessage}>
                {depositMarkedComplete ? <FaCheckCircle className={styles.statusIcon} /> : <FaExclamationTriangle className={styles.statusIcon} />}
                <span>{depositMarkedComplete ? "입금이 완료되었습니다" : "입금이 미완료되었습니다"}</span>
              </div>
              <Switch.Root
                className={styles.statusSwitch}
                checked={depositMarkedComplete}
                onCheckedChange={handleStatusToggle}
                disabled={isAlreadyCompleted} // 👈 3. 완료된 경우 조작 불가(고정)
              >
                <Switch.Thumb className={styles.statusSwitchThumb} />
              </Switch.Root>
            </div>

            <div className={styles.totalSection}>
              <span className={styles.totalLabel}>TOTAL AMOUNT</span>
              <span className={styles.totalAmount}>{totalAmount.toLocaleString()} 원</span>
            </div>

            <div className={styles.progressSection}>
              <span className={styles.progressLabel}>정산 진행률</span>
              <div className={styles.progressRow}>
                <div className={styles.progressWrapper}><Progress progress={progressPercent} /></div>
                <span className={styles.progressText}>{completedCount} / {totalMemberCount}명</span>
              </div>
            </div>

            <p className={styles.amountPerPerson}>1인당 {amountPerPerson.toLocaleString()}원</p>

            <div className={styles.accountHolder}>
              <div className={styles.avatar}><FaUser className={styles.avatarIcon} /></div>
              <div className={styles.accountHolderNameWrap}>
                <span className={styles.accountHolderName}>{accountHolder.name}</span>
                {currentUserName != null && accountHolder.name === currentUserName && <span className={styles.accountHolderMeBadge}>나</span>}
              </div>
              <span className={styles.accountNumber}>{accountHolder.bank} {accountHolder.accountNumberMasked}</span>
              <button type="button" className={styles.copyButton} onClick={handleCopyAccount}><MdContentCopy /></button>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBarPending} />
                <span className={styles.sectionTitle}>미완료</span>
                <span className={styles.sectionCountPending}>{pendingSorted.length}명</span>
              </div>
              <div className={styles.memberTags}>
                {pendingSorted.map((m) => (
                  <div key={m.name} className={`${styles.memberTag} ${currentUserName != null && m.name === currentUserName ? styles.memberTagIsMe : ""}`}>
                    <div className={styles.memberTagAvatar}><FaUser className={styles.memberTagAvatarIcon} /></div>
                    <span className={styles.memberTagName}>{m.name}</span>
                    {currentUserName != null && m.name === currentUserName && <span className={styles.memberTagMeLabel}>나</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBarCompleted} />
                <span className={styles.sectionTitle}>완료</span>
                <span className={styles.sectionCountCompleted}>{completedSorted.length}명</span>
              </div>
              <div className={styles.memberTags}>
                {completedSorted.map((m) => (
                  <div key={m.name} className={`${styles.memberTag} ${currentUserName != null && m.name === currentUserName ? styles.memberTagIsMe : ""}`}>
                    <div className={styles.memberTagAvatar}><FaUser className={styles.memberTagAvatarIcon} /></div>
                    <span className={styles.memberTagName}>{m.name}</span>
                    {currentUserName != null && m.name === currentUserName && <span className={styles.memberTagMeLabel}>나</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettleCard;