import * as React from "react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import styles from "@/components/layout/Header/Header.module.css";

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  backTextColor?: string;
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({
  title = "",
  onBack,
  backTextColor = "var(--bg-black)",
  style,
}) => {

  return (
    <header className={styles.topNavigation} style={style}>
      { onBack && (
        <button
          type="button"
          onClick={onBack ?? (() => window.history.back())}
          className={styles.back}
          aria-label="뒤로가기"
          style={{ color: backTextColor }}
        >
          <ChevronLeftIcon width={28} height={28} />
        </button>
      )}
      
      <div className={styles.title}>{title}</div>
    </header>
  );
};

export default Header;
