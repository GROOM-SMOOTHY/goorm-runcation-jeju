import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/store/useUser";
import { useGroup } from "@/store/useGroup";
import {
  isGroupMember,
  insertGroupMember,
  isValidGroupCode,
  getGroup,
} from "@/services/groupService";
import { useToastStore } from "@/components/common/Toast/ToastStore";

export const CODE_LENGTH = 6;

export default function useGroupJoin() {
  const navigate = useNavigate();
  const { groupId = "" } = useParams();
  const { id: userId } = useUser((s) => s);
  const setGroup = useGroup((s) => s.setGroup);

  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToast = useToastStore((state) => state.addToast);

  const handleJoin = useCallback(async () => {
    const trimmed = code.trim();
    if (trimmed.length !== CODE_LENGTH) {
      addToast(`${CODE_LENGTH}자리 인증코드를 입력해주세요.`, "warning");
      return;
    }
    if (!userId) {
      addToast("로그인 후 그룹에 참여할 수 있습니다.", "warning");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const isValid = await isValidGroupCode(groupId, trimmed);
      if (!isValid) {
        addToast("유효하지 않은 인증코드입니다.", "warning");
        return;
      }

      const group = await getGroup(groupId);
      if (!group) {
        addToast("그룹을 찾을 수 없습니다.", "warning");
        return;
      }

      const alreadyMember = await isGroupMember(groupId, userId);
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
      addToast(
        error instanceof Error ? error.message : "그룹 참여에 실패했습니다.",
        "error",
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
