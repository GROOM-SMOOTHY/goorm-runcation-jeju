import React, { useState } from "react";

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

const MainInput: React.FC<MainInputProps> = ({
  value,
  onClear,
  style,
  className,
  ...rest
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const baseStyle: React.CSSProperties = {
    fontFamily: "'Jua', sans-serif",
    width: "100%",
    padding: "10px 32px 0px 8px", // 오른쪽 X 버튼 공간 확보
    fontSize: "1.5rem",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#FF9D00", // 텍스트 색
  };

  const underlineStyle: React.CSSProperties = {
    lineHeight: "3px",
    height: "3px",
    backgroundColor: isFocus ? "#FF9D28" : "#F6C87A",
    width: "100%",
    borderRadius:"50px",
    transition: "0.2s",
    marginTop: "3px",
  };

  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  };

  const clearButtonStyle: React.CSSProperties = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "2rem",
    color: "#FF9D28",
    cursor: "pointer",
    opacity: value ? 1 : 0,
    transition: "opacity 0.2s",
  };

  return (
    <div style={wrapperStyle}>
      
      <input
        className={`main-input ${className || ""}`}
        style={{ ...baseStyle, ...style }}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...rest}
      />

      {/* Clear button */}
      <span style={clearButtonStyle} onClick={onClear}>
        x
      </span>

      {/* underline */}
      <div style={underlineStyle} />
    </div>
  );
};

export default MainInput;
