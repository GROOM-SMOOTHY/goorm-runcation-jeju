import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/SearchBar/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  data?: string[]; // 검색할 데이터
  onSearch?: (results: string[]) => void; // 검색 결과 반환
}

const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  onChange,
  placeholder = "제주 맛집을 검색해보아요",
  data = [],
  onSearch,
}) => {
  const [input, setInput] = React.useState(value);
  const [results, setResults] = React.useState<string[]>([]);
  const [showResults, setShowResults] = React.useState(false);

  // 입력값 변경 시 상태 업데이트 & 필터링
  const handleChange = (val: string) => {
    setInput(val);
    onChange?.(val);

    const filtered = data
      .filter((item) => item.toLowerCase().includes(val.toLowerCase()))
      .slice(0, 4); // 최대 4개만 표시
    setResults(filtered);
    setShowResults(true);
    onSearch?.(filtered);
  };

  // 돋보기 클릭 시 검색 실행
  const handleSearchClick = () => {
    const filtered = data
      .filter((item) => item.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 4);
    setResults(filtered);
    setShowResults(true);
    onSearch?.(filtered);
  };

  // 검색 결과 클릭 시 input에 입력
  const handleSelectResult = (val: string) => {
    setInput(val);
    onChange?.(val);
    setShowResults(false);
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
        onFocus={() => input && setShowResults(true)}
      />

      {showResults && results.length > 0 && (
        <ul className={styles.Results}>
          {results.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelectResult(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
