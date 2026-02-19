import MainShortcutCard from "@/components/pages/main-page/MainShortcutCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/MainPage/MainShortcutCard",
    component: MainShortcutCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        type: {
            control: "select",
            options: ["store", "settlement"],
            description: "카드 종류",
        },
        title: {
            control: "text",
            description: "카드 제목",
        },
        onClick: {
            action: "clicked",
        },
    },
} satisfies Meta<typeof MainShortcutCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Store: Story = {
    args: {
        type: "store",
        title: <>지역별<br />맛집 탐방</>,
        onClick: () => { },
    },
};

export const Settlement: Story = {
    args: {
        type: "settlement",
        title: <>정산하기<br />& N빵</>,
        onClick: () => { },
    },
};
