import type { Meta, StoryObj } from "@storybook/react-vite";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";
import Button from "@/components/common/Button/Button";

// 스토리에서 사용할 토스트 추가 함수의 인자 타입 정의
interface ToastStoryArgs {
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
}

// 버튼 클릭으로 토스트 띄우는 컴포넌트
function ToastWithTrigger({ title, description, type }: ToastStoryArgs) {
  const { addToast } = useToastStore();

  return (
    <>
      <Button
        type="button"
        onClick={() => addToast(title, description, type)}
      >
        Show Toast
      </Button>
      <AnimatedToast />
    </>
  );
}

// Storybook meta
const meta = {
  title: "Components/Toast",
  component: ToastWithTrigger,
  parameters: {
    layout: "fullscreen", // 화면 전체에 Toast 표시
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastWithTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// 에러 토스트 스토리
export const Error: Story = {
  args: {
    title: "에러 발생!",
    description: "문제가 발생했습니다. 다시 시도해주세요.",
    type: "error" ,
  },
  render: (args) => <ToastWithTrigger {...args} />,
};

// 성공 토스트 스토리
export const Success: Story = {
  args: {
    title: "성공!",
    description: "작업이 성공적으로 완료되었습니다.",
    type: "success",
  },
  render: (args) => <ToastWithTrigger {...args} />,
};

// 경고 토스트 스토리
export const Warning: Story = {
  args: {
    title: "경고!",
    description: "주의가 필요합니다. 설정을 확인해주세요.",
    type: "warning",
  },
  render: (args) => <ToastWithTrigger {...args} />,
};

// 정보 토스트 스토리
export const Info: Story = {
  args: {
    title: "알림",
    description: "새로운 업데이트가 있습니다.",
    type: "info",
  },
  render: (args) => <ToastWithTrigger {...args} />,
};
