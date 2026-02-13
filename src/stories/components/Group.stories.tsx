import type { Meta, StoryObj } from "@storybook/react-vite";
import Group from "@/components/common/GroupCard/GroupcCard";

const meta = {
  title: "Components/Group",
  component: Group,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    process: ["FRONTEND"],
    generation: "12",
    participantsCount: 8,
    title: "프론트엔드 스터디",
    description: "React 심화 학습 모임",
    avatars: ["https://randomuser.me/api/portraits/women/68.jpg", "https://randomuser.me/api/portraits/men/12.jpg"],
  },
};
