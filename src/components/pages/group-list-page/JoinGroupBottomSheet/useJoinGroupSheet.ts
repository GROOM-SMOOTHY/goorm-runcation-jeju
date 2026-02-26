import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupList } from "@/services/groupService";
import type { Tables } from "@/types/supabase";
import { useGroup } from "@/store";

export type GroupRow = Tables<"groups">;

const PAGE_SIZE = 20;

export default function useJoinGroupSheet() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<GroupRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setGroup } = useGroup();

  const loadGroups = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getGroupList({ page: 1, limit: PAGE_SIZE });
      setGroups((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("그룹 목록 조회 실패:", error);
      alert("그룹 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadGroups();
  }, [loadGroups]);

  const handleJoinGroup = useCallback(
    (group: GroupRow) => {
      setGroup(group);
      navigate(`/group/join/${group.id}`);
    },
    [navigate],
  );

  return {
    groups,
    isLoading,
    loadGroups,
    handleJoinGroup,
  };
}
