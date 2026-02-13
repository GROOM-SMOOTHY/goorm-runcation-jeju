import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonNavigation from "@/components/BottomNavigation/BottomNavigation";

const meta: Meta<typeof ButtonNavigation> = {
  title: "Components/ButtonNavigation",
  component: ButtonNavigation,
};

export default meta;

type Story = StoryObj<typeof ButtonNavigation>;

export const Default: Story = {};
