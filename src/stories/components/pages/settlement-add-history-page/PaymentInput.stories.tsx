import { useState, useEffect } from "react";
import PaymentInput from "@/components/pages/settlement-add-history-page/PaymentInput";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    title: "Pages/SettlementAddHistoryPage/PaymentInput",
    component: PaymentInput,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    // 공통 render 로직을 meta에 정의하면 모든 스토리에 적용됩니다.
    render: (args) => {
        const [value, setValue] = useState(args.value);

        // Controls 패널에서 value를 직접 조작할 때 반영되도록 동기화
        useEffect(() => {
            setValue(args.value);
        }, [args.value]);

        return (
            <PaymentInput
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
        value: { control: "number" },
    },
} satisfies Meta<typeof PaymentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// 이제 각 스토리는 args만 정의하면 됩니다.
export const Default: Story = {
    args: {
        onChange: () => { },
        value: 0,
        placeholder: "0",
    },
};

export const WithInitialValue: Story = {
    args: {
        onChange: () => { },
        placeholder: "0",
        value: 30000,
    },
};