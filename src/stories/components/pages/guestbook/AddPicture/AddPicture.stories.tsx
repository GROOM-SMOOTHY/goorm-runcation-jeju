import type { Meta, StoryObj } from "@storybook/react-vite";
import AddPicture from "@/components/pages/guestbook/AddPicture/AddPicture";

const meta: Meta<typeof AddPicture> = {
  title: "Pages/AddPicture/AddPicture",
  component: AddPicture,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AddPicture>;

export const Default: Story = {};
