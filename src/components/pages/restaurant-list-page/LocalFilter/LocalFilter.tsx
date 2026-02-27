import * as React from "react";
import { useRef, useState, type MouseEvent } from "react";
import { FaHeart } from "react-icons/fa"; // 하트 아이콘 추가
import styles from "./LocalFilter.module.css";

interface LocalFilterProps {
  regions: string[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  // 좋아요 필터 관련 props 추가
  showFavoritesOnly: boolean;
  onToggleFavorites: (active: boolean) => void;
}

const LocalFilter: React.FC<LocalFilterProps> = ({ 
  regions, 
  selectedRegion, 
  onSelectRegion,
  showFavoritesOnly,
  onToggleFavorites
}) => {
  const allRegions = ["전체", ...regions];
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const didDragRef = useRef(false);

  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    didDragRef.current = false;
    
    if (scrollRef.current) {
      setStartX(e.pageX);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;

    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    
    if (Math.abs(walk) > 5) {
      didDragRef.current = true;
    }
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      className={styles.FilterContainer}
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
    >
      {/* 1. 좋아요 버튼 (맨 앞에 배치) */}
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

      {/* 2. 지역 버튼들 */}
      {allRegions.map((region, idx) => {
        // 좋아요 필터가 켜져있으면 지역 버튼은 모두 비활성 상태로 보이게 처리
        const isActive = !showFavoritesOnly && (region === "전체" ? selectedRegion === "" : selectedRegion === region);
        
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