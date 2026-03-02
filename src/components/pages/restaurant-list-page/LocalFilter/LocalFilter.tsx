import * as React from "react";
import { useHorizontalScrollDrag } from "@/hooks/useHorizontalScrollDrag";
import styles from "./LocalFilter.module.css";

interface LocalFilterProps {
  regions: string[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: (active: boolean) => void;
}

const LocalFilter: React.FC<LocalFilterProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  showFavoritesOnly,
  onToggleFavorites,
}) => {
  const allRegions = ["전체", ...regions];
  const { containerProps, didDragRef } = useHorizontalScrollDrag();

  return (
    <div className={styles.FilterContainer} {...containerProps}>
      {/* 좋아요 버튼 (맨 앞에 배치) */}
      <button
        type="button"
        className={`${styles.FilterButton} ${styles.FavoriteButton} ${showFavoritesOnly ? styles.FavoriteActive : ""}`}
        onClick={() => {
          if (didDragRef.current) return;
          onToggleFavorites(!showFavoritesOnly);
          if (!showFavoritesOnly) onSelectRegion(""); // 좋아요 클릭 시 지역 선택 해제
        }}
      >
        좋아요
      </button>

      {/* 지역 버튼들 */}
      {allRegions.map((region, idx) => {
        // 좋아요 필터가 켜져있으면 지역 버튼은 모두 비활성 상태로 보이게 처리
        const isActive =
          !showFavoritesOnly &&
          (region === "전체"
            ? selectedRegion === ""
            : selectedRegion === region);

        return (
          <button
            type="button"
            key={idx}
            className={`${styles.FilterButton} ${region === "전체" ? styles.AllButton : ""} ${isActive ? styles.Active : ""}`}
            onClick={() => {
              if (didDragRef.current) return;
              onToggleFavorites(false); // 지역 선택 시 좋아요 필터 해제
              onSelectRegion(region === "전체" ? "" : region);
            }}
          >
            {region}
          </button>
        );
      })}
    </div>
  );
};

export default LocalFilter;
