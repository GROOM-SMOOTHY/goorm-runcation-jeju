import { useState, useRef, useCallback, useMemo, useEffect } from "react";import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";
import LocalFilter from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter";
import StoreCard from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import { useRestaurants } from "@/hooks/useRestaurants";
import styles from "./RestaurantListPage.module.css";
import LoadingPage from "@/pages/LoadingPage/LoadingPage";
import Empty from "@/components/common/Empty/Empty";

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

  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // isFetchingMore / hasMore 제거됨 - 30일 캐시 전략으로 페이지네이션 불필요
  // 검색은 클라이언트 필터로 처리 (즉시 반응, 안정적)
  const { stores, setStores, isLoading } = useRestaurants(selectedRegion);

  // 로딩이 끝나도 최소 2.5초는 Loading 화면 표시
  const MIN_LOADING_MS = 550;
  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      const timer = setTimeout(() => setShowLoading(false), MIN_LOADING_MS);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // 즐겨찾기 상태 복원: stores가 처음 로드된 직후 1회만 실행
  useEffect(() => {
    if (stores.length === 0) return;
    const savedFavorites = localStorage.getItem(STORAGE_KEY);
    if (!savedFavorites) return;
    const favoriteIds = JSON.parse(savedFavorites) as string[];
    setStores((prev) =>
      prev.map((s) => ({ ...s, isFavorite: favoriteIds.includes(s.id) })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stores.length]);

  const handleToggleFavorite = useCallback(
    (id: string) => {
      setStores((prev) => {
        const next = prev.map((s) =>
          s.id === id ? { ...s, isFavorite: !s.isFavorite } : s,
        );
        const favoriteIds = next.filter((s) => s.isFavorite).map((s) => s.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
        return next;
      });
    },
    [setStores],
  );

  const handleScroll = useCallback(() => {
    if (mainRef.current) setShowScrollToTop(mainRef.current.scrollTop > 300);
  }, []);

  const displayedStores = useMemo(() => {
    let result = stores;
    if (showFavoritesOnly) {
      result = result.filter((s) => s.isFavorite);
    }
    if (searchKeyword.trim()) {
      const kw = searchKeyword.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(kw) ||
          (s.description?.toLowerCase().includes(kw) ?? false) ||
          (s.location?.toLowerCase().includes(kw) ?? false),
      );
    }
    return result;
  }, [stores, showFavoritesOnly, searchKeyword]);

  const storeNames = useMemo(() => stores.map((s) => s.name), [stores]);

  return (
    <div className={styles.page}>
      <Header title="맛집" onBack={() => navigate(-1)} />
      {showLoading ? (
        <div className={styles.fullOverlay}>
          <LoadingPage />
        </div>
      ) : (
        <>
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
                  onClick={() =>
                    navigate(`/restaurants/${store.id}`, {
                      state: { storeData: store },
                    })
                  }
                />
              ))}
              {displayedStores.length === 0 && (
                <div className={styles.emptyState}>
                  {showFavoritesOnly ? (
                    <Empty
                      title="아직 찜한 맛집이 없습니다."
                      description="하트를 눌러 맛집을 저장해보세요!"
                    />
                  ) : (
                    <Empty
                      title="검색 결과가 없습니다."
                      description="다른 검색어를 입력하거나 필터를 조정해보세요."
                    />
                  )}
                </div>
              )}
            </section>
          </main>
          <BottomNavigation />
          <button
            className={`${styles.scrollToTopButton} ${!showScrollToTop ? styles.hidden : ""}`}
            onClick={() =>
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <FaArrowUp />
          </button>
        </>
      )}
    </div>
  );
}
