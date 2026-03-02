import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGroupListWithMembers,
  type GroupWithMembers,
} from "@/services/groupService";
import { useGroup } from "@/store";

export default function useJoinGroupSheet() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);

  const { setGroup } = useGroup();

  useEffect(() => {
    getGroupListWithMembers().then((data) => {
      setIsLoading(false);
      setGroups(data);
    });

    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleJoinGroup = useCallback(
    (group: GroupWithMembers) => {
      setGroup(group);
      navigate(`/group/join/${group.id}`);
    },
    [navigate, setGroup],
  );

  return {
    groups,
    isLoading,
    handleJoinGroup,
  };
}
