import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/store/useUser";
import { useGroup } from "@/store/useGroup";
import {
  getGroupByCode,
  isGroupMember,
  insertGroupMember,
} from "@/services/groupService";

export const CODE_LENGTH = 6;

export default function useGroupJoin() {
  const navigate = useNavigate();
  const { id: userId } = useUser((s) => s);
  const setGroup = useGroup((s) => s.setGroup);

  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoin = useCallback(async () => {
    const trimmed = code.trim();
    if (trimmed.length !== CODE_LENGTH) {
      alert(`${CODE_LENGTH}자리 인증코드를 입력해주세요.`);
      return;
    }
    if (!userId) {
      alert("로그인 후 그룹에 참여할 수 있습니다.");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const group = await getGroupByCode(trimmed);
      if (!group) {
        alert("유효하지 않은 인증코드입니다.");
        return;
      }

      const alreadyMember = await isGroupMember(group.id, userId);
      if (alreadyMember) {
        setGroup(group);
        navigate("/main", { replace: true });
        return;
      }

      await insertGroupMember({
        groupId: group.id,
        userId,
        role: "MEMBER",
      });
      setGroup(group);
      navigate("/main", { replace: true });
    } catch (error) {
      console.error("그룹 참여 실패:", error);
      alert(
        error instanceof Error ? error.message : "그룹 참여에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [code, userId, isSubmitting, setGroup, navigate]);

  return {
    code,
    setCode,
    isSubmitting,
    handleJoin,
  };
}
