import { useCallback, useEffect, useState } from "react";
import { useBottomSheet } from "@/components/common/BottomSheet";
import { SheetContent } from "@/components/pages/group-list-page/JoinGroupBottomSheet/JoinGroupBottomSheet";
import { getGroupList } from "@/services/groupService";
import type { Tables } from "@/types/supabase";

const PAGE_SIZE = 10;

export function useGroupPage() {
  const [openCreateGroupModal, setOpenCreateGroupModal] =
    useState<boolean>(false);
  const [groups, setGroups] = useState<Tables<"groups">[]>([]);

  const { open: openJoinGroupBottomSheet, BottomSheet } = useBottomSheet({
    content: ({ close }) => <SheetContent onClose={close} />,
  });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const dataList = await getGroupList({
          page: 1,
          limit: PAGE_SIZE,
        });

        if (!dataList || dataList.length === 0) {
          return;
        }

        setGroups((prev) => [...prev, ...dataList]);
      } catch (error) {
        console.error("그룹 목록 조회 실패:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = useCallback(() => {
    setOpenCreateGroupModal(true);
  }, []);

  const handleJoinGroup = useCallback(() => {
    openJoinGroupBottomSheet();
  }, [openJoinGroupBottomSheet]);

  const closeCreateGroupModal = useCallback(() => {
    setOpenCreateGroupModal(false);
  }, []);

  return {
    groups,
    openCreateGroupModal,
    handleCreateGroup,
    handleJoinGroup,
    closeCreateGroupModal,
    BottomSheet,
  };
}
