import React from "react";
import styles from "@/components/layout/TopNavigation.module.css";
import { useNavigate } from "react-router-dom";

interface TopNavigationProps {
  // 타입정의
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
  const navigate = useNavigate();

  return (
    <div className={styles.topNavigation} style={style}>
      {/* 뒤로가기 */}
      <div onClick={onBack? onBack : () => navigate(-1)} className={styles.back}>
        {onBack ? "<" : ""}
      </div>

      {/* 제목 */}
      <div className={styles.title}>{title}</div>

      {/* 오렌지 아이콘 */}
      <div className={styles.right}>{rightElement}</div>
    </div>
  );
};

export default TopNavigation;
