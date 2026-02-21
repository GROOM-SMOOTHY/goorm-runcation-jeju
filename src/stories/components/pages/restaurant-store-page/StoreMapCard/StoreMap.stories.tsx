import type { Meta, StoryObj } from "@storybook/react-vite";
import StoreMap from "@/components/pages/restaurant-store-page/StoreMap/StoreMap";

const meta = {
  title: "Pages/Restaurant-store-page/StoreMap",
  component: StoreMap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    latitude: { control: "number" },
    longitude: { control: "number" },
  },
} satisfies Meta<typeof StoreMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    latitude: 37.5665,
    longitude: 126.9780,
  },
};
