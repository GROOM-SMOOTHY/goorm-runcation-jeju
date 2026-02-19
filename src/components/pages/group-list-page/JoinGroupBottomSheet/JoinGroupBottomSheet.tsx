import { useBottomSheet } from "@/components/common/BottomSheet";
import { IoMdClose } from "react-icons/io";
import JoinCourseItem from "../JoinCourseItem";
import styles from "./JoinGroupBottomSheet.module.css";

interface SheetContentProps {
  onClose: () => void;
}

export function SheetContent({ onClose }: SheetContentProps) {
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
        <JoinCourseItem
          title="FRONTEND"
          participants={8}
          generation={1}
          onClick={() => { }}
        />
        <JoinCourseItem
          title="BACKEND"
          participants={12}
          generation={2}
          onClick={() => { }}
        />
        <JoinCourseItem
          title="DESIGN"
          participants={5}
          generation={3}
          onClick={() => { }}
        />
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