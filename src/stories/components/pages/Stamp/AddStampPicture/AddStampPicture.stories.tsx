import type { Meta, StoryObj } from "@storybook/react-vite";
import AddStampPicture from "@/components/pages/Stamp/AddStampPicture/AddStampPicture";

const meta: Meta<typeof AddStampPicture> = {
  title: "Pages/AddStampPicture",
  component: AddStampPicture,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AddStampPicture>;

export const Default: Story = {};
