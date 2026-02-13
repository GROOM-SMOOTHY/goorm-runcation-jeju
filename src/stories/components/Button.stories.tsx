import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../../components/common/Button/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
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
