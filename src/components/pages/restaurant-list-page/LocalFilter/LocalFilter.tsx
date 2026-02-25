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
  
  // 스크롤 및 드래그 감지를 위한 상태와 Ref 추가
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  // 마우스 버튼을 눌렀을 때
  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX + scrollRef.current.scrollLeft);
    }
  };

  // 마우스 버튼을 뗐거나 마우스가 영역 밖으로 나갔을 때 
  const onDragEnd = () => {
    setIsDragging(false);
  };

  // 마우스를 누른 상태로 움직일 때
  const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft = startX - e.pageX;
  };

  return (
    <div 
      className={styles.FilterContainer}
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      {allRegions.map((region, idx) => {
        const isActive = region === "전체" ? selectedRegion === "" : selectedRegion === region;
        return (
          <button
            type="button"
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