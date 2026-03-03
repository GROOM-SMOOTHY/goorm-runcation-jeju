import useSettleCard from "./useSettleCard";
import styles from "./SettleCard.module.css";
import Progress from "@/components/common/Progress/Progress";
import * as Switch from "@radix-ui/react-switch";

import { FaCheckCircle, FaExclamationTriangle, FaUser } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useUser } from "@/store";

interface Props {
  expanded: boolean;
  expenseId: string;
}
export default function SettleCardDetail({ expanded, expenseId }: Props) {
  const { expense, members } = useSettleCard({ expanded, expenseId });
  const currentUser = useUser((state) => state.data);

  const depositMarkedComplete = members.every((m) => m?.state === "COMPLETE");

  const totalAmount = expense?.total_amount
    ? expense.total_amount.toLocaleString()
    : "0";
  const totalMemberCount = members.length;
  const completedMembers = members.filter((m) => m?.state === "COMPLETE");
  const completedCount = completedMembers.length;
  const pendingMembers = members.filter((m) => m?.state === "PENDING");
  const pendingCount = pendingMembers.length;
  const progressPercent = (completedCount / totalMemberCount) * 100;
  const amountPerPerson = (expense?.total_amount ?? 0) / totalMemberCount;
  const accountHolder = {
    name: expense?.payer?.nickname ?? "",
    bank: expense?.payer?.account_bank?.bank_name ?? "",
    accountNumberMasked:
      expense?.payer?.account_bank?.account_number?.replace(
        /(\d{4})(?=\d)/g,
        "$1-",
      ) ?? "",
    accountNumberForCopy: expense?.payer?.account_bank?.account_number ?? "",
  };

  const handleStatusToggle = () => {
    console.log("handleStatusToggle");
  };

  return (
    <div
      className={`${styles.bodyWrapper} ${expanded ? "" : styles.bodyWrapperCollapsed}`}
    >
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          <div
            className={`${styles.statusRow} ${depositMarkedComplete ? styles.statusRowCompleted : styles.statusRowPending}`}
          >
            <div className={styles.statusMessage}>
              {depositMarkedComplete ? (
                <FaCheckCircle className={styles.statusIcon} />
              ) : (
                <FaExclamationTriangle className={styles.statusIcon} />
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
              onCheckedChange={handleStatusToggle}
            >
              <Switch.Thumb className={styles.statusSwitchThumb} />
            </Switch.Root>
          </div>

          <div className={styles.totalSection}>
            <span className={styles.totalLabel}>TOTAL AMOUNT</span>
            <span className={styles.totalAmount}>{totalAmount} 원</span>
          </div>

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

          <p className={styles.amountPerPerson}>
            1인당{amountPerPerson.toLocaleString()}원
          </p>

          <div className={styles.accountHolder}>
            <div className={styles.avatar}>
              <FaUser className={styles.avatarIcon} />
            </div>
            <div className={styles.accountHolderNameWrap}>
              <span className={styles.accountHolderName}>
                {accountHolder.name}
              </span>
              {currentUser.nickname != null &&
                accountHolder.name === currentUser.nickname && (
                  <span className={styles.accountHolderMeBadge}>나</span>
                )}
            </div>
            <span className={styles.accountNumber}>
              {accountHolder.bank} {accountHolder.accountNumberMasked}
            </span>
            {accountHolder.accountNumberForCopy &&
              accountHolder.accountNumberForCopy.trim() !== "" && (
                <button
                  type="button"
                  className={styles.copyButton}
                  //   onClick={handleCopyAccount}
                >
                  <MdContentCopy />
                </button>
              )}
          </div>

          {/* 미완료 섹션 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBarPending} />
              <span className={styles.sectionTitle}>미완료</span>
              <span className={styles.sectionCountPending}>
                {pendingCount}명
              </span>
            </div>
            <div className={styles.memberTags}>
              {pendingMembers.map((m) => (
                <div
                  key={m.user.id}
                  className={`${styles.memberTag} ${currentUser.nickname != null && m.user.nickname === currentUser.nickname ? styles.memberTagIsMe : ""}`}
                >
                  <div className={styles.memberTagAvatar}>
                    <FaUser className={styles.memberTagAvatarIcon} />
                  </div>
                  <span className={styles.memberTagName}>
                    {m.user.nickname}
                  </span>
                  {currentUser.nickname != null &&
                    m.user.nickname === currentUser.nickname && (
                      <span className={styles.memberTagMeLabel}>나</span>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* 완료 섹션 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBarCompleted} />
              <span className={styles.sectionTitle}>완료</span>
              <span className={styles.sectionCountCompleted}>
                {completedCount}명
              </span>
            </div>
            <div className={styles.memberTags}>
              {completedMembers.map((m) => (
                <div
                  key={m.user.id}
                  className={`${styles.memberTag} ${currentUser.nickname != null && m.user.nickname === currentUser.nickname ? styles.memberTagIsMe : ""}`}
                >
                  <div className={styles.memberTagAvatar}>
                    <FaUser className={styles.memberTagAvatarIcon} />
                  </div>
                  <span className={styles.memberTagName}>
                    {m.user.nickname}
                  </span>
                  {currentUser.nickname != null &&
                    m.user.nickname === currentUser.nickname && (
                      <span className={styles.memberTagMeLabel}>나</span>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
