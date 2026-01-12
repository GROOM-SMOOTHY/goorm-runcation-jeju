import React, { useRef } from "react";
import MainInput from "./MainInput";
import searchinput from "../../assets/searchinput.png";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /* ===============================
   * 검색 실행
   * =============================== */
  const handleSearch = () => {
    if (!value.trim()) return;
    onSearch(value.trim());
    inputRef.current?.focus();
  };

  return (
    <div style={{ position: "relative" }}>
      {/* ===============================
       * 입력창
       * - clear 버튼은 검색 아이콘 왼쪽
       * =============================== */}
      <MainInput
        ref={inputRef}
        value={value}
        placeholder="검색어를 입력하세요"
        onChange={(e) => onChange(e.target.value)}
        onClear={() => onChange("")}
        clearRight={52} // 🔥 검색 버튼 공간 확보
        rightPadding={89}
      />

      {/* ===============================
       * 검색 버튼
       * =============================== */}
      <button
        type="button"
        onClick={handleSearch}
        aria-label="검색"
        style={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <img
          src={searchinput}
          alt=""
          aria-hidden="true"
          width={20}
        />
      </button>
    </div>
  );
};

export default SearchInput;
