import type { Meta, StoryObj } from "@storybook/react-vite";
import SignUpInput from "@/components/pages/SignUp/SignUpEmailVerification/SignUpEmailVerification";

const meta: Meta<typeof SignUpInput> = {
  title: "Pages/SignUp/SignUpEmailVerification",
  component: SignUpInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SignUpInput>;

export const Default: Story = {};

export const WithLongEmail: Story = {
  render: () => <SignUpInput />,
};
