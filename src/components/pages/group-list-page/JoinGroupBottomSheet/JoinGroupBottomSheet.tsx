import { useBottomSheet } from "@/components/common/BottomSheet";
import { IoMdClose } from "react-icons/io";
import JoinCourseItem from "../JoinCourseItem";
import styles from "./JoinGroupBottomSheet.module.css";
import useJoinGroupSheet from "./useJoinGroupSheet";

interface SheetContentProps {
  onClose: () => void;
}

export function SheetContent({ onClose }: SheetContentProps) {
  const { groups, isLoading, handleJoinGroup } = useJoinGroupSheet();

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>참여할 그룹을 선택해주세요</h2>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="닫기"
        >
          <IoMdClose size={24} color="var(--text-primary)" />
        </button>
      </div>
      <div className={styles.content}>
        {groups.map((group) => (
          <JoinCourseItem
            key={group.id}
            course={group.course}
            participants={0}
            generation={group.batch ?? 1}
            onClick={() => handleJoinGroup(group)}
          />
        ))}

        {!isLoading && groups.length === 0 && (
          <p className={styles.emptyText}>참여 가능한 그룹이 없습니다.</p>
        )}
      </div>
    </>
  );
}

export default function JoinGroupBottomSheet() {
  const { open, BottomSheet } = useBottomSheet({
    content: ({ close }) => <SheetContent onClose={close} />,
  });

  return (
    <div>
      <button type="button" onClick={open}>
        그룹 참여
      </button>
      <BottomSheet />
    </div>
  );
}
