import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "@/components/common/Button/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "회원가입",
    variant: "primary",
  },
};

export const Outline: Story = {
  args: {
    children: "회원가입",
    variant: "default",
  },
};

export const ClickLoading: Story = {
  render: (args) => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = () => {
      if (loading) return;

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    return (
      <Button
        {...args}
        loading={loading}
        onClick={handleClick}
      >
        회원가입
      </Button>
    );
  },
  args: {
    variant: "primary",
  },
};