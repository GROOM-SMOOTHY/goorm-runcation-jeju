import GroupCardButton from "@/components/pages/group-list-page/GroupCardButton/GroupCardButton";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/GroupListPage/GroupCardButton",
    component: GroupCardButton,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        type: { control: "select", options: ["create", "join"] },
        onClick: { action: "clicked" },
    },
    args: {
        onClick: () => { },
    },
} satisfies Meta<typeof GroupCardButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
    args: {
        label: "Create",
        title: "그룹 생성",
        type: "create",
    }
}

export const Join: Story = {
    args: {
        label: "Join",
        title: "그룹 참여",
        type: "join",
    }
}
