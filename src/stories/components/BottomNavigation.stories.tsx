import type { Meta, StoryObj } from "@storybook/react-vite";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";

const meta: Meta<typeof BottomNavigation> = {
  title: "Components/BottomNavigation",
  component: BottomNavigation,
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {};
