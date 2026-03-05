import type { Meta, StoryObj } from "@storybook/react-vite";
import SettleCard from "@/components/pages/settlement-history-page/SettleCard/SettleCard";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";

const accountHolder = {
  name: "김나영",
  bank: "농협",
  accountNumberMasked: "000-****-****-00",
  accountNumberForCopy: "352-1234-56789-00",
};

const makeMembers = (name: string, count: number) =>
  Array.from({ length: count }, () => ({ name }));

const defaultArgs = {
  expenseId: "expense-1",
  title: "점심 밥 모임",
  date: "2025.02.10",
  totalMemberCount: 20,
  totalAmount: 600000,
  completedMembers: [],
  pendingMembers: [...makeMembers("이권우", 19), { name: "이예슬" }],
  accountHolder,
  status: "pending" as const,
  currentUserName: "이예슬",
  defaultExpanded: false,
  onStatusChange: async (
    expenseId: string,
    status: "completed" | "pending",
  ) => {
    console.log("status", expenseId, status);
  },
};

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
    category: {
      control: "select",
      options: ["food", "transportation", "cafe", "etc"],
    },
    expenseDate: { control: "text" },
    memberCount: { control: "number" },
    isProgressFull: { control: "boolean" },
    isPaid: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SettleCard>;

export const Default: Story = {
  args: defaultArgs,
};

export const AsAccountHolder: Story = {
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
      {/* <SettleCard
        expenseId="expense-1"
        title="점심 밥 모임"
        date="2025.02.10"
        totalMemberCount={20}
        totalAmount={600000}
        completedMembers={[...makeMembers("이권우", 19), { name: "이예슬" }]}
        pendingMembers={[]}
        accountHolder={accountHolder}
        status="completed"
        currentUserName="이예슬"
        defaultExpanded={false}
        onStatusChange={async () => {}}
      />
      <SettleCard
        expenseId="expense-2"
        title="저녁 회식"
        date="2025.02.12"
        totalMemberCount={8}
        totalAmount={240000}
        completedMembers={makeMembers("이권우", 5)}
        pendingMembers={[...makeMembers("박지훈", 2), { name: "이예슬" }]}
        accountHolder={{ ...accountHolder, name: "박지훈" }}
        status="pending"
        currentUserName="이예슬"
        defaultExpanded={false}
        onStatusChange={async () => {}}
      />
      <SettleCard
        expenseId="expense-3"
        title="주말 여행 정산"
        date="2025.02.15"
        totalMemberCount={4}
        totalAmount={320000}
        completedMembers={makeMembers("이권우", 2)}
        pendingMembers={[...makeMembers("김철수", 1), { name: "이예슬" }]}
        accountHolder={accountHolder}
        status="pending"
        currentUserName="이예슬"
        defaultExpanded={false}
        onStatusChange={async () => {}}
      /> */}
    </div>
  ),
};
