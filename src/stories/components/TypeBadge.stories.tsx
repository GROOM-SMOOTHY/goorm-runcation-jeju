import type { Meta, StoryObj } from "@storybook/react-vite";
import TypeBadge from "@/components/TypeBadge/TypeBadge";

const meta: Meta<typeof TypeBadge> = {
  title: "Components/TypeBadge",
  component: TypeBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    process: {
      control: { type: "check" },
      options: ["FRONTEND", "DESIGN", "BACKEND"],
    },
    generation: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TypeBadge>;

export const Default: Story = {
  args: {
    process: ["FRONTEND"],
    generation: "12",
  },
};
