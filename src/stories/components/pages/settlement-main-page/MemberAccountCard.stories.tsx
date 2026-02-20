import MemberAccountCard, { type MemberAccount } from "@/components/pages/settlement-main-page/MemberAccountCard";
import AnimatedToast from "@/components/common/Toast/AnimatedToast";
import type { Meta, StoryObj } from "@storybook/react-vite";

const mockMembers: MemberAccount[] = [
  { name: "김민수", initial: "김민", bank: "신한", account: "110-***-1234", accountForCopy: "1101234567890", color: "orange" },
  { name: "최짜장", initial: "최짜", bank: "신한", account: "110-***-1234", accountForCopy: "1101234567891", color: "blue" },
  { name: "김민수", initial: "김민", bank: "신한", account: "110-***-1234", accountForCopy: "1101234567892", color: "purple" },
  { name: "박지훈", initial: "박지", bank: "국민", account: "123-***-5678", accountForCopy: "1234567890123", color: "orange" },
  { name: "이예슬", initial: "이예", bank: "농협", account: "352-***-7890", accountForCopy: "3521234567890", color: "blue" },
];

const meta = {
  title: "Pages/SettlementMainPage/MemberAccountCard",
  component: MemberAccountCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <AnimatedToast />
      </>
    ),
  ],
  argTypes: {
    members: { control: false },
    visibleCount: { control: "number", description: "초기 노출 멤버 수" },
  },
} satisfies Meta<typeof MemberAccountCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    members: mockMembers,
    visibleCount: 3,
  },
};

export const FewMembers: Story = {
  args: {
    members: mockMembers.slice(0, 2),
    visibleCount: 3,
  },
};
