import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import LocalFilter from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";

// 메타 정보
const meta = {
  title: "Pages/Restaurant-list-page/LocalFilter",
  component: SearchBar, // 기본 컴포넌트는 SearchBar로 설정
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterWithSearch: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedRegion, setSelectedRegion] = useState(""); // 상태 추가

    const allRestaurants = [
      "제주시 흑돼지 맛집",
      "서귀포 해물탕",
      "한림 카페거리",
      "애월 바다뷰 카페",
      "제주시 갈치조림",
      "서귀포 올레길 맛집",
    ];

    const handleSelectRegion = (region: string) => {
      setSelectedRegion(region);
      setSearchValue(region);
    };

    return (
      <div style={{ width: "400px" }}>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder="제주 맛집을 검색해보아요"
          data={allRestaurants}
        />

        <LocalFilter
          regions={["제주시", "서귀포시", "한림", "애월"]}
          selectedRegion={selectedRegion} // 선택된 지역 상태 전달
          onSelectRegion={handleSelectRegion}
        />
      </div>
    );
  },
};
