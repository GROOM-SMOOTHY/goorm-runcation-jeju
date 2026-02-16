import type { Meta, StoryObj } from "@storybook/react-vite";
import UploadCard from "@/components/pages/Stamp/AddStampPicture/AddStampPicture";

const meta: Meta<typeof UploadCard> = {
  title: "Pages/AddStampPicture",
  component: UploadCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UploadCard>;

export const Default: Story = {};
