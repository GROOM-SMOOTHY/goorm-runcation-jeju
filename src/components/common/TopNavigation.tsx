import React from "react";

interface TopNavigationProps {
  title?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode; // 오른쪽 아이콘/버튼
  style?: React.CSSProperties;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  title = "",
  onBack,
  rightElement,
  style,
}) => {
  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "transparent", // 투명 배경
    padding: "0 12px",
  };

  const backButtonStyle: React.CSSProperties = {
    fontSize: "25px",
    color: "#656565",
    cursor: "pointer",
    userSelect: "none",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "22px",
    color: "#656565",
    fontWeight: 400,
  };

  return (
    <div style={{ ...containerStyle, ...style }}>
      {/* Left Back Button */}
      <div onClick={onBack} style={backButtonStyle}>
        {onBack ? "<" : ""}
      </div>

      {/* Title */}
      <div style={titleStyle}>{title}</div>

      {/* Right Icon */}
      <div>{rightElement}</div>
    </div>
  );
};

export default TopNavigation;
