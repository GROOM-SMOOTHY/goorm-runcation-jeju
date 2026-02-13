import type { Meta, StoryObj } from "@storybook/react-vite";
import Group from "@/components/common/Group/Group";

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

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Group
        process={["FRONTEND"]}
        generation="12"
        participantsCount={12}
        title="제주 코딩의 정석"
        description="함께 성장하는 프론트엔드 워케이션"
        avatars={[
          "https://randomuser.me/api/portraits/women/68.jpg",
          "https://randomuser.me/api/portraits/men/12.jpg",
        ]}
      />

      <Group
        process={["BACKEND"]}
        generation="5"
        participantsCount={8}
        title="Node.js 스터디"
        description="함께 배우는 백엔드 개발"
        avatars={[
          "https://randomuser.me/api/portraits/men/45.jpg",
          "https://randomuser.me/api/portraits/women/22.jpg",
        ]}
      />
    </div>
  ),
};
