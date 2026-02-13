import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";

const mockData = [
  "제주 흑돼지 맛집",
  "제주 해물탕",
  "제주 카페거리",
  "제주 올레길 음식점",
  "제주 해산물 맛집",
];

const meta = {
  title: "pages/restaurant-list-page/SearchBar",
  component: SearchBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchBarWithState() {
  const [value, setValue] = useState("");

  return (
    <>
      <SearchBar
        value={value}
        onChange={setValue}
        data={mockData}
        placeholder="제주 맛집을 검색해보아요"
      />
    </>
  );
}

export const Default: Story = {
  render: () => <SearchBarWithState />,
};
