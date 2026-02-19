import type { Meta, StoryObj } from "@storybook/react-vite";
import StoreCard from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";

const meta: Meta<typeof StoreCard> = {
  title: "Pages/Restaurant-list-page/StoreCard",
  component: StoreCard,
  argTypes: {
    imageUrl: { control: "text" },
    location: { control: "text" },
    category: { control: "text" },
    name: { control: "text" },
    description: { control: "text" },
    isFavorite: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof StoreCard>;

export const Default: Story = {
  args: {
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    location: "서울 강남구",
    category: "카페",
    name: "달콤한 하루",
    description: "아늑한 분위기와 맛있는 디저트를 즐길 수 있는 카페입니다.",
    isFavorite: false,
  },
};
