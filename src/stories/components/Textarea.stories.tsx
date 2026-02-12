import type { Meta, StoryObj } from "@storybook/react-vite";
import Textarea from "@/components/Textarea/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => {
    return <Textarea {...args} value={args.value} onChange={args.onChange} />;
  },
  args: {
    value: "",
    onChange: () => {},
    placeholder: "오늘의 업무와 휴식은 어땠나요?",
  },
};
