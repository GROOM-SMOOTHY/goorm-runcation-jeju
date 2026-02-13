import { useState } from "react";
import type { StoryObj, Meta } from "@storybook/react-vite";
import Input from "@/components/common/Input/Input";

const meta = {
  title: "Components/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "이메일",
    name: "email",
    type: "email",
    placeholder: "이메일을 입력해주세요",
    variant: "default",
    required: true,
  },
};
export const AuthCodeInput: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={setValue} onAuthRequest={() => console.log('인증 요청됨')} />;
  },
  args: {
    label: "이메일",
    name: "email",
    type: "email",
    placeholder: "이메일을 입력해주세요",
    variant: "auth",
    required: true,
  },
};
