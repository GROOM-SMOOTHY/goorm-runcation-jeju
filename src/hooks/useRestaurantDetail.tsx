import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

// placeId 뒤에 ?를 붙여 선택적 인자로 변경
export function useRestaurantDetail(placeId?: string) {
  const [store, setStore] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
    language: "ko",
    region: "KR",
  });

  useEffect(() => {
    // placeId가 없으면 상세 정보를 가져오지 않고 종료
    if (!isLoaded || !placeId) {
      if (!placeId) setIsLoading(false);
      return;
    }

    const fetchDetail = () => {
      setIsLoading(true);
      const service = new window.google.maps.places.PlacesService(document.createElement("div"));

      service.getDetails(
        {
          placeId,
          fields: [
            "name", "formatted_address", "formatted_phone_number", 
            "opening_hours", "photos", "geometry", "types", "rating"
          ],
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            setStore({
              name: place.name,
              imageUrl: place.photos?.[0]?.getUrl({ maxWidth: 1200 }) || "",
              address: place.formatted_address,
              location: place.formatted_address?.match(/([가-힣]+(읍|면|동))/)?.[0] || "제주도",
              rating: place.rating || 0,
              category: place.types?.includes("cafe") ? "카페/디저트" : "식당",
              contact: place.formatted_phone_number || "전화번호 정보 없음",
              latitude: place.geometry?.location?.lat(),
              longitude: place.geometry?.location?.lng(),
              hours: place.opening_hours?.weekday_text || ["영업시간 정보 없음"],
            });
          }
          setTimeout(() => setIsLoading(false), 500);
        }
      );
    };

    fetchDetail();
  }, [placeId, isLoaded]);

  return { store, isLoading, isLoaded };
}