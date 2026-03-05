import JoinCourseItem from "@/components/pages/group-list-page/JoinCourseItem";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
