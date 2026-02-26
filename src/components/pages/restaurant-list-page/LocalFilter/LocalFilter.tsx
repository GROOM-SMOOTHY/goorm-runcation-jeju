import * as React from "react";
import { useRef, useState, type MouseEvent } from "react";
import styles from "./LocalFilter.module.css";

interface LocalFilterProps {
  regions: string[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

const LocalFilter: React.FC<LocalFilterProps> = ({ regions, selectedRegion, onSelectRegion }) => {
  const allRegions = ["전체", ...regions];
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const didDragRef = useRef(false);

  // 마우스 버튼을 눌렀을 때
  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
   if (e.button !== 0) return; // 좌클릭만 드래그 시작
   e.preventDefault();
    setIsDragging(true);
    didDragRef.current = false;
    
    if (scrollRef.current) {
      setStartX(e.pageX); // 현재 마우스 위치
      setScrollLeft(scrollRef.current.scrollLeft); // 현재 스크롤 위치 저장
    }
  };

  // 마우스 버튼을 뗐거나 영역 밖으로 나갔을 때
  const onDragEnd = () => {
    setIsDragging(false);
  };

  // 마우스를 누른 상태로 움직일 때
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
      style={{ cursor: isDragging ? 'grabbing' : 'pointer', overflowX: 'auto', display: 'flex' }}
    >
      {allRegions.map((region, idx) => {
        const isActive = region === "전체" ? selectedRegion === "" : selectedRegion === region;
        return (
          <button
            type="button"
            key={idx}
            className={`${styles.FilterButton} ${region === "전체" ? styles.AllButton : ""} ${isActive ? styles.Active : ""}`}
            onClick={() => {
              // 드래그 중이었다면 클릭 이벤트 무시
              if (didDragRef.current) return;
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