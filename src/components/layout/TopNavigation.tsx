import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  const navRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => setNavVisible((prev) => !prev);

  // ✅ 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavVisible(false);
      }
    };

    if (navVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navVisible]);

  return (
    <div className={styles.topNavigation} style={style} ref={navRef}>
      {/* 뒤로가기 */}
      <button
        type="button"
        onClick={onBack ?? (() => window.history.back())}
        className={styles.back}
        aria-label="뒤로가기"
      >
        &#8249;
      </button>

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
            <li>
              <Link to="/notice" onClick={() => setNavVisible(false)}>
                공지사항
              </Link>
            </li>
            <li>
              <Link to="/mypage" onClick={() => setNavVisible(false)}>
                마이페이지
              </Link>
            </li>
            <li>
              <Link to="/profile/edit" onClick={() => setNavVisible(false)}>
                개인정보 수정
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopNavigation;
