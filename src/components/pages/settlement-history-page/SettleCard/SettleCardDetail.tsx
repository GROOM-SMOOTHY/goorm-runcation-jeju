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
  onSettleStatusChange?: () => void | Promise<void>;
}
export default function SettleCardDetail({
  expanded,
  expenseId,
  onSettleStatusChange,
}: Props) {
  const { expense, members, isLoading, handleMySettleStatusToggle } =
    useSettleCard({
      expanded,
      expenseId,
      onSettleStatusChange,
    });
  const { id: userId, data: currentUser } = useUser((state) => state);

  // 내가 돈을 냈는지
  const isPaid =
    members.find((m) => m?.user_id === userId && m?.state === "COMPLETE") !==
    undefined;

  const isMySettle = members.find((m) => m?.user_id === userId) !== undefined;

  const totalAmount = expense?.total_amount
    ? expense.total_amount.toLocaleString()
    : "0";
  const totalMemberCount = members.length;
  const completedMembers = members.filter((m) => m?.state === "COMPLETE");
  const completedCount = completedMembers.length;
  const pendingMembers = members.filter((m) => m?.state === "PENDING");
  const pendingCount = pendingMembers.length;
  const progressPercent =
    totalMemberCount > 0 ? (completedCount / totalMemberCount) * 100 : 0;
  const amountPerPerson =
    totalMemberCount > 0 ? (expense?.total_amount ?? 0) / totalMemberCount : 0;
  const accountHolder = {
    name: expense?.payer?.nickname ?? "",
    bank: expense?.payer?.account_bank?.[0]?.bank_name ?? "",
    accountNumberMasked:
      expense?.payer?.account_bank?.[0]?.account_number ?? "",
    accountNumberForCopy:
      expense?.payer?.account_bank?.[0]?.account_number ?? "",
  };

  return (
    <div
      className={`${styles.bodyWrapper} ${expanded ? "" : styles.bodyWrapperCollapsed}`}
    >
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          {/* 내가 참여한 정산이라면 - 로딩 중에는 공간 예약으로 레이아웃 시프트 방지 */}
          {(isLoading || isMySettle) && (
            <div
              className={`${styles.statusRow} ${!isLoading && isPaid ? styles.statusRowCompleted : styles.statusRowPending}`}
            >
              <div className={styles.statusMessage}>
                {isLoading ? (
                  <>
                    <div className={styles.statusSkeletonIcon} aria-hidden />
                    <span className={styles.statusSkeleton}>로딩 중...</span>
                  </>
                ) : (
                  <>
                    {isPaid ? (
                      <FaCheckCircle className={styles.statusIcon} />
                    ) : (
                      <FaExclamationTriangle className={styles.statusIcon} />
                    )}
                    <span>
                      {isPaid ? "입금이 완료되었어요" : "입금이 필요해요"}
                    </span>
                  </>
                )}
              </div>
              {!isLoading && (
                <Switch.Root
                  className={styles.statusSwitch}
                  checked={isPaid}
                  onCheckedChange={() =>
                    handleMySettleStatusToggle(isPaid ? "PENDING" : "COMPLETE")
                  }
                >
                  <Switch.Thumb className={styles.statusSwitchThumb} />
                </Switch.Root>
              )}
            </div>
          )}

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
            1인당 {amountPerPerson.toLocaleString()}원
          </p>

          <div className={styles.accountHolder}>
            <div className={styles.avatar}>
              <FaUser className={styles.avatarIcon} />
            </div>
            <div className={styles.accountHolderNameWrap}>
              <span className={styles.accountHolderName}>
                {accountHolder.name}
              </span>
              {accountHolder.name != null &&
                accountHolder.name === currentUser?.nickname && (
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
                  key={m.user?.id ?? m.user_id}
                  className={`${styles.memberTag} ${currentUser?.nickname != null && m.user?.nickname != null && m.user.nickname === currentUser.nickname ? styles.memberTagIsMe : ""}`}
                >
                  <div className={styles.memberTagAvatar}>
                    <FaUser className={styles.memberTagAvatarIcon} />
                  </div>
                  <span className={styles.memberTagName}>
                    {m.user?.nickname ?? ""}
                  </span>
                  {currentUser?.nickname != null &&
                    m.user?.nickname != null &&
                    m.user.nickname === currentUser?.nickname && (
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
                  key={m.user?.id ?? m.user_id}
                  className={`${styles.memberTag} ${m.user?.nickname != null && m.user.nickname === currentUser?.nickname ? styles.memberTagIsMe : ""}`}
                >
                  <div className={styles.memberTagAvatar}>
                    <FaUser className={styles.memberTagAvatarIcon} />
                  </div>
                  <span className={styles.memberTagName}>
                    {m.user?.nickname ?? ""}
                  </span>
                  {m.user?.nickname != null &&
                    m.user.nickname === currentUser?.nickname && (
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
