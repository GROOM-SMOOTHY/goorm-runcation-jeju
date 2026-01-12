import React, { useState, forwardRef } from "react";

interface MainInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  clearRight?: number; // ❌ 버튼 위치 제어
  rightPadding?:number;
}

const MainInput = forwardRef<HTMLInputElement, MainInputProps>(
  (
    { value, onClear,rightPadding = 50, clearRight = 16, style, ...rest },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
      <div style={{ position: "relative" }}>
        {/* ===============================
         * Input
         * =============================== */}
        <input
          ref={ref}
          value={value}
          {...rest}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          style={{
            width: "100%",
            padding: `0 ${rightPadding}px 2px 8px`,
            fontSize: "1.5rem",
            border: "none",
            outline: "none",
            ...style,
          }}
        />

        {/* ===============================
         * Clear 버튼
         * =============================== */}
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="입력값 지우기"
            style={{
              position: "absolute",
              right: clearRight,
              top: "50%",
              transform: "translateY(-50%)",

              width: "22px",
              height: "22px",
              borderRadius: "999px",
              backgroundColor: "#FFB50A",
              color: "#fff",

              border: "none",
              cursor: "pointer",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "1",
              padding: 0,

              transition: "transform 0.15s ease",
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <span
              style={{
                position: "relative",
                top: "0.5px",             // X자 미세 보정
                display: "block",
              }}
            >
              ×
            </span>
          </button>

        )}

        {/* ===============================
         * Underline
         * =============================== */}
        <div
          style={{
            height: "3px",
            backgroundColor: isFocus ? "#FF9D28" : "#F6C87A",
            borderRadius: "50px",
            transition: "0.2s",
          }}
        />
      </div>
    );
  }
);

export default MainInput;
