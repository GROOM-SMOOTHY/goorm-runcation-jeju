import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/SearchBar/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "@/hooks/useDebounce";

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

  // 디바운스 적용
  const debouncedInput = useDebounce(input, 300);

  // 🔥 onSearch는 dependency에서 제거
  React.useEffect(() => {
    if (!onSearch) return;

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(debouncedInput.toLowerCase())
    );

    onSearch(filtered);
  }, [debouncedInput, data]); // ✅ onSearch 제거

  const handleSearchClick = () => {
    if (!onSearch) return;

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );

    onSearch(filtered);
  };

  return (
    <div className={styles.SearchBar}>
      <FaSearch className={styles.Icon} onClick={handleSearchClick} />
      <input
        type="text"
        className={styles.Input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;