import GroupPaymentStateCard from "@/components/pages/settlement-main-page/GroupPaymentStateCard/GroupPaymentStateCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Pages/SettlementMainPage/GroupPaymentStateCard",
  component: GroupPaymentStateCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    totalAmount: { control: "number", description: "그룹 총 지출 금액" },
    groupName: { control: "text", description: "그룹명" },
    onAddClick: { action: "addClicked", description: "정산내역 추가하기 클릭" },
  },
} satisfies Meta<typeof GroupPaymentStateCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalAmount: 10_000_000,
    groupName: "제주 런케이션",
  },
};

export const SmallAmount: Story = {
  args: {
    totalAmount: 145000,
    groupName: "점심 모임",
  },
};
