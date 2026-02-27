import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import useCreateGroupModal from "./useCreateGroupModal";
import GroupInfoStep from "./GroupInfoStep";
import GroupSuccessStep from "./GroupSuccessStep";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({ open, onClose }: Props) {
  const {
    steps,
    formValues,
    setFormValues,
    createdGroupCode,
    isSubmitting,
    handleNext,
    handleCopyCode,
  } = useCreateGroupModal(open, onClose);

  return (
    <Modal isOpen={open} onClose={onClose}>
      <Modal.Header>그룹 생성</Modal.Header>
      <Modal.Content>
        {steps === "group-info-form" && (
          <GroupInfoStep formValues={formValues} onChange={setFormValues} />
        )}
        {steps === "success" && (
          <GroupSuccessStep
            createdGroupCode={createdGroupCode}
            onCopyCode={handleCopyCode}
          />
        )}
      </Modal.Content>
      <Modal.Footer>
        <Button
          type="button"
          onClick={handleNext}
          disabled={steps === "group-info-form" && isSubmitting}
          loading={isSubmitting}
        >
          {steps === "group-info-form" ? "생성하기" : "닫기"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
