import type { Meta, StoryObj } from "@storybook/react-vite";
import TipBox from "@/components/pages/Mypage/TipBox/TipBox";

const meta: Meta<typeof TipBox> = {
  title: "Pages/TipBox/TipBox",
  component: TipBox,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TipBox>;

export const Default: Story = {};
