import type { Meta, StoryObj } from "@storybook/react-vite";
import UploadCard from "@/components/pages/Mypage/TipBox/TipBox";

const meta: Meta<typeof UploadCard> = {
  title: "Pages/TipBox/TipBox",
  component: UploadCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UploadCard>;

export const Default: Story = {};
