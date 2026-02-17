import { useState } from "react";
import styles from "./AddMemberBottomSheet.module.css";
import { IoMdClose } from "react-icons/io";
import Button from "@/components/common/Button/Button";
import { mockMembers, type Member } from "../data";

export type AlreadyAddedMember = { profileSrc: string; name: string };

interface AddMemberBottomSheetProps {
    onClose: () => void;
    alreadyAddedMembers?: AlreadyAddedMember[];
    onAddMembers: (members: AlreadyAddedMember[]) => void;
}

function isSameMember(a: Member, b: Member) {
    return a.userId === b.userId;
}

function isAlreadyAdded(
    member: Member,
    alreadyAdded: AlreadyAddedMember[] = []
) {
    return alreadyAdded.some(
        (a) => a.profileSrc === member.profileSrc && a.name === member.name
    );
}

export default function AddMemberBottomSheet({
    onClose,
    alreadyAddedMembers = [],
    onAddMembers,
}: AddMemberBottomSheetProps) {
    const [selectedToAdd, setSelectedToAdd] = useState<Member[]>([]);

    const toggleMember = (member: Member) => {
        if (isAlreadyAdded(member, alreadyAddedMembers)) return;
        setSelectedToAdd((prev) =>
            prev.some((m) => isSameMember(m, member))
                ? prev.filter((m) => m.userId !== member.userId)
                : [...prev, member]
        );
    };

    const handleAdd = () => {
        onAddMembers(
            selectedToAdd.map((m) => ({ profileSrc: m.profileSrc, name: m.name }))
        );
        onClose();
    };

    return (
        <>
            <div className={styles.header}>
                <h2 className={styles.title}>멤버 추가</h2>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="닫기"
                >
                    <IoMdClose size={24} style={{ color: "var(--text-primary)" }} />
                </button>
            </div>
            <div className={styles.content}>
                <div className={styles.memberList}>
                    {mockMembers.map((member) => {
                        const alreadyAdded = isAlreadyAdded(member, alreadyAddedMembers);
                        const selected = selectedToAdd.some((m) => isSameMember(m, member));
                        return (
                            <div
                                className={`${styles.memberItem} ${selected ? styles.memberItemSelected : ""} ${alreadyAdded ? styles.memberItemDisabled : ""}`}
                                key={member.userId}
                                onClick={() => toggleMember(member)}
                                role="button"
                                tabIndex={alreadyAdded ? -1 : 0}
                                onKeyDown={(e) => {
                                    if (alreadyAdded) return;
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        toggleMember(member);
                                    }
                                }}
                                aria-pressed={selected}
                                aria-disabled={alreadyAdded}
                            >
                                <div className={styles.memberItemImage}>
                                    <img src={member.profileSrc} alt={member.name} />
                                </div>
                                <span className={styles.memberItemName}>{member.name}</span>
                            </div>
                        );
                    })}
                </div>
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleAdd}
                    disabled={selectedToAdd.length === 0}
                >
                    {selectedToAdd.length > 0
                        ? `추가하기 (${selectedToAdd.length}명)`
                        : "추가하기"}
                </Button>
            </div>
        </>
    );
}