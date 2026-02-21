import { useMemo, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";
import LocalFilter from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter";
import StoreCard from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import type { StoreCardProps } from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import styles from "@/pages/RestaurantListPage/RestaurantListPage.module.css";

const REGIONS = ["제주시", "서귀포시", "한림", "애월"];

const MOCK_STORES: (StoreCardProps & { id: string })[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    location: "제주시",
    category: "카페",
    name: "달콤한 하루",
    description: "아늑한 분위기와 맛있는 디저트를 즐길 수 있는 카페입니다.",
    isFavorite: false,
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    location: "서귀포시",
    category: "레스토랑",
    name: "바다의 맛집",
    description: "신선한 해산물을 맛볼 수 있는 대표 레스토랑",
    isFavorite: true,
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    location: "한림",
    category: "술집",
    name: "한잔의 행복",
    description: "친구들과 함께 즐길 수 있는 편안한 술집입니다.",
    isFavorite: false,
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    location: "애월",
    category: "카페",
    name: "애월 바다뷰 카페",
    description: "바다 전망이 아름다운 카페",
    isFavorite: false,
  },
];

export default function RestaurantListPage() {
  const navigate = useNavigate();
  const [searchResultNames, setSearchResultNames] = useState<string[]>(
    MOCK_STORES.map((s) => s.name)
  );
  const [selectedRegion, setSelectedRegion] = useState("");
  const [stores, setStores] = useState(MOCK_STORES);

  const filteredStores = useMemo(() => {
    return stores.filter(
      (s) =>
        searchResultNames.includes(s.name) &&
        (selectedRegion ? s.location === selectedRegion : true)
    );
  }, [searchResultNames, selectedRegion, stores]);

  const handleToggleFavorite = (storeId: string) => {
    setStores((prev) =>
      prev.map((s) =>
        s.id === storeId ? { ...s, isFavorite: !s.isFavorite } : s
      )
    );
  };

  const handleStoreClick = (id: string, name: string) => {
    const slug = encodeURIComponent(name.replace(/\s+/g, "-"));
    navigate(`/restaurants/${id}-${slug}`);
  };

  const mainRef = useRef<HTMLElement>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    setShowScrollToTop(el.scrollTop > 200);
  }, []);

  const handleScrollToTop = useCallback(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={styles.page}>
      <Header title="맛집" onBack={() => navigate(-1)} />
      <main
        ref={mainRef}
        className={styles.main}
        onScroll={handleScroll}
      >
        <SearchBar
          placeholder="제주 맛집을 검색해보세요"
          data={stores.map((s) => s.name)}
          onSearch={(results) => setSearchResultNames(results)}
        />
        <LocalFilter
          regions={REGIONS}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />
        <section className={styles.storeList}>
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                imageUrl={store.imageUrl}
                location={store.location}
                category={store.category}
                name={store.name}
                description={store.description}
                isFavorite={store.isFavorite}
                onToggleFavorite={() => handleToggleFavorite(store.id)}
                onClick={() => handleStoreClick(store.id, store.name)}
              />
            ))
          ) : (
            <p className={styles.emptyMessage}>검색 결과가 없습니다.</p>
          )}
        </section>
      </main>
      <div className={styles.bottomNavWrap}>
        <BottomNavigation />
      </div>
      <button
        type="button"
        className={`${styles.scrollToTopButton} ${!showScrollToTop ? styles.hidden : ""}`}
        onClick={handleScrollToTop}
        aria-label="맨 위로"
      >
        <FaArrowUp size={18} />
      </button>
    </div>
  );
}
