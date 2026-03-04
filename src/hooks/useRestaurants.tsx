import { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { createClient } from "@supabase/supabase-js";
import type { StoreCardProps } from "@/components/pages/restaurant-list-page/StoreCard/StoreCard";
import DEFAULT_IMAGE from "/src/assets/Rectangle.webp";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LIBRARIES: "places"[] = ["places"];
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const SEARCH_KEYWORDS = ["맛집", "식당", "카페"];
const BUCKET_NAME = "restaurant-images";

export type StoreItem = Omit<StoreCardProps, "description"> & {
  id: string;
  description: string;
  phoneNumber?: string | null;
  openingHours?: string[] | null;
  latitude: number;
  longitude: number;
};

function isDataFresh(updatedAt: string | null): boolean {
  if (!updatedAt) return false;
  return Date.now() - new Date(updatedAt).getTime() < THIRTY_DAYS_MS;
}

function mapDbRowToStoreItem(item: Record<string, unknown>): StoreItem {
  return {
    id: item.place_id as string,
    imageUrl: (item.image_url as string) || DEFAULT_IMAGE,
    location:
      (item.formatted_address as string)?.match(/([가-힣]+(읍|면|동))/)?.[0] ||
      "제주도",
    category: (item.types as string[])?.includes("cafe")
      ? "카페/디저트"
      : "식당",
    name: item.name as string,
    description: (item.formatted_address as string) || "",
    rating: (item.rating as number) || 0,
    isFavorite: false,
    latitude: item.latitude as number,
    longitude: item.longitude as number,
    phoneNumber: (item.phone_number as string) || null,
    openingHours: (item.opening_hours as string[]) || null,
  };
}

/**
 * Google Places 이미지를 Supabase Storage에 업로드 후 영구 URL 반환
 * HEAD 체크 제거 → 바로 fetch & upload (upsert로 중복 처리)
 */
async function uploadImageToStorage(
  googleImageUrl: string,
  placeId: string
): Promise<string | null> {
  try {
    const fileName = `${placeId}.jpg`;

    // Google Places URL에서 이미지 fetch
    const response = await fetch(googleImageUrl);
    if (!response.ok) return null;
    const blob = await response.blob();

    // Supabase Storage 업로드 (upsert: true → 이미 있으면 덮어쓰기, 없으면 신규)
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, blob, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.warn("[Storage] 업로드 실패:", error.message);
      return null;
    }

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return data.publicUrl ?? null;
  } catch (e) {
    console.warn("[Storage] 이미지 저장 오류:", e);
    return null;
  }
}

export function useRestaurants(selectedRegion: string, searchKeyword: string) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: LIBRARIES,
    language: "ko",
    region: "KR",
  });

  const [stores, setStores] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    abortRef.current = true;
    abortRef.current = false;

    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      setStores([]);

      try {
        // ── STEP 1: DB 캐시 조회 ─────────────────────────────────
        let query = supabase.from("restaurants").select("*");

        if (selectedRegion && selectedRegion !== "전체") {
          query = query.ilike("formatted_address", `%${selectedRegion}%`);
        }
        if (searchKeyword) {
          query = query.ilike("name", `%${searchKeyword}%`);
        }

        const { data: dbRows, error: dbError } = await query;
        if (cancelled) return;

        // 30일 이내 데이터 + image_url 있는 row만 사용
        const freshRows = dbRows?.filter(
          (row) => isDataFresh(row.updated_at) && row.image_url
        );

        if (!dbError && freshRows && freshRows.length > 0) {
          setStores(freshRows.map(mapDbRowToStoreItem));
          setIsLoading(false);
          return;
        }

        // ── STEP 2: Google Places API 호출 ───────────────────────
        const regionText =
          !selectedRegion || selectedRegion === "전체"
            ? "제주도"
            : `제주도 ${selectedRegion}`;

        const keywords = searchKeyword ? [searchKeyword] : SEARCH_KEYWORDS;
        const allPlaces: google.maps.places.Place[] = [];

        for (const keyword of keywords) {
          if (cancelled) return;
          try {
            const { places } = await google.maps.places.Place.searchByText({
              textQuery: `${regionText} ${keyword}`,
              fields: [
                "id", "displayName", "formattedAddress", "rating",
                "photos", "types", "location", "nationalPhoneNumber",
                "regularOpeningHours",
              ],
              language: "ko",
              maxResultCount: 20,
            });
            if (places) allPlaces.push(...places);
          } catch (e) {
            console.warn(`[Places API] "${keyword}" 검색 실패:`, e);
          }
        }

        if (cancelled) return;
        if (allPlaces.length === 0) {
          setIsLoading(false);
          return;
        }

        const uniquePlaces = Array.from(
          new Map(allPlaces.map((p) => [p.id, p])).values()
        );

        // ── STEP 3: 이미지 Storage 업로드 후 영구 URL DB 저장 ────
        const dbData = await Promise.all(
          uniquePlaces.map(async (place) => {
            const googleImageUrl = place.photos?.[0]
              ? `https://places.googleapis.com/v1/${
                  (place.photos[0] as unknown as { name: string }).name
                }/media?maxWidthPx=800&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
              : null;

            const storedImageUrl = googleImageUrl
              ? await uploadImageToStorage(googleImageUrl, place.id)
              : null;

            return {
              place_id: place.id,
              name: place.displayName ?? "이름 없음",
              formatted_address: place.formattedAddress ?? null,
              latitude: place.location?.lat() ?? 0,
              longitude: place.location?.lng() ?? 0,
              rating: place.rating ?? 0,
              types: place.types ?? [],
              phone_number: place.nationalPhoneNumber ?? null,
              opening_hours: place.regularOpeningHours?.weekdayDescriptions ?? null,
              image_url: storedImageUrl || null,
              updated_at: new Date().toISOString(),
            };
          })
        );

        if (cancelled) return;

        const { error: upsertError } = await supabase
          .from("restaurants")
          .upsert(dbData, { onConflict: "place_id" });

        if (upsertError) {
          console.error("[Supabase] upsert 실패:", upsertError);
        }

        if (cancelled) return;
        setStores(dbData.map(mapDbRowToStoreItem));
      } catch (err) {
        if (!cancelled) console.error("[useRestaurants] 전체 오류:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [isLoaded, selectedRegion, searchKeyword]);

  return { stores, setStores, isLoading };
}