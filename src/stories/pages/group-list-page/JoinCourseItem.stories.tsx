import JoinCourseItem from "@/components/pages/group-list-page/JoinCourseItem";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Tables } from "@/types/supabase";

const mockMembers: (Tables<"group_members"> & { user: Tables<"users"> })[] = [
  {
    group_id: "group-1",
    id: "gm-1",
    joined_at: "2025-01-01",
    role: "OWNER",
    user_id: "user-1",
    user: {
      account_id: "acc-1",
      created_at: "2025-01-01",
      email: null,
      id: "user-1",
      nickname: "김나영",
      phone: null,
      profile: null,
      updated_at: null,
    },
  },
  {
    group_id: "group-1",
    id: "gm-2",
    joined_at: "2025-01-01",
    role: "MEMBER",
    user_id: "user-2",
    user: {
      account_id: "acc-2",
      created_at: "2025-01-01",
      email: null,
      id: "user-2",
      nickname: "이철수",
      phone: null,
      profile: null,
      updated_at: null,
    },
  },
];

const meta = {
  title: "Pages/GroupListPage/JoinCourseItem",
  component: JoinCourseItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    course: {
      control: "select",
      options: ["FRONTEND", "BACKEND", "DESIGN", null],
    },
    participants: {
      control: "number",
    },
    generation: {
      control: "number",
    },
    onClick: {
      action: "clicked",
    },
  },
} satisfies Meta<typeof JoinCourseItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <JoinCourseItem {...args} />,
  args: {
    course: "FRONTEND",
    participants: 10,
    generation: 1,
    members: [],
    onClick: () => {},
  },
};
