import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupPaymentStateCard from "@/components/pages/settlement-main-page/GroupPaymentStateCard/GroupPaymentStateCard";

const meta = {
  title: "Pages/Settlement-main-page/GroupPaymentStateCard",
  component: GroupPaymentStateCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GroupPaymentStateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalAmount: 10000000,
    courseName: "제주 런케이션",
    onAddPayment: () => alert("정산내역 추가 버튼 클릭!"),
  },
};
