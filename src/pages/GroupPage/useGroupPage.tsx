import { useCallback, useEffect, useState } from "react";
import { useBottomSheet } from "@/components/common/BottomSheet";
import { SheetContent } from "@/components/pages/group-list-page/JoinGroupBottomSheet/JoinGroupBottomSheet";
import {
  getGroupListWithMembers,
  type GroupWithMembers,
} from "@/services/groupService";

export function useGroupPage() {
  const [openCreateGroupModal, setOpenCreateGroupModal] =
    useState<boolean>(false);
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);

  const { open: openJoinGroupBottomSheet, BottomSheet } = useBottomSheet({
    content: ({ close }) => <SheetContent onClose={close} />,
  });

  useEffect(() => {
    getGroupListWithMembers().then((data) => {
      setGroups(data);
    });
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
