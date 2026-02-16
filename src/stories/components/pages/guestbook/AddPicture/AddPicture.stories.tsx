import type { Meta, StoryObj } from "@storybook/react-vite";
import UploadCard from "@/components/pages/guestbook/AddPicture/AddPicture";

const meta: Meta<typeof UploadCard> = {
  title: "Pages/AddPicture/AddPicture",
  component: UploadCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UploadCard>;

export const Default: Story = {};
