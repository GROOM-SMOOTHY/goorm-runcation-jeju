import type { Meta, StoryObj } from "@storybook/react-vite";
import SignUpEmailVerification from "@/components/pages/SignUp/SignUpEmailVerification/SignUpEmailVerification";

const meta: Meta<typeof SignUpEmailVerification> = {
  title: "Pages/SignUp/SignUpEmailVerification/SignUpEmailVerification",
  component: SignUpEmailVerification,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SignUpEmailVerification>;

export const Default: Story = {};
