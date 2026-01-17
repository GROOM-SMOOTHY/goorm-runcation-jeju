import React, { useRef } from "react";
import MainInput from "./MainInput";
import searchinput from "../../assets/searchinput.png";

// 타입 선언 
interface SearchInputProps {
  value: string; 
  onChange: (value: string) => void; // 입력 변경 콜백
  onSearch: (value: string) => void; // 검색 변경 콜백
}

// ===============================
// SearchInput 컴포넌트
// - forwardRef를 이용해 외부에서 input 접근 가능
// - 검색 버튼 클릭 또는 Enter로 검색 실행
// ===============================
const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

/* ===============================
 * 검색 실행 함수
 * - 입력값이 없으면 실행 안 함
 * - 실행 후 포커스 유지
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
        onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        clearRight={52} // 검색 버튼 공간 확보
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
