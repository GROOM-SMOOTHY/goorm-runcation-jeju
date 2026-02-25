import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { useJsApiLoader } from "@react-google-maps/api";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import SearchBar from "@/components/pages/restaurant-list-page/SearchBar/SearchBar";
import LocalFilter from "@/components/pages/restaurant-list-page/LocalFilter/LocalFilter";
import StoreCard from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import type { StoreCardProps } from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import styles from "@/pages/RestaurantListPage/RestaurantListPage.module.css";

const REGIONS = ["제주시", "서귀포시", "애월", "한림", "대정", "안덕", "중문", "남원", "표선", "성산", "구좌", "조천"];

const libraries: ("places")[] = ["places"];

export default function RestaurantListPage() {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, 
    libraries: libraries,
  });

  const [stores, setStores] = useState<(StoreCardProps & { id: string })[]>([]);
  const [searchResultNames, setSearchResultNames] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [displayCount, setDisplayCount] = useState(10); 
  const loaderRef = useRef<HTMLDivElement>(null); 

  // 1. 구글 Places API 데이터 불러오기
  useEffect(() => {
    if (!isLoaded) return;

    const fetchPlacesData = async () => {
      setIsLoading(true);
      try {
        const regionText = (!selectedRegion || selectedRegion === "전체") 
          ? "제주도" 
          : `제주도 ${selectedRegion}`;

        // 공통 요청 옵션 분리
        const commonOptions = {
          fields: ['id', 'displayName', 'formattedAddress', 'rating', 'photos', 'types'],
          language: 'ko',
          region: 'kr',
          maxResultCount: 20,
          // 📍 제주도 위도/경도 경계 제한 부활!
          locationRestriction: {
            west: 126.10, // 서쪽 끝
            east: 127.00, // 동쪽 끝
            south: 33.10, // 남쪽 끝
            north: 33.60, // 북쪽 끝
          }
        };

        const restaurantRequest = {
          textQuery: `${regionText} 식당`,
          ...commonOptions
        };

        const cafeRequest = {
          textQuery: `${regionText} 카페`,
          ...commonOptions
        };

        const [restaurantResponse, cafeResponse] = await Promise.all([
          window.google.maps.places.Place.searchByText(restaurantRequest),
          window.google.maps.places.Place.searchByText(cafeRequest)
        ]);

        const combinedPlaces = [
          ...(restaurantResponse.places || []),
          ...(cafeResponse.places || [])
        ];

        const uniquePlaces = Array.from(new Map(combinedPlaces.map(place => [place.id, place])).values());

        if (uniquePlaces.length > 0) {
          const fetchedStores = uniquePlaces.map((place) => {
            let photoUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80";
            if (place.photos && place.photos.length > 0) {
              try {
                photoUrl = place.photos[0].getURI({ maxWidth: 800 }); 
              } catch (e) {
                console.warn("사진 주소 로드 실패", e);
              }
            }

            let detailLocation = "제주도";
            if (place.formattedAddress) {
              const match = place.formattedAddress.match(/([가-힣]+(읍|면|동))/);
              if (match) {
                detailLocation = match[0];
              } else {
                detailLocation = place.formattedAddress.includes("서귀포") ? "서귀포시" : "제주시";
              }
            }

            let detailCategory = "식당";
            const typesStr = place.types ? place.types.join(" ") : "";
            const nameStr = place.displayName || "";

            if (typesStr.includes("cafe") || typesStr.includes("bakery") || typesStr.includes("coffee")) {
              detailCategory = "카페/디저트";
            } else if (typesStr.includes("korean_restaurant") || nameStr.includes("국밥") || nameStr.includes("해장") || nameStr.includes("식당")) {
              detailCategory = "한식";
            } else if (typesStr.includes("japanese_restaurant") || typesStr.includes("sushi") || nameStr.includes("스시") || nameStr.includes("초밥") || nameStr.includes("카츠")) {
              detailCategory = "일식";
            } else if (typesStr.includes("chinese_restaurant") || nameStr.includes("반점") || nameStr.includes("짬뽕") || nameStr.includes("중식")) {
              detailCategory = "중식";
            } else if (typesStr.includes("italian") || typesStr.includes("pizza") || typesStr.includes("hamburger") || nameStr.includes("파스타") || nameStr.includes("피자") || nameStr.includes("버거")) {
              detailCategory = "양식";
            } else if (typesStr.includes("seafood") || nameStr.includes("횟집") || nameStr.includes("해녀") || nameStr.includes("해물")) {
              detailCategory = "해산물";
            } else if (typesStr.includes("barbecue") || nameStr.includes("흑돼지") || nameStr.includes("고기") || nameStr.includes("갈비")) {
              detailCategory = "고기/구이";
            } else if (typesStr.includes("bar") || typesStr.includes("liquor") || nameStr.includes("술집") || nameStr.includes("포차")) {
              detailCategory = "주점";
            }

            return {
              id: place.id || Math.random().toString(),
              imageUrl: photoUrl,
              location: detailLocation,
              category: detailCategory,
              name: place.displayName || "이름 없음",
              description: place.formattedAddress || "주소 정보 없음",
              rating: place.rating || 0,
              isFavorite: false,
            };
          });

          const shuffledStores = fetchedStores.sort(() => Math.random() - 0.5);

          setStores(shuffledStores);
          setSearchResultNames(shuffledStores.map((s) => s.name));
        } else {
          setStores([]);
          setSearchResultNames([]);
        }
      } catch (error) {
        console.error("데이터 로딩 에러:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlacesData();
  }, [isLoaded, selectedRegion]);

  useEffect(() => {
    setDisplayCount(10);
  }, [selectedRegion, searchResultNames]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => prev + 10);
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [stores]); 

  const storeNames = useMemo(() => stores.map((s) => s.name), [stores]);

  const handleSearch = useCallback((results: string[]) => {
    setSearchResultNames(results);
  }, []);

  const filteredStores = useMemo(() => {
    return stores.filter((s) => searchResultNames.includes(s.name));
  }, [searchResultNames, stores]);

  const visibleStores = filteredStores.slice(0, displayCount);

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
          data={storeNames}
          onSearch={handleSearch}
        />

        <LocalFilter
          regions={REGIONS}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        <section className={styles.storeList}>
          {isLoading ? (
            <p className={styles.emptyMessage}>맛집 정보를 불러오는 중입니다...</p>
          ) : visibleStores.length > 0 ? (
            <>
              {visibleStores.map((store) => (
                <StoreCard
                  key={store.id}
                  imageUrl={store.imageUrl}
                  location={store.location}
                  category={store.category}
                  rating={store.rating}
                  name={store.name}
                  description={store.description}
                  isFavorite={store.isFavorite}
                  onToggleFavorite={() => handleToggleFavorite(store.id)}
                  onClick={() => handleStoreClick(store.id, store.name)}
                />
              ))}
              
              {displayCount < filteredStores.length && (
                <div ref={loaderRef} style={{ height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <span style={{ color: "#888", fontSize: "14px" }}>더 불러오는 중...</span>
                </div>
              )}
            </>
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
        className={`${styles.scrollToTopButton} ${
          !showScrollToTop ? styles.hidden : ""
        }`}
        onClick={handleScrollToTop}
        aria-label="맨 위로"
      >
        <FaArrowUp size={18} />
      </button>
    </div>
  );
}