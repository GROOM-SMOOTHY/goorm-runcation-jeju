import { useEffect, useState } from "react";
import PayUser from "@/components/pages/settlement-add-history-page/PayUser";
import type { Meta, StoryObj } from "@storybook/react-vite";

const MOCK_USERS = [
  {
    id: "1",
    name: "김민수",
    profileSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "박지훈",
    profileSrc: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "이예슬",
    profileSrc: "https://i.pravatar.cc/150?img=3",
  },
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
      options: MOCK_USERS.map((user) => user.id),
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
