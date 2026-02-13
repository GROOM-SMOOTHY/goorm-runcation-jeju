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
        title: {
            control: "select",
            options: ["FRONTEND", "BACKEND", "DESIGN", "DEFAULT"],
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
        title: 'FRONTEND',
        participants: 10,
        generation: 1,
        onClick: () => { },
    },
};