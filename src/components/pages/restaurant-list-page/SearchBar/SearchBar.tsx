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

  // 입력값 변경 시 바로 필터링
  const handleChange = (val: string) => {
    setInput(val);

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(val.toLowerCase())
    );

    onSearch?.(filtered);
  };

  // 돋보기 클릭 시 검색 실행
  const handleSearchClick = () => {
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
    onSearch?.(filtered);
  };

  return (
    <div className={styles.SearchBar}>
      <FaSearch className={styles.Icon} onClick={handleSearchClick} />
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
