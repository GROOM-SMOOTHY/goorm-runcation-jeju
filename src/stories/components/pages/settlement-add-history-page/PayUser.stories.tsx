import { useEffect, useState } from "react";
import PayUser from "@/components/pages/settlement-add-history-page/PayUser";
import type { Meta, StoryObj } from "@storybook/react-vite";

const MOCK_USERS = [
  { id: "user-1", nickname: "김나영" },
  { id: "user-2", nickname: "이철수" },
  { id: "user-3", nickname: "박지훈" },
];

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
        onChange={(userId, userObj) => {
          setValue(userId);
          args.onChange?.(userId, userObj);
        }}
      />
    );
  },
  argTypes: {
    value: {
      control: "select",
      options: ["", ...MOCK_USERS.map((user) => user.id)],
    },
  },
} satisfies Meta<typeof PayUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
  },
};

export const SelectedUser: Story = {
  args: {
    value: MOCK_USERS[0].id,
    onChange: () => {},
  },
};
