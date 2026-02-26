import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";
import LocalFilter from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter";
import StoreCard from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import { useRestaurants } from "@/hooks/useRestaurants";
import styles from "./RestaurantListPage.module.css";

const REGIONS = ["전체", "제주시", "서귀포시", "애월", "한림", "대정", "안덕", "중문", "남원", "표선", "성산", "구좌", "조천"];

export default function RestaurantListPage() {
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);
  
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // 로직 분리 : 커스텀 훅 호출
  const { stores, setStores, isLoading, isFetchingMore, fetchPlacesData, hasMore } = 
    useRestaurants(selectedRegion, searchKeyword);

  // 무한 스크롤 관찰자
  const loaderRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchPlacesData(false);
      }
    }, { threshold: 0.8 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchPlacesData, hasMore]);

  // 즐겨찾기 토글
  const handleToggleFavorite = (id: string) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s));
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (mainRef.current) setShowScrollToTop(mainRef.current.scrollTop > 300);
  };

  const storeNames = useMemo(() => stores.map(s => s.name), [stores]);

  return (
    <div className={styles.page}>
      <Header title="맛집" onBack={() => navigate(-1)} />

      <main ref={mainRef} className={styles.main} onScroll={handleScroll}>
        <SearchBar data={storeNames} onSearch={setSearchKeyword} />
        <LocalFilter regions={REGIONS} selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />

        <section className={styles.storeList}>
          {isLoading ? (
            <div className={styles.loadingWrapper}>데이터를 불러오는 중...</div>
          ) : (
            <>
              {stores.map((store) => (
                <StoreCard 
                  key={store.id} 
                  {...store} 
                  onToggleFavorite={() => handleToggleFavorite(store.id)}
                  onClick={() => navigate(`/restaurants/${store.id}/${encodeURIComponent(store.name)}`)} 
                />
              ))}
              
              {/* 무한 스크롤 트리거 */}
              {hasMore && (
                <div ref={loaderRef} className={styles.loaderArea}>
                  {isFetchingMore && <span>추가 맛집 정보를 가져오는 중...</span>}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <BottomNavigation />

      <button
        className={`${styles.scrollToTopButton} ${!showScrollToTop ? styles.hidden : ""}`}
        onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaArrowUp />
      </button>
    </div>
  );
}