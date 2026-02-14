import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";

const mockData = [
  "제주 흑돼지 맛집",
  "제주 해물탕",
  "제주 카페거리",
  "제주 올레길 음식점",
  "제주 해산물 맛집",
];

const meta: Meta<typeof SearchBar> = {
  title: "Pages/Restaurant-list-page/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: { control: "text" },
    data: { control: "object" },
    onSearch: { action: "searched" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    data: mockData,
    placeholder: "제주 맛집을 검색해보아요",
  },
};
