import { useState, useEffect } from "react";
import styles from "./AddMemberBottomSheet.module.css";
import { IoMdClose } from "react-icons/io";
import Button from "@/components/common/Button/Button";
import { useGroup } from "@/store/useGroup";
import { supabase } from "@/lib/supabase";
import defaultProfile from "@/assets/default-profile.png";


export interface Member {
    id: string;
    userId: string;
    name: string;
    profileSrc: string | null;
}

interface AddMemberBottomSheetProps {
    onClose: () => void;
    alreadyAddedMembers?: Member[];
    onAddMembers: (members: Member[]) => void;
}

function isSameMember(a: Member, b: Member) {
    return a.userId === b.userId;
}

function isAlreadyAdded(
    member: Member,
    alreadyAdded: Member[] = []
) {
    return alreadyAdded.some(
        (a) => a.userId === member.userId
    );
}

export default function AddMemberBottomSheet({
    onClose,
    alreadyAddedMembers = [],
    onAddMembers,
}: AddMemberBottomSheetProps) {

    const { group } = useGroup();
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedToAdd, setSelectedToAdd] = useState<Member[]>([]);

    useEffect(() => {
        if (!group?.id) return;

        const fetchMembers = async () => {
            const { data, error } = await supabase
                .from("group_members")
                .select(`
                    user_id,
                    users (
                        id,
                        nickname,
                        profile
                    )
                `)
                .eq("group_id", group.id);

            if (error) {
                console.error("그룹 멤버 불러오기 실패:", error.message);
                return;
            }

            const formatted: Member[] = data.map((item: any) => ({
                id: item.users.id,
                userId: item.users.id,
                name: item.users.nickname,
                profileSrc: item.users.profile,
            }));

            setMembers(formatted);
        };

        fetchMembers();
    }, [group?.id]);

    const toggleMember = (member: Member) => {
        if (isAlreadyAdded(member, alreadyAddedMembers)) return;

        setSelectedToAdd((prev) => {
            const isSelected = prev.some((m) => isSameMember(m, member));
            if (isSelected) {
                return prev.filter((m) => !isSameMember(m, member));
            }
            return [...prev, member];
        });
    };

    const handleAdd = () => {
        if (selectedToAdd.length === 0) return;
        onAddMembers(selectedToAdd);
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
                    {members.map((member) => {
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
                                    <img src={member.profileSrc || defaultProfile} alt={member.name} />
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