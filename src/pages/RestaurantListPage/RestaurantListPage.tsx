import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";
import LocalFilter from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter";
import StoreCard from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import { useRestaurants } from "@/hooks/useRestaurants";
import styles from "./RestaurantListPage.module.css";
import LoadingPage from "@/pages/LoadingPage/LoadingPage";

const REGIONS = ["제주시", "서귀포시", "애월", "한림", "대정", "안덕", "중문", "남원", "표선", "성산", "구좌", "조천"];
const STORAGE_KEY = "favorite_restaurants_ids";

export default function RestaurantListPage() {
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);
  
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { stores, setStores, isLoading, isFetchingMore, fetchPlacesData, hasMore } = 
    useRestaurants(selectedRegion, searchKeyword);

  useEffect(() => {   
    const savedFavorites = localStorage.getItem(STORAGE_KEY);
    if (savedFavorites && stores.length > 0) {
      const favoriteIds = JSON.parse(savedFavorites) as string[];
      setStores(prev => 
        prev.map(s => ({
          ...s,
          isFavorite: favoriteIds.includes(s.id)
        }))
      );
    }
  }, [stores.length, showFavoritesOnly]);

  const handleToggleFavorite = (id: string) => {
    setStores(prev => {
      const newStores = prev.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s);
      const favoriteIds = newStores.filter(s => s.isFavorite).map(s => s.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
      return newStores;
    });
  };

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

  const handleScroll = () => {
    if (mainRef.current) setShowScrollToTop(mainRef.current.scrollTop > 300);
  };

  const displayedStores = useMemo(() => {
    if (!showFavoritesOnly) return stores;
    return stores.filter(store => store.isFavorite);
  }, [stores, showFavoritesOnly]);

  const storeNames = useMemo(() => stores.map(s => s.name), [stores]);

  return (
    <div className={styles.page}>
      {isLoading ? (
        <div className={styles.fullOverlay}>
          <LoadingPage />
        </div>
      ) : (
        <>
          <Header title="맛집" onBack={() => navigate(-1)} />

          <main ref={mainRef} className={styles.main} onScroll={handleScroll}>
            <SearchBar data={storeNames} onSearch={setSearchKeyword} />
            <LocalFilter 
              regions={REGIONS} 
              selectedRegion={selectedRegion} 
              onSelectRegion={setSelectedRegion} 
              showFavoritesOnly={showFavoritesOnly}
              onToggleFavorites={setShowFavoritesOnly}
            />

            <section className={styles.storeList}>
              {displayedStores.map((store) => (
                <StoreCard 
                  key={store.id} 
                  {...store} 
                  onToggleFavorite={() => handleToggleFavorite(store.id)}
                  onClick={() => navigate(`/restaurants/${store.id}`, { state: { storeData: store } })} 
                />
              ))}
              
              {displayedStores.length === 0 && (
                <div className={styles.emptyState}>
                  {showFavoritesOnly 
                    ? "아직 찜한 맛집이 없습니다. 하트를 눌러보세요!" 
                    : "검색 결과가 없습니다."}
                </div>
              )}
              
              {hasMore && (
                <div ref={loaderRef} className={styles.loaderArea}>
                  {isFetchingMore && <span>추가 정보를 가져오는 중...</span>}
                </div>
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
        </>
      )}
    </div>
  );
}