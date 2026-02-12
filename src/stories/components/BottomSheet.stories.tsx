import type { Meta, StoryObj } from "@storybook/react-vite";
import { useBottomSheet } from "@/components/common/BottomSheet";
import Button from "@/components/common/Button";

/** 시트 안에 들어갈 컨텐츠 예시 (props로 onClose 받음) */
function SheetContent({
  title,
  onClose,
}: {
  title?: string;
  onClose: () => void;
}) {
  return (
    <>
      <div className="bottomsheet-header">
        <h3 style={{ fontSize: "20px", lineHeight: "28px", color: 'var(--text-primary)', margin: 0 }}>
          {title ?? "바텀시트"}
        </h3>
      </div>
      <p style={{ margin: "0 0 16px", color: "#4B5563" }}>
        useBottomSheet &#123; content: &#60;Content &#123;...props&#125; /&#62; &#125; 형태로
        컨텐츠를 넘기면 됩니다.
      </p>
      <Button variant="filled" onClick={onClose}>
        확인
      </Button>
    </>
  );
}

/** useBottomSheet 훅 사용 예시: 버튼 클릭 시 시트 열기 */
function BottomSheetWithHook() {
  const { open, BottomSheet } = useBottomSheet({
    content: ({ close }) => (
      <SheetContent title="안녕하세요" onClose={close} />
    ),
  });

  return (
    <>
      <Button onClick={open}>바텀시트 열기</Button>
      <BottomSheet />
    </>
  );
}

const meta = {
  title: "Components/BottomSheet",
  component: () => null,
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
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithUseBottomSheet: Story = {
  render: () => <BottomSheetWithHook />
};
