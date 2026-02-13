import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof BottomNavigation> = {
  title: "Components/BottomNavigation",
  component: BottomNavigation,
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {};
