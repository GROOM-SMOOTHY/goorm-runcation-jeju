import React, { useState } from "react";

//   버튼 변수 타입
type ButtonVariant = "filled" | "fullcolor" | "text";
type ButtonSize = "small" | "medium" | "large";

//   버튼 타입
interface MainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

//   버튼 크기
const sizeStyle = {
  small: { padding: "6px 14px", fontSize: "0.9rem" },
  medium: { padding: "10px 20px", fontSize: "1rem" },
  large: { padding: "14px 33px", fontSize: "1.2rem" },
};

const MainButton: React.FC<MainButtonProps> = ({
  children,
  variant = "filled",
  size = "medium",
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...rest
}) => {
  const [isHover, setIsHover] = useState(false);

  const baseStyle: React.CSSProperties = {
    borderRadius: 8,
    border: "none",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.6 : 1,
    transition: "background 0.2s, color 0.2s, border 0.2s",
    ...(sizeStyle[size]),
  };

  // 버튼 색상 + hover 색상
  const variantStyle = {
    filled: {
      background: isHover ? "#fff" : "#FFB50A",
      color: isHover ? "#FFB50A" : "#fff",
      border: "3px solid #FFB50A",
      borderRadius: "50px",

    },
    fullcolor: {
      background: isHover ? "#FFE18E" : "#FFB50A",
      color: "#fff",
      borderRadius: "50px",
    },
    text: {
      background: "none",
      color: isHover ? "#E89F00" : "#FFB50A",
      borderRadius: "50px",
    },
  };

  return (
    <button
      style={{ ...baseStyle, ...variantStyle[variant], ...style }}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default MainButton;
