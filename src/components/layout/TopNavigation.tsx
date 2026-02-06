import React, { useState } from "react";
import styles from "@/components/layout/TopNavigation.module.css";

interface TopNavigationProps {
  title?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  style?: React.CSSProperties;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  title = "",
  onBack,
  rightElement,
  style,
}) => {
  const [navVisible, setNavVisible] = useState(false); // 네비게이션 표시 상태

  const toggleNav = () => setNavVisible(!navVisible); // 토글 함수

  return (
    <div className={styles.topNavigation} style={style}>
      {/* 뒤로가기 */}
      <div
        onClick={onBack ? onBack : () => window.history.back()}
        className={styles.back}
      >
        {"<"}
      </div>

      {/* 제목 */}
      <div className={styles.title}>{title}</div>

      {/* 오른쪽 아이콘 */}
      <div className={styles.right} onClick={toggleNav}>
        {rightElement}
      </div>

      {/* 네비게이션 메뉴 */}
      {navVisible && (
        <div className={styles.navMenu}>
          <ul>
            <li>공지사항</li>
            <li>마이페이지</li>
            <li>개인정보 수정</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopNavigation;
