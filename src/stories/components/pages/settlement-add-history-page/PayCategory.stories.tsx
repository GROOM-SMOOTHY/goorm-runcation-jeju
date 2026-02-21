import { useState, useEffect } from "react";
import PayCategory from "@/components/pages/settlement-add-history-page/PayCategory";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/SettlementAddHistoryPage/PayCategory",
    component: PayCategory,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: (args) => {
        const [value, setValue] = useState(args.value);

        useEffect(() => {
            setValue(args.value);
        }, [args.value]);

        return (
            <PayCategory
                {...args}
                value={value}
                onChange={(v) => {
                    setValue(v);
                    args.onChange?.(v);
                }}
            />
        );
    },
    argTypes: {
        value: {
            control: "select",
            options: ["food", "transportation", "cafe", "etc"],
            description: "선택된 카테고리",
        },
    },
} satisfies Meta<typeof PayCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: "",
        onChange: () => { },
    },
};

export const SelectedCafe: Story = {
    args: {
        value: "cafe",
        onChange: () => { },
    },
};