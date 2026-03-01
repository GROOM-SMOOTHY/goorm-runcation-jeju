import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import Header from "@/components/layout/Header/Header";
import TypeBadge from "@/components/common/TypeBadge/TypeBadge";
import GroupCodeDisplay from "@/components/pages/main-page/GroupCodeDisplay";
import PendingSettlementPanel from "@/components/pages/main-page/PendingSettlementPanel";
import WeatherPanel from "@/components/pages/main-page/WeatherPanel";
import MainShortcutCard from "@/components/pages/main-page/MainShortcutCard";
import GuestBookCard from "@/components/pages/main-page/GuestBookCard";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import Loading from "@/components/common/Loading/Loading";

import { useGroup } from "@/store";
import { fetchCurrentWeather } from "@/api/weather";
import { useRestaurantDetail } from "@/hooks/useRestaurantDetail";
import styles from "./styles.module.css";

const defaultImage = "https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/rbijqoq1b491jsbcnnoe.jpg";

const isLocationInJeju = (lat: number, lon: number) => {
  return lat >= 33.1 && lat <= 33.6 && lon >= 126.1 && lon <= 127.0;
};

export default function MainPage() {
  const navigate = useNavigate();
  const { group } = useGroup();
  const { isLoaded } = useRestaurantDetail();

  const [weather, setWeather] = useState("로딩중");
  const [degree, setDegree] = useState<number | null>(null);
  const [recommendStore, setRecommendStore] = useState<any>(null);
  const [isStoreLoading, setIsStoreLoading] = useState(true);
  const [cardTitle, setCardTitle] = useState("제주 핫플레이스 추천 맛집");

  useEffect(() => {
    if (!isLoaded) return;

    const fetchPlacesAndWeather = async (lat: number, lon: number, title: string) => {
      setCardTitle(title);

      try {
        const result = await fetchCurrentWeather(lat, lon);
        setWeather(result.description);
        setDegree(result.temp);
      } catch (e) {
        console.error(e);
      }

      const service = new window.google.maps.places.PlacesService(document.createElement("div"));
      const center = new window.google.maps.LatLng(lat, lon);

      service.nearbySearch(
        {
          location: center,
          radius: 5000,
          type: "restaurant",
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            const validStores = results.filter((store) => store.photos && store.photos.length > 0);
            const sortedStores = (validStores.length > 0 ? validStores : results).sort(
              (a, b) => (b.rating || 0) - (a.rating || 0)
            );

            const topStores = sortedStores.slice(0, 5);
            const randomIndex = Math.floor(Math.random() * topStores.length);
            setRecommendStore(topStores[randomIndex]);
          }
          setIsStoreLoading(false);
        }
      );
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (isLocationInJeju(latitude, longitude)) {
            fetchPlacesAndWeather(latitude, longitude, "지금 내 주변 추천 맛집");
          } else {
            fetchPlacesAndWeather(33.4996, 126.5312, "제주 도착 전! 핫플레이스 추천");
          }
        },
        () => fetchPlacesAndWeather(33.4996, 126.5312, "제주 핫플레이스 추천 맛집")
      );
    } else {
      fetchPlacesAndWeather(33.4996, 126.5312, "제주 핫플레이스 추천 맛집");
    }
  }, [isLoaded]);

  const handleCardClick = () => {
    if (!recommendStore?.place_id) return;

    const cleanStoreData = {
      id: recommendStore.place_id,
      name: recommendStore.name,
      rating: recommendStore.rating,
      imageUrl: recommendStore.photos?.[0]?.getUrl({ maxWidth: 800 }) || defaultImage,
      latitude: recommendStore.geometry?.location?.lat(),
      longitude: recommendStore.geometry?.location?.lng(),
      address: recommendStore.vicinity || recommendStore.formatted_address || "제주도",
    };

    navigate(`/restaurants/${recommendStore.place_id}`, {
      state: { storeData: cleanStoreData },
    });
  };

  return (
    <>
      <Header title="메인" />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.userInfoWrap}>
            {group?.course && <TypeBadge course={group.course} />}
            {group?.batch && <TypeBadge course="DEFAULT" generation={group.batch} />}
          </div>
          <div className={styles.groupInfoWrap}>
            <span className={styles.title}>어디로 놀러갈까?</span>
            <GroupCodeDisplay code={group?.code || ""} />
          </div>
        </div>

        <div className={styles.imageWrapper} onClick={handleCardClick}>
          {isStoreLoading ? (
            <Loading />
          ) : (
            <>
              <img
                src={recommendStore?.photos?.[0]?.getUrl({ maxWidth: 800 }) || defaultImage}
                alt="추천 맛집"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.todayWeather}>{cardTitle}</span>
                <span className={styles.todayWeatherValue}>
                  {recommendStore?.name || "맛집 정보를 찾을 수 없습니다"}
                </span>
                <div className={styles.storeSubInfo}>
                  {recommendStore?.rating && (
                    <>
                      <FaStar size={14} color="#FFD700" style={{ marginRight: "4px" }} />
                      <span style={{ marginRight: "8px" }}>{recommendStore.rating}</span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.noticeContainer}>
          <PendingSettlementPanel count={10} />
          {degree && weather !== "로딩중" && <WeatherPanel degree={degree} weather={weather} />}
        </div>

        <div className={styles.shortcutContainer}>
          <span className={styles.label}>빠른 실행</span>
          <div className={styles.shortcutList}>
            <MainShortcutCard type="store" title={<>지역별<br />맛집 탐방</>} onClick={() => navigate("/restaurants")} />
            <MainShortcutCard type="settlement" title={<>정산하기<br />& N빵</>} onClick={() => navigate("/settlement")} />
          </div>
        </div>

        <div className={styles.guestbookContainer}>
          <span className={styles.label}>방명록</span>
          <div className={styles.guestbookList}>
            <GuestBookCard title="김나영님" description="레전드 맛집있음 추천!" image={defaultImage} course="FRONTEND" generation={7} />
            <GuestBookCard title="김나영님" description="분위기 미쳤어요" image={defaultImage} course="FRONTEND" generation={7} />
          </div>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
}