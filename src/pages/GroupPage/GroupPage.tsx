import Header from "@/components/layout/Header/Header";
import styles from "./styles.module.css";
import GroupCardButton from "@/components/pages/group-list-page/GroupCardButton/GroupCardButton";
import JoinCourseItem from "@/components/pages/group-list-page/JoinCourseItem";
import { useCallback, useEffect, useState } from "react";
import CreateGroupModal from "@/components/pages/group-list-page/CreateGroupModal/CreateGroupModal";
import { useBottomSheet } from "@/components/common/BottomSheet";
import { SheetContent } from "@/components/pages/group-list-page/JoinGroupBottomSheet/JoinGroupBottomSheet";
import { useUser } from "@/store/useUser";
import { getGroupList } from "@/services/groupService";
import type { Tables } from "@/types/supabase";
import type { CourseTypeKey } from "@/components/common/TypeBadge/TypeBadge";

const PAGE_SIZE = 10;

export default function GroupPage() {
  const [openCreateGroupModal, setOpenCreateGroupModal] =
    useState<boolean>(false);
  const [groups, setGroups] = useState<Tables<"groups">[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser((s) => s.data);

  const { open: openJoinGroupBottomSheet, BottomSheet } = useBottomSheet({
    content: ({ close }) => <SheetContent onClose={close} />,
  });

  const fetchGroups = useCallback(
    async (nextPage: number) => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        const dataList = await getGroupList({
          page: nextPage,
          limit: PAGE_SIZE,
        });

        if (!dataList || dataList.length === 0) {
          return;
        }

        setGroups((prev) => [...prev, ...dataList]);
      } catch (error) {
        console.error("그룹 목록 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  useEffect(() => {
    fetchGroups(1);
  }, []);

  const handleCreateGroup = () => {
    setOpenCreateGroupModal(true);
  };

  const handleJoinGroup = () => {
    openJoinGroupBottomSheet();
  };

  return (
    <>
      <Header title="그룹" />

      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.hello}>Hello, Nomad</span>
            <span className={styles.title}>
              {user.nickname}님,
              <br />
              오늘의 제주는 <span className={styles.highlight}>맑음</span>
            </span>
          </div>
          <div className={styles.content}>
            <GroupCardButton
              type="create"
              onClick={handleCreateGroup}
              label="Create"
              title="그룹 생성"
            />
            <GroupCardButton
              type="join"
              onClick={handleJoinGroup}
              label="Join"
              title="그룹 참여"
            />
          </div>
        </div>

        <div className={styles.groupListContainer}>
          <p className={styles.groupListTitle}>지금 활발한 그룹들</p>

          <div className={styles.groupList}>
            {groups.map((group) => (
              <JoinCourseItem
                key={group.id}
                title={group.course as CourseTypeKey}
                participants={0}
                generation={group.batch ?? 1}
                onClick={() => {}}
              />
            ))}
            {/* <div ref={loaderRef} className={styles.loader}></div> */}
          </div>
        </div>
      </div>

      <CreateGroupModal
        open={openCreateGroupModal}
        onClose={() => setOpenCreateGroupModal(false)}
      />
      <BottomSheet />
    </>
  );
}
