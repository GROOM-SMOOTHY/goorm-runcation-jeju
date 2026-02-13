import PendingSettlementPanel from "@/components/pages/main-page/PendingSettlementPanel";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/MainPage/PendingSettlementPanel",
    component: PendingSettlementPanel,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        count: {
            control: "number",
            description: "정산 대기 건수",
        },
    },
} satisfies Meta<typeof PendingSettlementPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        count: 3,
    },
};

export const Zero: Story = {
    args: {
        count: 0,
    },
};

export const Many: Story = {
    args: {
        count: 99,
    },
};
