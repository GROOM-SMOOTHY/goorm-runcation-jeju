import PaymentMemberChips from "./PaymentsMemberChips";
import styles from "./PaymentsMembers.module.css";
import AddMemberBottomSheet from "./AddMemberBottomSheet/AddMemberBottomSheet";
import defaultProfile from "/src/assets/default-profile.webp";
import { IoIosAdd } from "react-icons/io";
import { useBottomSheet } from "@/components/common/BottomSheet";
import { IoAlertCircleOutline } from "react-icons/io5";

export interface Member {
  id: string;
  userId: string;
  name: string;
  profileSrc: string | null;
}

interface Props {
  selectedMembers?: Member[];
  onChangeMembers?: (members: Member[]) => void;
}

function isSameMember(a: Member, b: Member) {
  return a.userId === b.userId;
}

export default function PaymentsMembers({
  selectedMembers = [],
  onChangeMembers,
}: Props) {
  const handleAddMembers = (newMembers: Member[]) => {
    if (!onChangeMembers) return;
    const alreadyIds = new Set(selectedMembers.map((m) => m.userId));
    const toAdd = newMembers.filter((m) => !alreadyIds.has(m.userId));
    if (toAdd.length === 0) return;
    onChangeMembers([...selectedMembers, ...toAdd]);
  };

  const handleRemoveMember = (member: Member) => {
    if (onChangeMembers) {
      onChangeMembers(selectedMembers.filter((m) => !isSameMember(m, member)));
    }
  };

  const { open, BottomSheet: AddMemberBottomSheetWrapper } = useBottomSheet({
    content: ({ close }) => (
      <AddMemberBottomSheet
        onClose={close}
        alreadyAddedMembers={selectedMembers}
        onAddMembers={handleAddMembers}
      />
    ),
  });

  return (
    <div className={styles.container}>
      <span className={styles.label}>함께한 멤버</span>
      <div className={styles.helpText}>
        <IoAlertCircleOutline size={20} />
        <p>정산에 참여하는 인원을 추가해주세요 (본인 포함)</p>
      </div>

      <div className={styles.members}>
        {selectedMembers.map((member) => (
          <PaymentMemberChips
            key={member.userId}
            profileSrc={member.profileSrc || defaultProfile}
            name={member.name}
            onClose={() => handleRemoveMember(member)}
          />
        ))}
        <button
          type="button"
          className={styles.addMember}
          onClick={open}
          aria-label="멤버 추가"
        >
          <IoIosAdd size={16} color="var(--text-placeholder)" />
        </button>
      </div>

      <AddMemberBottomSheetWrapper />
    </div>
  );
}
