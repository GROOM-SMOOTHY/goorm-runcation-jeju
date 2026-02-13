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
    course: {
      control: "select",
      options: ["FRONTEND", "BACKEND", "DESIGN", "DEFAULT"],
    },
    generation: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    course: "FRONTEND",
    generation: "12",
  },
};

export const Backend: Story = {
  args: {
    course: "BACKEND",
  },
};

export const Design: Story = {
  args: {
    course: "DESIGN",
  },
};

export const Generation: Story = {
  args: {
    course: "DEFAULT",
    generation: "12",
  },
};
