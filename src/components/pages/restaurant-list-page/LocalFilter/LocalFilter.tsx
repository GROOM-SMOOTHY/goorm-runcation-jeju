import * as React from "react";
import styles from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter.module.css";

interface LocalFilterProps {
  regions: string[];
  selectedRegion: string; // 현재 선택된 지역
  onSelectRegion: (region: string) => void;
}

const LocalFilter: React.FC<LocalFilterProps> = ({ regions, selectedRegion, onSelectRegion }) => {
  const allRegions = ["전체", ...regions];

  return (
    <div className={styles.FilterContainer}>
      {allRegions.map((region, idx) => {
        const isActive = region === "전체" ? selectedRegion === "" : selectedRegion === region;
        return (
          <button
            key={idx}
            className={`${styles.FilterButton} ${region === "전체" ? styles.AllButton : ""} ${isActive ? styles.Active : ""}`}
            onClick={() => onSelectRegion(region === "전체" ? "" : region)}
          >
            {region}
          </button>
        );
      })}
    </div>
  );
};

export default LocalFilter;
