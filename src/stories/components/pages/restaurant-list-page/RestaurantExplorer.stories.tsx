import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useMemo, useEffect } from "react";
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

interface WrapperProps {
  onSearch?: (results: string[]) => void;
  onSelectRegion?: (region: string) => void;
}

const Wrapper = ({ onSearch, onSelectRegion }: WrapperProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // 필터링
  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (selectedRegion ? r.location === selectedRegion : true)
    );
  }, [searchValue, selectedRegion]);

  // 검색 결과 Action 호출
  useEffect(() => {
    onSearch?.(filteredRestaurants.map((r) => r.name));
  }, [filteredRestaurants, onSearch]);

  return (
    <div style={{ width: "400px" }}>
      {/* SearchBar */}
      <SearchBar
        placeholder="제주 맛집을 검색해보아요"
        data={mockRestaurants.map((r) => r.name)}
        onSearch={(results) => {
          setSearchValue(results.join(" "));
          onSearch?.(results); // 🔥 Action 패널 호출
        }}
      />

      {/* LocalFilter */}
      <LocalFilter
        regions={["제주시", "서귀포시", "한림", "애월"]}
        selectedRegion={selectedRegion}
        onSelectRegion={(region) => {
          setSelectedRegion(region);
          onSelectRegion?.(region);
        }}
      />

      {/* StoreCard 리스트 */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant, idx) => (
            <StoreCard
              key={idx}
              {...restaurant}
              onToggleFavorite={() => {
                const newRestaurants = [...mockRestaurants];
                newRestaurants[idx].isFavorite = !newRestaurants[idx].isFavorite;
              }}
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

const meta: Meta<typeof Wrapper> = {
  title: "Pages/Restaurant-list-page/RestaurantExplorer",
  component: Wrapper,
  parameters: { layout: "centered" },
  argTypes: {
    onSearch: { action: "searched" },
    onSelectRegion: { action: "regionSelected" },
  },
};

export default meta;
type Story = StoryObj<typeof Wrapper>;

export const Default: Story = {};
