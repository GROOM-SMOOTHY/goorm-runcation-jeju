import type { Meta, StoryObj } from "@storybook/react-vite";
import SignUpInput from "@/components/pages/SignUp/SignUpInput/SignUpInput";

const meta: Meta<typeof SignUpInput> = {
  title: "Pages/SignUp/SignUpInput",
  component: SignUpInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["name", "phone"],
      description: "입력 필드 타입",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignUpInput>;

/* 이름 입력 */
export const Name: Story = {
  args: {
    type: "name",
  },
};

/* 연락처 입력 */
export const Phone: Story = {
  args: {
    type: "phone",
  },
};
