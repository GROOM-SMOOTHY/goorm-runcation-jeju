import React, { useState, forwardRef } from "react";


// MainInput Prop 정의 
interface MainInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void; // 입력값을 초기화하는 x 버튼 클릭 핸들러
  clearRight?: number;  // X버튼 위치 제어
  rightPadding?:number; // SearchInput과 Input사이즈 길이 제어
  showUnderline?: boolean; // 언더라인 조건부 허용
}


// MainInpurt Component
const MainInput = forwardRef<HTMLInputElement, MainInputProps>(
  (
    { value, onClear, showUnderline = true, rightPadding = 50, clearRight = 16, style, ...rest },
    ref
  ) => {

    // 포커스 상태 관리 = underline 색상 변경용
    const [isFocus, setIsFocus] = useState(false);

    // 부모에서 전달된 onFocus / onBlur 분리 = 내부 핸들러와 합성하여 덮어쓰기 방지
    const {
      onFocus: parentOnFocus,
      onBlur: parentOnBlur,
      ...other
    } = rest;
    
    return (
      <div style={{ position: "relative" }}>
        {/* ===============================
         * Input
         * =============================== */}
        <input
          className="main-input"
          ref={ref}
          value={value}
          {...other}
          /* 포커스 시 underline 활성화 + 부모 핸들러 호출 */
          onFocus={(e) => {
            setIsFocus(true);
            parentOnFocus?.(e);
          }}
          /* 포커스 해제 시 underline 비활성화 + 부모 핸들러 호출 */
          onBlur={(e) => {
            setIsFocus(false);
            parentOnBlur?.(e);
          }}
          
          style={{
            width: "100%",
            height:"30px",
            padding: `0 ${rightPadding}px 0 8px`,
            fontSize: "1.2rem",
            border: "none",
            outline: "none",
            ...style,
          }}
        />

        {/* ===============================
         * Clear 버튼 - value가 있을 때만 표시
         * =============================== */}
        {value && onClear && (
          <button
            type="button"

            onClick={onClear}
            aria-label="입력값 지우기"

            onMouseDown={(e) => e.preventDefault()} // 클릭 시 input blur 방지

            style={{
              position: "absolute",
              right: clearRight,
              top: "45%",
              transform: "translateY(-50%)",

              width: "15px",
              height: "15px",
              borderRadius: "99px",
              backgroundColor: "#FFB50A",
              color: "#fff",

              border: "none",
              cursor: "pointer",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "12px",
              fontWeight: 700,
              lineHeight: "1",
              padding: 0,

              transition: "transform 0.15s ease",
            }}
          >
            {/* X자 미세 보정 */}
            <span
              style={{
                position: "relative",
                top: "0.5px",    
                display: "block",
              }}
            >
              ×
            </span>
          </button>

        )}

        {/* ===============================
         * Underline = 포커스에 따라 생상 변경
         * =============================== */}
        {showUnderline && (
          <div
            style={{
              height: "2px",
              backgroundColor: isFocus ? "#FF9D28" : "#F6C87A",
              borderRadius: "50px",
              transition: "0.2s",
            }}
          />
        )}
      </div>
    );
  }
);

export default MainInput;
