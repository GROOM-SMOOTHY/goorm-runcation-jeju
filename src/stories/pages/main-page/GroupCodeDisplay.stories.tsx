import GroupCodeDisplay from "@/components/pages/main-page/GroupCodeDisplay";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/MainPage/GroupCodeDisplay",
    component: GroupCodeDisplay,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        code: {
            control: "text",
            description: "표시 및 복사할 그룹 코드",
        },
    },
} satisfies Meta<typeof GroupCodeDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        code: "ABC123",
    },
};

export const LongCode: Story = {
    args: {
        code: "GOORM-RUN-2024-XYZ",
    },
};

export const ShortCode: Story = {
    args: {
        code: "A1",
    },
};
