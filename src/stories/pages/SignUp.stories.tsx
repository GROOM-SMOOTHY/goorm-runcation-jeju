import type { Meta, StoryObj } from "@storybook/react-vite";
import SignUpInput from "@/components/pages/SignUp/SignUpInput/SignUpInput";

const meta: Meta<typeof SignUpInput> = {
  title: "Pages/SignUp/SignUpInput",
  component: SignUpInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SignUpInput>;

export const Default: Story = {};
