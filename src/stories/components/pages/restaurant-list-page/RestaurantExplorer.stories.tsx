import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";
import LocalFilter from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter";
import type { StoreCardProps } from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import StoreCard from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";

const mockRestaurants: StoreCardProps[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    location: "제주시",
    category: "카페",
    name: "달콤한 하루",
    description: "아늑한 분위기와 맛있는 디저트를 즐길 수 있는 카페입니다.",
    isFavorite: false,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    location: "서귀포시",
    category: "레스토랑",
    name: "바다의 맛집",
    description: "신선한 해산물을 맛볼 수 있는 대표 레스토랑",
    isFavorite: true,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    location: "한림",
    category: "술집",
    name: "한잔의 행복",
    description: "친구들과 함께 즐길 수 있는 편안한 술집입니다.",
    isFavorite: false,
  },
];

const meta: Meta<typeof StoreCard> = {
  title: "Pages/Restaurant-list-page/RestaurantExplorer",
  component: StoreCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StoreCard>;

function RestaurantExplorer() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [restaurants, setRestaurants] = useState(mockRestaurants);

  // 필터링
  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.includes(searchValue) &&
      (selectedRegion ? r.location === selectedRegion : true)
  );

  // 즐겨찾기 토글
  const handleToggleFavorite = (index: number) => {
    const newRestaurants = [...restaurants];
    newRestaurants[index].isFavorite = !newRestaurants[index].isFavorite;
    setRestaurants(newRestaurants);
  };

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
    setSearchValue(region); // 선택한 지역으로 자동 검색
  };

  return (
    <div style={{ width: "400px" }}>
      {/* SearchBar */}
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        placeholder="제주 맛집을 검색해보아요"
        data={restaurants.map((r) => r.name)}
      />

      {/* LocalFilter */}
      <LocalFilter
        regions={["제주시", "서귀포시", "한림", "애월"]}
        selectedRegion={selectedRegion} // 상태 전달
        onSelectRegion={handleSelectRegion}
      />

      {/* StoreCard 리스트 */}
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant, idx) => (
            <StoreCard
              key={idx}
              {...restaurant}
              onToggleFavorite={() => handleToggleFavorite(idx)}
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {},
  render: () => <RestaurantExplorer />,
};
