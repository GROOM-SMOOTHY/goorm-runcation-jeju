import { useCallback, useEffect, useState } from "react";
import {
  createGroup,
  deleteGroup,
  insertGroupMember,
} from "@/services/groupService";
import { useUser } from "@/store/useUser";
import generateUniqueGroupCode from "@/utils/generateUniqueGroupCode";
import type { Database } from "@/types/supabase";

export type Steps = "group-info-form" | "success";

export interface GroupFormValues {
  groupName: string;
  course: Database["public"]["Enums"]["course_type"] | null;
  generation: number | null;
}

const initialFormValues: GroupFormValues = {
  groupName: "",
  course: null,
  generation: null,
};

export default function useCreateGroupModal(
  open: boolean,
  onClose: () => void,
) {
  const [steps, setSteps] = useState<Steps>("group-info-form");
  const [formValues, setFormValues] =
    useState<GroupFormValues>(initialFormValues);
  const [createdGroupCode, setCreatedGroupCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id: userId } = useUser((s) => s);

  const validateForm = useCallback(() => {
    if (!formValues.groupName) {
      return "그룹명을 입력해주세요.";
    }
    if (!formValues.course) {
      return "과정을 선택해주세요.";
    }
    if (!formValues.generation) {
      return "기수를 입력해주세요.";
    }

    return null;
  }, [formValues]);

  const handleCreateGroup = useCallback(async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const code = await generateUniqueGroupCode();
      const group = await createGroup({
        name: formValues.groupName,
        course: formValues.course,
        batch: formValues.generation,
        code,
        creator_id: userId,
      });

      try {
        await insertGroupMember({
          groupId: group.id,
          userId: userId,
          role: "OWNER",
        });
      } catch (memberError) {
        await deleteGroup(group.id).catch((rollbackError) => {
          console.error("롤백 실패(그룹 삭제):", rollbackError);
        });
        throw memberError;
      }

      setCreatedGroupCode(code);
      setSteps("success");
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formValues, validateForm, userId]);

  const handleNext = useCallback(() => {
    if (steps === "group-info-form") {
      handleCreateGroup();
    } else if (steps === "success") {
      onClose();
    }
  }, [handleCreateGroup, onClose, steps]);

  const handleCopyCode = useCallback(async () => {
    if (!createdGroupCode) return;
    try {
      await navigator.clipboard.writeText(createdGroupCode);
      // TODO: 복사 완료 토스트/피드백 추가
    } catch {
      console.error("클립보드 복사 실패");
    }
  }, [createdGroupCode]);

  useEffect(() => {
    if (!open) {
      setSteps("group-info-form");
      setFormValues(initialFormValues);
      setCreatedGroupCode(null);
      setIsSubmitting(false);
    }
  }, [open]);

  return {
    steps,
    formValues,
    setFormValues,
    createdGroupCode,
    isSubmitting,
    handleNext,
    handleCopyCode,
  };
}
