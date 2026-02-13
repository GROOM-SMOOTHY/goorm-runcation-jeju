import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button/Button";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 트리거 버튼으로 열고 닫는 기본 사용 예시 */
function ModalWithTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <span>그룹생성</span>
        </Modal.Header>
        <Modal.Content>
          여기에 본문 내용을 넣습니다.<br />
          닫기 버튼이나 배경 클릭, ESC로 닫을 수 있습니다.
        </Modal.Content>
        <Modal.Footer>
          <Button type="button" variant="primary" onClick={() => setOpen(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => { },
    children: <div>모달 내용</div>,
  },
  render: () => <ModalWithTrigger />,
};
