import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/SearchBar/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  data?: string[];
  onSearch?: (results: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "제주 맛집을 검색해보아요",
  data = [],
  onSearch,
}) => {
  const [input, setInput] = React.useState("");

  // 검색 실행 함수
  const handleSearch = (keyword: string) => {
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(keyword.toLowerCase())
    );

    onSearch?.(filtered);
  };

  // 입력 시 바로 검색
  const handleChange = (val: string) => {
    setInput(val);
    handleSearch(val);
  };

  return (
    <div className={styles.SearchBar}>
      {/* 아이콘 클릭 시 현재 input으로 검색 */}
      <FaSearch
        className={styles.Icon}
        onClick={() => handleSearch(input)}
      />

      <input
        type="text"
        className={styles.Input}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
