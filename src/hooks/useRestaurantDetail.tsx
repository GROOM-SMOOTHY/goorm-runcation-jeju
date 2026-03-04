import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { createClient } from "@supabase/supabase-js";
import DEFAULT_IMAGE from "/src/assets/Rectangle.webp";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LIBRARIES: "places"[] = ["places"];
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function isDataFresh(updatedAt: string | null): boolean {
  if (!updatedAt) return false;
  return Date.now() - new Date(updatedAt).getTime() < THIRTY_DAYS_MS;
}

export interface StoreDetail {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
  location: string;
  rating: number;
  category: string;
  contact: string;
  latitude: number;
  longitude: number;
  hours: string[];
}

export function useRestaurantDetail(placeId?: string) {
  const [store, setStore] = useState<StoreDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: LIBRARIES,
    language: "ko",
    region: "KR",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!placeId) { setIsLoading(false); return; }
    if (!isLoaded) return;

    let cancelled = false;

    const run = async () => {
      setIsLoading(true);

      // STEP 1: DB 캐시 조회
      const { data: cached, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("place_id", placeId)
        .single();

      if (!cancelled && !error && cached && isDataFresh(cached.updated_at)) {
        setStore({
          id: cached.place_id,
          name: cached.name,
          imageUrl: cached.image_url || DEFAULT_IMAGE,
          address: cached.formatted_address || "주소 정보 없음",
          location: cached.formatted_address?.match(/([가-힣]+(읍|면|동))/)?.[0] || "제주도",
          rating: cached.rating || 0,
          category: cached.types?.includes("cafe") ? "카페/디저트" : "식당",
          contact: cached.phone_number || "전화번호 정보 없음",
          latitude: cached.latitude,
          longitude: cached.longitude,
          hours: cached.opening_hours || ["영업시간 정보 없음"],
        });
        setIsLoading(false);
        return;
      }

      // STEP 2: Google API 호출
      const service = new window.google.maps.places.PlacesService(document.createElement("div"));

      service.getDetails(
        {
          placeId,
          fields: ["name","formatted_address","formatted_phone_number","opening_hours","photos","geometry","types","rating"],
        },
        async (place, status) => {
          if (cancelled) return;

          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            const rawImageUrl = place.photos?.[0]?.getUrl({ maxWidth: 1200 }) || null;

            const storeData: StoreDetail = {
              id: placeId,
              name: place.name || "이름 없음",
              imageUrl: rawImageUrl || DEFAULT_IMAGE,
              address: place.formatted_address || "주소 정보 없음",
              location: place.formatted_address?.match(/([가-힣]+(읍|면|동))/)?.[0] || "제주도",
              rating: place.rating || 0,
              category: place.types?.includes("cafe") ? "카페/디저트" : "식당",
              contact: place.formatted_phone_number || "전화번호 정보 없음",
              latitude: place.geometry?.location?.lat() || 0,
              longitude: place.geometry?.location?.lng() || 0,
              hours: place.opening_hours?.weekday_text || ["영업시간 정보 없음"],
            };

            setStore(storeData);

            // 30일 캐시 저장
            await supabase.from("restaurants").upsert({
              place_id: placeId,
              name: storeData.name,
              formatted_address: storeData.address,
              latitude: storeData.latitude,
              longitude: storeData.longitude,
              rating: storeData.rating,
              types: place.types || [],
              phone_number: place.formatted_phone_number || null,
              opening_hours: place.opening_hours?.weekday_text || null,
              image_url: rawImageUrl,
              updated_at: new Date().toISOString(),
            }, { onConflict: "place_id" });
          }

          if (!cancelled) setIsLoading(false);
        }
      );
    };

    run();
    return () => { cancelled = true; };
  }, [placeId, isLoaded]);

  return { store, isLoading, isLoaded };
}