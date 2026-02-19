import Header from "@/components/layout/Header/Header";
import styles from "./styles.module.css";
import GroupCardButton from "@/components/pages/group-list-page/GroupCardButton/GroupCardButton";
import JoinCourseItem from "@/components/pages/group-list-page/JoinCourseItem";
import { useState } from "react";
import CreateGroupModal from "@/components/pages/group-list-page/CreateGroupModal/CreateGroupModal";
import { useBottomSheet } from "@/components/common/BottomSheet";
import { SheetContent } from "@/components/pages/group-list-page/JoinGroupBottomSheet/JoinGroupBottomSheet";


const mockGroupList = [
    {
        id: 1,
        type: 'FRONTEND',
        participants: 10,
        generation: 1,
    },
    {
        id: 2,
        type: 'BACKEND',
        participants: 10,
        generation: 1,
    },
    {
        id: 3,
        type: 'DESIGN',
        participants: 10,
        generation: 1,
    },
    {
        id: 4,
        type: 'DEFAULT',
        participants: 10,
        generation: 1,
    },
    {
        id: 5,
        type: 'DEFAULT',
        participants: 10,
        generation: 1,
    },
    {
        id: 6,
        type: 'DEFAULT',
        participants: 10,
        generation: 1,
    },
    {
        id: 7,
        type: 'DEFAULT',
        participants: 10,
        generation: 1,
    },
    {
        id: 8,
        type: 'DEFAULT',
        participants: 10,
        generation: 1,
    },
    {
        id: 9,
        type: 'DEFAULT',
        participants: 10,
        generation: 1,
    },

]

export default function GroupPage() {
    const [openCreateGroupModal, setOpenCreateGroupModal] = useState<boolean>(false);

    const { open: openJoinGroupBottomSheet, BottomSheet } = useBottomSheet({
        content: ({ close }) => <SheetContent onClose={close} />,
    });

    const handleCreateGroup = () => {
        setOpenCreateGroupModal(true);
    }

    const handleJoinGroup = () => {
        openJoinGroupBottomSheet();
    }

    return (
        <>
            <Header title='그룹' />

            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className={styles.hello}>Hello, Nomad</span>
                        <span className={styles.title}>김나영님,<br />오늘의 제주는 <span className={styles.highlight}>맑음</span></span>
                    </div>
                    <div className={styles.content}>
                        <GroupCardButton type='create' onClick={handleCreateGroup} label='Create' title='그룹 생성' />
                        <GroupCardButton type='join' onClick={handleJoinGroup} label='Join' title='그룹 참여' />
                    </div>
                </div>

                <div className={styles.groupListContainer}>
                    <p className={styles.groupListTitle}>지금 활발한 그룹들</p>

                    <div className={styles.groupList}>
                        {
                            mockGroupList.map((group) => (
                                <JoinCourseItem key={group.id} title={group.type as "FRONTEND" | "BACKEND" | "DESIGN" | "DEFAULT"} participants={group.participants} generation={group.generation} onClick={() => { }} />
                            ))
                        }
                    </div>

                </div>
            </div>

            <CreateGroupModal open={openCreateGroupModal} onClose={() => setOpenCreateGroupModal(false)} />
            <BottomSheet />
        </>
    )
}