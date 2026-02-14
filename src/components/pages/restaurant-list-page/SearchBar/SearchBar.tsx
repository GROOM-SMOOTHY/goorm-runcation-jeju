import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/SearchBar/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  data?: string[];
  onSearch?: (results: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  onChange,
  placeholder = "제주 맛집을 검색해보아요",
  data = [],
  onSearch,
}) => {
  const [input, setInput] = React.useState(value);

  const handleSearch = (keyword: string) => {
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(keyword.toLowerCase())
    );

    onSearch?.(filtered);
  };

  const handleChange = (val: string) => {
    setInput(val);
    onChange?.(val);
    handleSearch(val);
  };

  return (
    <div className={styles.SearchBar}>
      {/* 아이콘 클릭 시에도 검색가능 */}
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
