import type { Meta, StoryObj } from "@storybook/react";
import Loading from "@/components/common/Loading/Loading";

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
  tags: ["autodocs"],
  argTypes: {
    fullScreen: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    fullScreen: false,
  },
};