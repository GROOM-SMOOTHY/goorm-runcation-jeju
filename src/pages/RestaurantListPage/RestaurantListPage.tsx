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

const REGIONS = [
  "제주시",
  "서귀포시",
  "애월",
  "한림",
  "대정",
  "안덕",
  "중문",
  "남원",
  "표선",
  "성산",
  "구좌",
  "조천",
];
const STORAGE_KEY = "favorite_restaurants_ids";

export default function RestaurantListPage() {
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);

  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // "좋아요만 보기" 상태 추가 (LocalFilter와 연결됨)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 로직 분리 : 커스텀 훅 호출
  const {
    stores,
    setStores,
    isLoading,
    isFetchingMore,
    fetchPlacesData,
    hasMore,
  } = useRestaurants(selectedRegion, searchKeyword);

  // 페이지 로드 시 localStorage에서 좋아요 ID 목록 가져오기
  useEffect(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);
    if (savedFavorites && stores.length > 0) {
      const favoriteIds = JSON.parse(savedFavorites) as string[];
      setStores((prev) =>
        prev.map((s) => ({
          ...s,
          isFavorite: favoriteIds.includes(s.id),
        })),
      );
    }
  }, [stores.length, showFavoritesOnly]);

  // 즐겨찾기 토글 및 localStorage 동기화
  const handleToggleFavorite = (id: string) => {
    setStores((prev) => {
      const newStores = prev.map((s) =>
        s.id === id ? { ...s, isFavorite: !s.isFavorite } : s,
      );

      // 즐겨찾기 된 ID들만 추출해서 저장
      const favoriteIds = newStores
        .filter((s) => s.isFavorite)
        .map((s) => s.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));

      return newStores;
    });
  };

  // 무한 스크롤 관찰자
  const loaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchPlacesData(false);
          }
        },
        { threshold: 0.8 },
      );
      observer.observe(node);
      return () => observer.disconnect();
    },
    [fetchPlacesData, hasMore],
  );

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (mainRef.current) setShowScrollToTop(mainRef.current.scrollTop > 300);
  };

  // 화면에 실제로 렌더링할 식당 리스트 결정
  const displayedStores = useMemo(() => {
    if (!showFavoritesOnly) return stores;
    // 좋아요 필터가 켜져 있으면 isFavorite이 true인 것만 필터링
    return stores.filter((store) => store.isFavorite);
  }, [stores, showFavoritesOnly]);

  const storeNames = useMemo(() => stores.map((s) => s.name), [stores]);

  return (
    <div className={styles.page}>
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
          {isLoading ? (
            <div className={styles.loadingWrapper}>데이터를 불러오는 중...</div>
          ) : (
            <>
              {displayedStores.map((store) => (
                <StoreCard
                  key={store.id}
                  {...store}
                  onToggleFavorite={() => handleToggleFavorite(store.id)}
                  onClick={() =>
                    navigate(`/restaurants/${store.id}`, {
                      state: { storeData: store },
                    })
                  }
                />
              ))}
              {/* 데이터가 없을 때 표시할 안내 문구 */}
              {displayedStores.length === 0 && (
                <div className={styles.emptyState}>
                  {showFavoritesOnly
                    ? "아직 찜한 맛집이 없습니다. 하트를 눌러보세요!"
                    : "검색 결과가 없습니다."}
                </div>
              )}
              {/* 무한 스크롤 트리거  (좋아요 필터 중일 때는 숨기는 것이 일반적임 )*/}
              {hasMore && (
                <div ref={loaderRef} className={styles.loaderArea}>
                  {isFetchingMore && (
                    <span>추가 맛집 정보를 가져오는 중...</span>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <button
        className={`${styles.scrollToTopButton} ${!showScrollToTop ? styles.hidden : ""}`}
        onClick={() =>
          mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
