import type { Meta, StoryObj } from "@storybook/react-vite";
import SettleCard from "@/components/pages/settlement-history-page/SettleCard/SettleCard";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";

const meta: Meta<typeof SettleCard> = {
  title: "Pages/Settlement-history-page/SettleCard",
  component: SettleCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <AnimatedToast />
      </>
    ),
  ],
  argTypes: {
    title: { control: "text" },
    category: { control: "select", options: ["food", "transportation", "cafe", "etc"] },
    expenseDate: { control: "text" },
    memberCount: { control: "number" },
    isProgressFull: { control: "boolean" },
    isPaid: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SettleCard>;

/** 기본: 카드 1개 (접힌 상태 기본) */
export const Default: Story = {
  args: {
    expenseId: "exp-1",
    title: "점심 밥 모임",
    category: "food",
    expenseDate: "2025.02.10",
    memberCount: 20,
    isProgressFull: false,
    isPaid: false,
  },
};

/** 정산 중 상태 */
export const InProgress: Story = {
  args: {
    expenseId: "exp-2",
    title: "저녁 회식",
    category: "food",
    expenseDate: "2025.02.12",
    memberCount: 8,
    isProgressFull: false,
    isPaid: true,
  },
};

/** 정산 완료 상태 */
export const Completed: Story = {
  args: {
    expenseId: "exp-3",
    title: "주말 여행 정산",
    category: "transportation",
    expenseDate: "2025.02.15",
    memberCount: 4,
    isProgressFull: true,
    isPaid: true,
  },
};

/** 리스트: 카드 여러 개 */
export const List: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        maxWidth: 400,
      }}
    >
      <SettleCard
        expenseId="exp-1"
        title="점심 밥 모임"
        category="food"
        expenseDate="2025.02.10"
        memberCount={20}
        isProgressFull={true}
        isPaid={true}
      />
      <SettleCard
        expenseId="exp-2"
        title="저녁 회식"
        category="food"
        expenseDate="2025.02.12"
        memberCount={8}
        isProgressFull={false}
        isPaid={true}
      />
      <SettleCard
        expenseId="exp-3"
        title="주말 여행 정산"
        category="transportation"
        expenseDate="2025.02.15"
        memberCount={4}
        isProgressFull={false}
        isPaid={false}
      />
    </div>
  ),
};
