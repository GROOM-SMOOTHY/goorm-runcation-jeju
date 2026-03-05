import { FaStar } from "react-icons/fa";
import Header from "@/components/layout/Header/Header";
import TypeBadge from "@/components/common/TypeBadge/TypeBadge";
import GroupCodeDisplay from "@/components/pages/main-page/GroupCodeDisplay";
import PendingSettlementPanel from "@/components/pages/main-page/PendingSettlementPanel";
import WeatherPanel from "@/components/pages/main-page/WeatherPanel";
import MainShortcutCard from "@/components/pages/main-page/MainShortcutCard";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import { useGroup, useUser } from "@/store";
import { fetchCurrentWeather } from "@/api/weather";
import { useEffect, useState } from "react";
import GuestBookList from "@/components/pages/main-page/GuestBookList";
import { getMyPendingSettlementCount } from "@/services/expenseParticipantsService";
import { useJsApiLoader } from "@react-google-maps/api";
import { createClient } from "@supabase/supabase-js";
import styles from "./styles.module.css";
import Loading from "@/components/common/Loading/Loading";
import DEFAULT_IMAGE from "/src/assets/Rectangle.webp";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const LIBRARIES: "places"[] = ["places"];
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function isDataFresh(updatedAt: string | null): boolean {
  if (!updatedAt) return false;
  return Date.now() - new Date(updatedAt).getTime() < THIRTY_DAYS_MS;
}

const isLocationInJeju = (lat: number, lon: number) =>
  lat >= 33.1 && lat <= 33.6 && lon >= 126.1 && lon <= 127.0;

interface GooglePhoto {
  name: string;
  getURI: (opts: { maxWidth: number }) => string;
}

// any 제거 - 명시적 타입 정의
interface RecommendStore {
  place_id: string;
  name: string;
  rating: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
  address: string;
}

