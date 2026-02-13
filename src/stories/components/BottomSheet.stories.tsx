import type { Meta, StoryObj } from "@storybook/react-vite";
import { useBottomSheet } from "@/components/common/BottomSheet/useBottomSheet";
import Button from "@/components/common/Button/Button.tsx";

interface SheetContentProps {
  title?: string;
  onClose: () => void;
}

function SheetContent({ title, onClose }: SheetContentProps) {
  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ fontSize: 20, lineHeight: "28px", color: 'var(--text-primary)', margin: 0 }}>
        {title ?? "바텀시트"}
      </h3>
      <p style={{ margin: "16px 0", color: "#2a2b2c" }}>
        useBottomSheet &#123; content: &#60;Content &#123;...props&#125; /&#62; &#125; 형태로
        컨텐츠를 넘기면 됩니다.
      </p>
      <Button type="button" variant="primary" onClick={onClose}>
        확인
      </Button>
    </div>
  );
}

function BottomSheetWithHook() {
  const { open, BottomSheet } = useBottomSheet({
    content: ({ close }) => <SheetContent title="안녕하세요" onClose={close} />,
  });

  return (
    <>
      <Button type="button" variant="primary" onClick={open}>
        바텀시트 열기
      </Button>
      <BottomSheet />
    </>
  );
}

const meta = {
  title: "Components/BottomSheet",
  component: BottomSheetWithHook,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`useBottomSheet({ content: <Content {...props} /> })` 로 컨텐츠를 넘기고, 반환된 `open`, `close`, `BottomSheet` 를 사용합니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomSheetWithHook>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithUseBottomSheet: Story = {
  render: () => <BottomSheetWithHook />
};
