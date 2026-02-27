import { useState, useEffect, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import type { StoreCardProps } from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";

type StoreItem = StoreCardProps & { id: string };
const LIBRARIES: ("places")[] = ["places"];
const DEFAULT_KEYWORDS = ["맛집", "식당", "카페", "로컬맛집", "가볼만한곳"];

export function useRestaurants(selectedRegion: string, searchKeyword: string) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: LIBRARIES,
  });

  const [stores, setStores] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [keywordIdx, setKeywordIdx] = useState(0);

  // 실제 데이터를 가져오는 핵심 함수
  const fetchPlacesData = useCallback(async (isFirst: boolean = true) => {
    // API 로드 전이거나 이미 로딩 중이면 중단
    if (!isLoaded || (isFirst && isLoading) || (!isFirst && isFetchingMore)) return;

    if (isFirst) setIsLoading(true);
    else setIsFetchingMore(true);

    try {
      const regionText = (!selectedRegion || selectedRegion === "전체") ? "제주도" : `제주도 ${selectedRegion}`;
      const queryTarget = searchKeyword || DEFAULT_KEYWORDS[keywordIdx];
      const finalQuery = `${regionText} ${queryTarget}`;

      // Google Places API 호출
      const response = await window.google.maps.places.Place.searchByText({
        textQuery: finalQuery,
      
        fields: ['id', 'displayName', 'formattedAddress', 'rating', 'photos', 'types'],
        language: 'ko',
        region: 'kr',
        maxResultCount: 20,
        locationRestriction: { west: 126.10, east: 127.00, south: 33.10, north: 33.60 }
      });

      if (response && response.places) {
        const newStores: StoreItem[] = response.places.map((place: any) => ({
          id: place.id || Math.random().toString(),
          imageUrl: place.photos?.[0]?.getURI({ maxWidth: 800 }) || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
          location: place.formattedAddress?.match(/([가-힣]+(읍|면|동))/)?.[0] || "제주도",
          category: place.types?.includes("cafe") ? "카페/디저트" : "식당",
          name: place.displayName || "이름 없음",
          description: place.formattedAddress || "주소 정보 없음",
          rating: place.rating || 0,
          isFavorite: false,
          latitude: place.location?.latitude, 
          longitude: place.location?.longitude,
        }));

        setStores(prev => {
          const combined = isFirst ? newStores : [...prev, ...newStores];
          // 중복 데이터 제거 (Map 활용)
          return Array.from(new Map(combined.map(item => [item.id, item])).values());
        });

        // 무한 스크롤을 위한 키워드 인덱스 업데이트 (검색어가 없을 때만)
        if (!searchKeyword && keywordIdx < DEFAULT_KEYWORDS.length - 1) {
          setKeywordIdx(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error("Google Places API Error:", error);
    } finally {
      if (isFirst) setIsLoading(false);
      else setIsFetchingMore(false);
    }
  }, [isLoaded, selectedRegion, searchKeyword, keywordIdx, isLoading, isFetchingMore]);

  // 필터나 검색어가 바뀔 때마다 초기화 후 재검색
  useEffect(() => {
    if (isLoaded) {
      setStores([]);
      setKeywordIdx(0);
      fetchPlacesData(true);
    }
  }, [selectedRegion, searchKeyword, isLoaded]);

  return { 
    stores, 
    setStores, 
    isLoading, 
    isFetchingMore, 
    fetchPlacesData, 
    hasMore: !searchKeyword && keywordIdx < DEFAULT_KEYWORDS.length - 1 
  };
}