export default function MainPage() {
  const navigate = useNavigate();
  const { group } = useGroup();
  const { id: userId } = useUser();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
    libraries: LIBRARIES,
    language: "ko",
    region: "KR",
  });

  const [weather, setWeather] = useState<string | null>(null);
  const [degree, setDegree] = useState<number | null>(null);
  const [pendingSettlementCount, setPendingSettlementCount] = useState(0);
  const [recommendStore, setRecommendStore] = useState<RecommendStore | null>(
    null,
  );
  const [isStoreLoading, setIsStoreLoading] = useState(true);
  const [cardTitle, setCardTitle] = useState("제주 핫플레이스 추천");

  useEffect(() => {
    if (!userId) return;
    getMyPendingSettlementCount(userId).then(setPendingSettlementCount);
  }, [userId]);

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    const fetchRecommend = async (lat: number, lon: number, title: string) => {
      if (cancelled) return;
      setCardTitle(title);
      setIsStoreLoading(true);

      try {
        // 날씨는 병렬로 먼저 시작
        const weatherPromise = fetchCurrentWeather(lat, lon);

        // ── STEP 1: DB 캐시 조회 ──────────────────────────────────
        const regionKeyword = lat >= 33.35 ? "제주시" : "서귀포시";
        const { data: cachedRows } = await supabase
          .from("restaurants")
          .select("*")
          .ilike("formatted_address", `%${regionKeyword}%`)
          .order("rating", { ascending: false })
          .limit(20);

        const freshRows = cachedRows?.filter((r) => isDataFresh(r.updated_at));

        if (!cancelled && freshRows && freshRows.length > 0) {
          const top5 = freshRows.slice(0, 5);
          const picked = top5[Math.floor(Math.random() * top5.length)];
          setRecommendStore({
            place_id: picked.place_id,
            name: picked.name,
            rating: picked.rating || 0,
            imageUrl: picked.image_url || DEFAULT_IMAGE,
            latitude: picked.latitude,
            longitude: picked.longitude,
            address: picked.formatted_address || "제주도",
          });

          const weatherResult = await weatherPromise;
          if (!cancelled) {
            setWeather(weatherResult.description);
            setDegree(weatherResult.temp);
            setIsStoreLoading(false);
          }
          return;
        }

        // ── STEP 2: DB 없거나 30일 초과 → Google Places API ──────
        const { places } = await google.maps.places.Place.searchByText({
          textQuery: `제주도 ${regionKeyword} 맛집`,
          fields: [
            "id",
            "displayName",
            "formattedAddress",
            "rating",
            "photos",
            "types",
            "location",
            "nationalPhoneNumber",
            "regularOpeningHours",
          ],
          language: "ko",
          maxResultCount: 20,
        });

        if (cancelled) return;

        if (places && places.length > 0) {
          const dbData = places.map((p) => ({
            place_id: p.id,
            name: p.displayName ?? "이름 없음",
            formatted_address: p.formattedAddress ?? null,
            latitude: p.location?.lat() ?? 0,
            longitude: p.location?.lng() ?? 0,
            rating: p.rating ?? 0,
            types: p.types ?? [],
            phone_number: p.nationalPhoneNumber ?? null,
            opening_hours: p.regularOpeningHours?.weekdayDescriptions ?? null,
            image_url: p.photos?.[0]
              ? `https://places.googleapis.com/v1/${(p.photos[0] as unknown as GooglePhoto).name}/media?maxWidthPx=800&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
              : null,
            updated_at: new Date().toISOString(),
          }));

          // DB에 upsert (이후 30일간 API 재호출 없음)
          await supabase
            .from("restaurants")
            .upsert(dbData, { onConflict: "place_id" });

          if (cancelled) return;

          const sorted = [...dbData].sort(
            (a, b) => (b.rating || 0) - (a.rating || 0),
          );
          const top5 = sorted.slice(0, 5);
          const picked = top5[Math.floor(Math.random() * top5.length)];

          setRecommendStore({
            place_id: picked.place_id,
            name: picked.name,
            rating: picked.rating || 0,
            // image_url이 null이면 DEFAULT_IMAGE
            imageUrl: picked.image_url || DEFAULT_IMAGE,
            latitude: picked.latitude,
            longitude: picked.longitude,
            address: picked.formatted_address || "제주도",
          });
        }

        const weatherResult = await weatherPromise;
        if (!cancelled) {
          setWeather(weatherResult.description);
          setDegree(weatherResult.temp);
        }
      } catch (e) {
        console.error("메인 데이터 로드 실패:", e);
      } finally {
        if (!cancelled) setIsStoreLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          if (isLocationInJeju(latitude, longitude)) {
            fetchRecommend(latitude, longitude, "지금 내 주변 추천 맛집");
          } else {
            fetchRecommend(33.4996, 126.5312, "제주 도착 전! 핫플레이스 추천");
          }
        },
        () => fetchRecommend(33.4996, 126.5312, "제주 핫플레이스 추천 맛집"),
      );
    } else {
      fetchRecommend(33.4996, 126.5312, "제주 핫플레이스 추천 맛집");
    }

    return () => {
      cancelled = true;
    };
  }, [isLoaded]); // isLoaded만 의존 → 마운트 1회만 실행

  const handleCardClick = () => {
    if (!recommendStore) return;
    navigate(`/restaurants/${recommendStore.place_id}`, {
      state: { storeData: recommendStore },
    });
  };

  return (
    <>
      <Header title="메인" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.userInfoWrap}>
            {group?.course && <TypeBadge course={group.course} />}
            {group?.batch && (
              <TypeBadge course="DEFAULT" generation={group.batch} />
            )}
          </div>
          <div className={styles.groupInfoWrap}>
            <span className={styles.title}>어디로 놀러갈까?</span>
            <GroupCodeDisplay code={group?.code || ""} />
          </div>
        </div>

        {/* 맛집 추천 카드 */}
        <div className={styles.imageWrapper} onClick={handleCardClick}>
          {isStoreLoading ? (
            <div className={styles.loading}>
              <Loading />
            </div>
          ) : (
            <>
              <img
                src={recommendStore?.imageUrl || DEFAULT_IMAGE}
                alt="추천 맛집"
                onError={(e) => {
                  // URL이 있어도 실제 로드 실패 시 기본 이미지로 교체
                  e.currentTarget.src = DEFAULT_IMAGE;
                }}
              />
              <div className={styles.imageOverlay}>
                <span className={styles.todayWeather}>{cardTitle}</span>
                <span className={styles.todayWeatherValue}>
                  {recommendStore?.name || "맛집 정보를 찾을 수 없습니다"}
                </span>
                <div className={styles.storeSubInfo}>
                  {recommendStore?.rating != null &&
                    recommendStore.rating > 0 && (
                      <>
                        <FaStar
                          size={14}
                          color="#FFD700"
                          style={{ marginRight: "4px" }}
                        />
                        <span style={{ marginRight: "8px" }}>
                          {recommendStore.rating}
                        </span>
                      </>
                    )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.noticeContainer}>
          <PendingSettlementPanel count={pendingSettlementCount} />
          <WeatherPanel degree={degree} weather={weather} />
        </div>

        <div className={styles.shortcutContainer}>
          <span className={styles.label}>빠른 실행</span>
          <div className={styles.shortcutList}>
            <MainShortcutCard
              type="store"
              title={
                <>
                  지역별
                  <br />
                  맛집 탐방
                </>
              }
              onClick={() => navigate("/restaurants")}
            />
            <MainShortcutCard
              type="settlement"
              title={
                <>
                  정산하기
                  <br />& N빵
                </>
              }
              onClick={() => navigate("/settlement")}
            />
          </div>
        </div>
        <GuestBookList />
      </div>
      <BottomNavigation />
    </>
  );
}
