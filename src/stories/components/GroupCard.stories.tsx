import type { Meta, StoryObj } from "@storybook/react-vite";
import GroupCard from "@/components/common/GroupCard/GroupCard";

const meta = {
  title: "Components/GroupCard",
  component: GroupCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    course: {
      control: "select",
      options: ["FRONTEND", "BACKEND", "DESIGN", "DEFAULT"],
    },
  },
} satisfies Meta<typeof GroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    course: "FRONTEND",
    generation: "12",
    participantsCount: 8,
    title: "프론트엔드 스터디",
    description: "React 심화 학습 모임",
    avatars: ["https://randomuser.me/api/portraits/women/68.jpg", "https://randomuser.me/api/portraits/men/12.jpg"],
  },
};
