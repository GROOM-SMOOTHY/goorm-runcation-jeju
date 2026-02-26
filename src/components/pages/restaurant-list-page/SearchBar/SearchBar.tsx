import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/SearchBar/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  placeholder?: string;
  data?: string[];
  onSearch?: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "제주 맛집을 검색해보세요",
  data = [],
  onSearch,
}) => {
  const [input, setInput] = React.useState("");

  // 디바운스 적용
  const debouncedInput = useDebounce(input, 300);

  // 필터링 로직 제거하고, 디바운스된 '문자열' 자체를 부모에게 전달
  React.useEffect(() => {
    if (onSearch) {
      onSearch(debouncedInput);
    }
  }, [debouncedInput, onSearch]);

  // 돋보기 클릭 시에도 입력된 '문자열' 자체를 부모에게 전달
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(input);
    }
  };

  // 사용성을 위해 엔터키(Enter)를 눌렀을 때도 검색되도록 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(input);
    }
  };

  return (
    <div className={styles.SearchBar}>
      <button
        type="button"
        className={styles.IconButton}
        onClick={handleSearchClick}
        aria-label="검색"
      >
        <FaSearch className={styles.Icon} />
      </button>
      <input
        type="text"
        className={styles.Input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;