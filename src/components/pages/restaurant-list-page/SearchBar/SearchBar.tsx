import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/SearchBar/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  data?: string[];
  onSearch?: (results: string[]) => void;
  maxResults?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "제주 맛집을 검색해보아요",
  data = [],
  onSearch,
  maxResults = 4,
}) => {
  const [input, setInput] = React.useState("");


  // 검색 필터링 로직
  const getFilteredResults = (keyword: string) => {
    return data
      .filter((item) =>
        item.toLowerCase().includes(keyword.toLowerCase())
      )
      .slice(0, maxResults);
  };


  // 실제 검색 실행 함수
  // (아이콘 클릭 / Enter 키 둘 다 여기로 통일)
  const executeSearch = () => {
    if (onSearch) {
      const results = getFilteredResults(input);
      onSearch(results);
    }
  };


  // 입력 변경
  const handleChange = (val: string) => {
    setInput(val);
  };


  // Enter 키 감지
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  return (
    <div className={styles.SearchBar}>
      <FaSearch
        className={styles.Icon}
        onClick={executeSearch}
        role="button"
        aria-label="search-button"
      />

      <input
        type="text"
        className={styles.Input}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="search-input"
      />
    </div>
  );
};

export default SearchBar;
