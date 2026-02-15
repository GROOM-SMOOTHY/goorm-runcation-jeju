import type { Meta, StoryObj } from "@storybook/react-vite";
import StoreInfoCard from "@/components/pages/restaurant-store-page/StoreInfoCard/StoreInfoCard";
import AnimatedToast from "@/components/common/Toast/AnimatedToast"; // 화면 렌더링용 토스트

const meta = {
  title: "Pages/Restaurant-store-page/StoreInfoCard",
  component: StoreInfoCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <AnimatedToast /> {/* 반드시 렌더링해야 클릭 시 보임 */}
      </>
    ),
  ],
} satisfies Meta<typeof StoreInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    address: "제주특별자치도 제주시 애월읍 애월해안로ffffffffffffffff",
    contact: "010-1234-5678",
    hours: "12:00~24:00",
  },
};
