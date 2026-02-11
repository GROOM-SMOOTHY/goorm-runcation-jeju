import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "@/components/layout/TopNavigation.module.css";

// TopNavigation 컴포넌트에서 사용할 props 타입 정의
interface TopNavigationProps {
  title?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  style?: React.CSSProperties;
  backTextColor?: string;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  title = "", 
  onBack, // 전달되지 않으면 history.back() 사용
  rightElement,
  backTextColor = "#000",
  style,
}) => {
  // 네비게이션 메뉴(드롭다운) 표시 여부 상태
  const [navVisible, setNavVisible] = useState<boolean>(false);

  // 네비게이션 영역 참조 (외부 클릭 감지를 위해 사용)
  const navRef = useRef<HTMLDivElement>(null);

  // 오른쪽 아이콘 클릭 시 네비게이션 메뉴 토글
  const toggleNav = () => setNavVisible((prev) => !prev);

  // 네비게이션 메뉴가 열려 있을 때,
  // 바깥 영역 클릭 시 메뉴를 닫는 이벤트 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavVisible(false);
      }
    };

    if (navVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 컴포넌트 언마운트 또는 navVisible 변경 시 이벤트 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navVisible]);

  return (
    <div className={styles.topNavigation} style={style} ref={navRef}>
      {/* 뒤로가기 버튼 */}
      <button
        type="button"
        onClick={onBack ?? (() => window.history.back())} // onBack이 없으면 브라우저 뒤로가기
        className={styles.back}
        aria-label="뒤로가기"
        style={{ color: backTextColor }} // 페이지별로 전달된 색상 적용
      >
        &#8249;
      </button>

      {/* 중앙 제목 영역 */}
      <div className={styles.title}>{title}</div>

      {/* 오른쪽 아이콘 영역 (클릭 시 메뉴 열기/닫기) */}
      {rightElement && (
        <div
          className={styles.right}
          onClick={toggleNav}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleNav();
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={navVisible}
          aria-label={navVisible ? "메뉴 닫기" : "메뉴 열기"}
        >
          {rightElement}
        </div>
      )}
      
      {/* 드롭다운 네비게이션 메뉴 */}
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
