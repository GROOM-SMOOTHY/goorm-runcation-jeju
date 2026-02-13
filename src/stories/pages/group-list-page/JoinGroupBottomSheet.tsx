import JoinGroupBottomSheet from "@/components/pages/group-list-page/JoinGroupBottomSheet/JoinGroupBottomSheet";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/GroupListPage/JoinGroupBottomSheet",
    component: JoinGroupBottomSheet,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
    },
} satisfies Meta<typeof JoinGroupBottomSheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <JoinGroupBottomSheet />,
};