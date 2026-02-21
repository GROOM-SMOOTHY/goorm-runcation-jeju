import { useEffect, useState } from "react";
import PayUser from "@/components/pages/settlement-add-history-page/PayUser";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MOCK_USERS } from "@/components/pages/settlement-add-history-page/PayUser/PayUser";

const meta = {
    title: "Pages/SettlementAddHistoryPage/PayUser",
    component: PayUser,
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
            <PayUser
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
            options: MOCK_USERS.map((user) => user.id),
        },
    },
} satisfies Meta<typeof PayUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: "",
        onChange: () => { },
    },
};

export const SelectedUser: Story = {
    args: {
        value: MOCK_USERS[0].id,
        onChange: () => { },
    },
};