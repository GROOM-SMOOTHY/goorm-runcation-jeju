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

/** 20명 전원 미완료: 미완료에 20명, 그중 한 명만 "나"(이예슬) */
const defaultArgs = {
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
  onStatusChange: (s: "completed" | "pending") => console.log("status", s),
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
    date: { control: "text" },
    status: { control: "radio", options: ["completed", "pending"] },
    currentUserName: { control: "text" },
    defaultExpanded: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SettleCard>;

/** 기본: 카드 1개 (접힌 상태 기본) */
export const Default: Story = {
  args: defaultArgs,
};

/** 입금자가 나일 때: 받는 사람에 "나 (입금자)" 뱃지 표시 */
export const AsAccountHolder: Story = {
  args: {
    ...defaultArgs,
    accountHolder: { ...accountHolder, name: "이예슬" },
    pendingMembers: makeMembers("이권우", 19),
    completedMembers: [],
    defaultExpanded: true,
  },
};

/** 리스트: 카드 여러 개, "나"는 이예슬 한 명만 표시 + 토글로 미완료/완료 와리가리 */
export const List: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: 400 }}>
      <SettleCard
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
      />
      <SettleCard
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
      />
      <SettleCard
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
      />
    </div>
  ),
};
