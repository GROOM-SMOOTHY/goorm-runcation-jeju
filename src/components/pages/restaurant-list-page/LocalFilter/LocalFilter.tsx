import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter.module.css";

interface LocalFilterProps {
  regions: string[]; // DB에서 받아올 지역 리스트
  onSelectRegion: (region: string) => void; // 선택 시 SearchBar에 전달
}

const LocalFilter: React.FC<LocalFilterProps> = ({ regions, onSelectRegion }) => {
  // "전체"를 먼저 추가
  const allRegions = ["전체", ...regions];

  return (
    <div className={styles.FilterContainer}>
      {allRegions.map((region, idx) => (
        <button
          key={idx}
          className={`${styles.FilterButton} ${region === "전체" ? styles.AllButton : ""}`}
          onClick={() => onSelectRegion(region === "전체" ? "" : region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default LocalFilter;
