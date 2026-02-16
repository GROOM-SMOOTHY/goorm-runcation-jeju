import type { Meta, StoryObj } from "@storybook/react-vite";
import MyProfilePicture from "@/components/pages/Mypage/MyProfilePicture/MyProfilePicture";

const meta: Meta<typeof MyProfilePicture> = {
  title: "Pages/MyProfilePicture/MyProfilePicture",
  component: MyProfilePicture,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MyProfilePicture>;

export const Default: Story = {};
