import { IoIosAdd } from "react-icons/io";
import PaymentMemberChips from "./PaymentsMemberChips";
import styles from "./PaymentsMembers.module.css";
import { useBottomSheet } from "@/components/common/BottomSheet";
import AddMemberBottomSheet from "./AddMemberBottomSheet/AddMemberBottomSheet";

interface Member {
    profileSrc: string;
    name: string;
}

interface Props {
    selectedMembers?: Member[];
    onChangeMembers?: (members: Member[]) => void;
}

function isSameMember(a: Member, b: Member) {
    return a.profileSrc === b.profileSrc && a.name === b.name;
}

export default function PaymentsMembers({ selectedMembers = [], onChangeMembers }: Props) {
    const handleAddMembers = (newMembers: Member[]) => {
        if (!onChangeMembers) return;
        const alreadyIds = new Set(selectedMembers.map((m) => `${m.profileSrc}|${m.name}`));
        const toAdd = newMembers.filter((m) => !alreadyIds.has(`${m.profileSrc}|${m.name}`));
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

            <div className={styles.members}>
                {selectedMembers.map((member) => (
                    <PaymentMemberChips
                        key={`${member.name}-${member.profileSrc}`}
                        profileSrc={member.profileSrc}
                        name={member.name}
                        onClose={() => handleRemoveMember(member)}
                    />
                ))}
                <button type="button" className={styles.addMember} onClick={open} aria-label="멤버 추가">
                    <IoIosAdd size={16} color="var(--text-placeholder)" />
                </button>
            </div>

            <AddMemberBottomSheetWrapper />
        </div>
    );
}

