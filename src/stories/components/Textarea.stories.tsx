import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Textarea from "@/components/Textarea/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Textarea {...args} value={value} onChange={setValue} />;
  },
  args: { placeholder: "오늘의 업무와 휴식은 어땠나요?" },
};
