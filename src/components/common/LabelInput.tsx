import React, { forwardRef, CSSProperties } from "react";
import MainInput from "./MainInput";

interface LabeledInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  style?: CSSProperties; // 추가 스타일 가능
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, value, placeholder, onChange, onClear, style }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
        {/* ===============================
            라벨
            - 이미지 기준 색상과 폰트 적용
        =============================== */}
        <label style={{ fontWeight: 700, color: "#FF9F1C", fontSize: 14 }}>
          {label}
        </label>

        {/* ===============================
            입력창
            - MainInput 기반
            - 둥근 테두리 + focus 시 색상 변경
            - placeholder 자동 생성
        =============================== */}
        <MainInput
          ref={ref}
          value={value}
          placeholder={placeholder || `${label}을(를) 적어주세요`}
          onChange={(e) => onChange(e.target.value)}
          onClear={onClear}
          clearRight={12} // Clear 버튼 위치 조정
          rightPadding={12} // 여백 확보
          style={{
            borderRadius: 12,
            border: "1px solid #ccc",
            padding: "10px 12px",
            fontSize: 14,
            height: 40,
            lineHeight: "20px",
            transition: "border 0.2s",
            width: "100%",
            ...style,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF9F1C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
        />
      </div>
    );
  }
);

export default LabeledInput;
