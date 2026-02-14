import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useMemo, useEffect } from "react";
import LocalFilter from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";

interface WrapperProps {
  onSearch?: (results: string[]) => void;
  onSelectRegion?: (region: string) => void;
}

const Wrapper = ({ onSearch, onSelectRegion }: WrapperProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const allRestaurants = [
    "제주시 흑돼지 맛집",
    "서귀포 해물탕",
    "한림 카페거리",
    "애월 바다뷰 카페",
    "제주시 갈치조림",
    "서귀포 올레길 맛집",
  ];

  /* 🔥 검색 + 지역 필터 통합 */
  const filtered = useMemo(() => {
    return allRestaurants.filter((item) => {
      const matchKeyword = item
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());

      const matchRegion =
        selectedRegion === "" || item.includes(selectedRegion);

      return matchKeyword && matchRegion;
    });
  }, [searchKeyword, selectedRegion, allRestaurants]);

  useEffect(() => {
    onSearch?.(filtered);
  }, [filtered, onSearch]);

  return (
    <div style={{ width: "400px" }}>
      <SearchBar
        placeholder="제주 맛집을 검색해보아요"
        data={allRestaurants}
        onSearch={(results) => {
          setSearchKeyword(results.join(" "));
        }}
      />

      <LocalFilter
        regions={["제주시", "서귀포", "한림", "애월"]}
        selectedRegion={selectedRegion}
        onSelectRegion={(region) => {
          setSelectedRegion(region);
          onSelectRegion?.(region);
        }}
      />
    </div>
  );
};

const meta: Meta<typeof Wrapper> = {
  title: "Pages/Restaurant-list-page/Search+LocalFilter",
  component: Wrapper,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSearch: { action: "searched" },
    onSelectRegion: { action: "regionSelected" },
  },
};

export default meta;
type Story = StoryObj<typeof Wrapper>;

export const Default: Story = {};
