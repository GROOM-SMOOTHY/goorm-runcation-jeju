import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGroupListWithMembers,
  type GroupWithMembers,
} from "@/services/groupService";
import { useGroup } from "@/store";

export default function useJoinGroupSheet() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);

  const { setGroup } = useGroup();

  useEffect(() => {
    getGroupListWithMembers().then((data) => {
      setGroups(data);
    });
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
    handleJoinGroup,
  };
}
