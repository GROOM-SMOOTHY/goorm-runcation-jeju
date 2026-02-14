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
    onToggleFavorite: { action: "toggled favorite" },
  },
};

export default meta;
type Story = StoryObj<typeof StoreCard>;

export const Default: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/300x200",
    location: "서울 강남구",
    category: "카페",
    name: "달콤한 하루",
    description: "아늑한 분위기와 맛있는 디저트를 즐길 수 있는 카페입니다.",
    isFavorite: false,
  },
};

export const FavoriteActive: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/300x200",
    location: "부산 해운대",
    category: "레스토랑",
    name: "바다의 맛집",
    description: "신선한 해산물을 맛볼 수 있는 해운대 대표 레스토랑",
    isFavorite: true,
  },
};

export const ToggleFavoriteAction: Story = {
  args: {
    imageUrl: "https://via.placeholder.com/300x200",
    location: "서울 마포구",
    category: "술집",
    name: "한잔의 행복",
    description: "친구들과 함께 즐길 수 있는 편안한 술집입니다.",
    isFavorite: false,
    onToggleFavorite: () => console.log("즐겨찾기 토글!"),
  },
};
