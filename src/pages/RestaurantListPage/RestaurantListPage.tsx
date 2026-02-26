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

// 타입스크립트 에러 해결을 위한 명시적 타입 선언
type StoreItem = StoreCardProps & { id: string };

// 지역 필터 목록 및 구글 맵 라이브러리 설정
const REGIONS = ["제주시", "서귀포시", "애월", "한림", "대정", "안덕", "중문", "남원", "표선", "성산", "구좌", "조천"];
const libraries: ("places")[] = ["places"];

// 무한 스크롤이 끊기지 않게 도와줄 백업 키워드 풀 (사용자가 검색을 안 했을 때 릴레이로 부름)
const DEFAULT_KEYWORDS = ["맛집", "식당", "카페", "로컬맛집", "가볼만한곳"];

export default function RestaurantListPage() {
  const navigate = useNavigate();

  // Google Maps JavaScript API 로드 상태 관리
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: libraries,
  });

  // 상태 관리
  const [stores, setStores] = useState<(StoreCardProps & { id: string })[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("전체"); // 처음 진입시 전체

  // 사용자가 검색한 단어를 저장하는 상태(바로 API에서 검색해서 출력)
  const [searchKeyword, setSearchKeyword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  
  // 하나의 다음 페이지 함수와 키워드 순서를 관리
  const [nextPageFunc, setNextPageFunc] = useState<(() => Promise<any>) | null>(null);
  const [keywordIdx, setKeywordIdx] = useState(0);

  const observerRef = useRef<IntersectionObserver | null>(null); // 무한 스크롤 감시자 객체
  const mainRef = useRef<HTMLElement>(null); // 스크롤 이벤트 감지할 메인 영역
  const [showScrollToTop, setShowScrollToTop] = useState(false); // 맨 위로 버튼 노출 여부

  // Google Places API를 통해 데이터를 가져오고 상태를 업데이트
  const fetchPlacesData = useCallback(async (isFirst: boolean = true, forcedKeywordIdx?: number) => {
    const effectiveKeywordIdx = isFirst ? (forcedKeywordIdx ?? 0) : keywordIdx;
    // 로딩 중이거나 API 미로드 시 중복 호출 방지
    if (!isLoaded || (isFirst && isLoading) || (!isFirst && isFetchingMore)) return;

    // 로딩 상태 시작 설정
    isFirst ? setIsLoading(true) : setIsFetchingMore(true);

    try {
      // 검색 쿼리 설정
      // 쿼리 조립 1 : 지역 (전체면 '제주도', 아니면 '제주도 애월읍' 등)
      const regionText = (!selectedRegion || selectedRegion === "전체") ? "제주도" : `제주도 ${selectedRegion}`;
            
      // 쿼리 조립 2 : 사용자가 검색어를 입력했으면 그 검색어 사용, 아니면 내부 키워드(맛집->식당->카페) 순회
    const queryTarget = searchKeyword ? searchKeyword : DEFAULT_KEYWORDS[effectiveKeywordIdx];

      // 최종 완성된 API 요청 텍스트 (예: "제주도 애월 고기국수" 또는 "제주도 식당")
      const finalQuery = `${regionText} ${queryTarget}`;

      let response;

      if (isFirst || !nextPageFunc) {
        // [첫 검색] 새로운 키워드로 검색
        response = await window.google.maps.places.Place.searchByText({
          textQuery: finalQuery,
          fields: ['id', 'displayName', 'formattedAddress', 'rating', 'photos', 'types'],
          language: 'ko',
          region: 'kr',
          maxResultCount: 20,
          locationRestriction: { west: 126.10, east: 127.00, south: 33.10, north: 33.60 }
        });
      } else {
        // [무한 스크롤] 스크롤 내리면 저장된 다음 페이지(최대 60개) 가져오기
        response = await nextPageFunc();
      }

      if (response && response.places) {
        // any 타입 적용 및 리턴 타입 일치화로 타입스크립트 에러 방지
        const newStores: StoreItem[] = response.places.map((place: any) => {
          let photoUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80";
          if (place.photos?.[0]) {
            try { photoUrl = place.photos[0].getURI({ maxWidth: 800 }); } catch (e) {}
          }

        return {
          id: place.id || Math.random().toString(),
          imageUrl: photoUrl,
          // 주소에서 읍, 면, 동 단위만 추출
          location: place.formattedAddress?.match(/([가-힣]+(읍|면|동))/)?.[0] || "제주도",
          category: place.types?.includes("cafe") ? "카페/디저트" : "식당",
          name: place.displayName || "이름 없음",
          description: place.formattedAddress || "주소 정보 없음",
          rating: place.rating || 0,
          isFavorite: false,
        };
      });

        // 기존 리스트 뒤에 새 리스트를 붙이고, 중복되는 매장은 자동으로 걸러냄
    setStores(prev => {
      const combined = isFirst ? newStores : [...prev, ...newStores];
          return Array.from(new Map<string, StoreItem>(combined.map(p => [p.id, p])).values());
        });

        // 다음 페이지가 있는지 확인
        if (response.hasNextPage) {
          setNextPageFunc(() => response.getNextPage);
        } else {

          // 60개를 다 불러왔는데 사용자가 검색한 게 없다면?
          // 다음 내부 키워드(예: '식당' -> '카페')로 넘어가서 스크롤 시 또 API를 부르게 만든다!
          if (!searchKeyword && keywordIdx < DEFAULT_KEYWORDS.length - 1) {
            setKeywordIdx(prev => prev + 1);
            setNextPageFunc(null);
          } else {

            // 진짜 검색 결과가 다 끝났을 때
            setNextPageFunc(null);
          }
        }
      }
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {

      // 로딩 상태 해제
      isFirst ? setIsLoading(false) : setIsFetchingMore(false);
    }
  }, [isLoaded, selectedRegion, searchKeyword, keywordIdx, nextPageFunc, isLoading, isFetchingMore]);

  // 지역 필터가 바뀌거나 API가 로드되면 처음부터 다시 로딩
  useEffect(() => {
    setStores([]);
    setKeywordIdx(0);
    setNextPageFunc(null);
    fetchPlacesData(true, 0);
  }, [selectedRegion, searchKeyword, isLoaded]);

  // 무한 스크롤 감지를 위한 IntersectionObserver 설정
  const loaderRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect(); // 이전 관찰 중단
    if (node) {
      observerRef.current = new IntersectionObserver((entries) => {
        // 로더 영역이 화면에 보이고, 더 불러올 페이지가 있다면 추가 호출 실행
        if (entries[0].isIntersecting && (nextPageFunc || (!searchKeyword && keywordIdx < DEFAULT_KEYWORDS.length - 1))) {
          fetchPlacesData(false);
        }
      }, { threshold: 0.5 }); // 50%정도 보였을 때 실행
      observerRef.current.observe(node);
    }
  }, [fetchPlacesData, nextPageFunc, searchKeyword, keywordIdx]);

  // 검색 필터링을 거친 최종 매장 목록 계산
  const storeNames = useMemo(() => stores.map((s) => s.name), [stores]);

  // 즐겨찾기 상태 변경 핸들러
  const handleToggleFavorite = (storeId: string) => {
    setStores(prev => prev.map(s => s.id === storeId ? { ...s, isFavorite: !s.isFavorite } : s));
  };

  // 스크롤 시 '맨 위로' 버튼 노출 로직
  const handleScroll = () => {
    if (mainRef.current) setShowScrollToTop(mainRef.current.scrollTop > 200);
  };

  return (
    <div className={styles.page}>
      <Header title="맛집" onBack={() => navigate(-1)} />

      <main ref={mainRef} className={styles.main} onScroll={handleScroll}>
        <SearchBar data={storeNames} onSearch={setSearchKeyword} />
        <LocalFilter regions={REGIONS} selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />

        <section className={styles.storeList}>
          {isLoading ? (
            <p className={styles.emptyMessage}>데이터를 불러오는 중...</p>
          ) : (
            <>
              {stores.map((store) => (
                <StoreCard 
                  key={store.id} 
                  {...store} 
                  onToggleFavorite={() => handleToggleFavorite(store.id)}
                  onClick={() => navigate(`/restaurants/${store.id}`)}
                />
              ))}
              
              {/* 추가 로딩 트리거 영역 : 다음 페이지가 있을 때만 노출됨 */}
              {(nextPageFunc || (!searchKeyword && keywordIdx < DEFAULT_KEYWORDS.length - 1)) && (
                <div ref={loaderRef} className={styles.loaderArea}>
                  {isFetchingMore ? <span>추가 맛집 정보를 가져오는 중...</span> : null}
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