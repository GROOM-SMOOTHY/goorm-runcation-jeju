import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useJsApiLoader } from "@react-google-maps/api";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import StoreInfoCard from "@/components/pages/restaurant-store-page/StoreInfoCard/StoreInfoCard";
import StoreMap from "@/components/pages/restaurant-store-page/StoreMap/StoreMap";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import styles from "@/pages/RestaurantStorePage/RestaurantStorePage.module.css";

// 타입스크립트 인터페이스 정의
interface StoreDetail {
  tag: string;
  name: string;
  nameEn: string;
  heroImageUrl: string;
  address: string;
  contact: string;
  hours: string;
  latitude: number;
  longitude: number;
  placeId: string;
}

const libraries: ("places")[] = ["places"];

export default function RestaurantStorePage() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 식당 id 가져오기 (slug는 API 사용 시 불필요해져서 제거)
  const addToast = useToastStore((state) => state.addToast);
  const [isLiked, setIsLiked] = useState(false);

  // Google Maps API 로드
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: libraries,
  });

  // 상태 관리: 실제 API에서 가져온 데이터를 저장할 상태
  const [store, setStore] = useState<StoreDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // [핵심] Google Places API를 사용해 식당 상세 정보 가져오기
  useEffect(() => {
    if (!isLoaded || !id) return;

    const fetchPlaceDetail = async () => {
      setIsLoading(true);
      try {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        
        service.getDetails({
          placeId: id,
          // 가져올 세부 정보들 (이름, 주소, 전화번호, 영업시간, 사진, 좌표 등)
          fields: ['name', 'formatted_address', 'formatted_phone_number', 'opening_hours', 'photos', 'geometry', 'types']
        }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            
            // 1. 이미지 처리
            let photoUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80";
            if (place.photos && place.photos.length > 0) {
              photoUrl = place.photos[0].getUrl({ maxWidth: 1200 }); // 고화질 이미지 호출
            }

            // 2. 영업시간 처리 (오늘 요일의 영업시간 텍스트 가져오기)
            let hoursText = "영업시간 정보 없음";
            if (place.opening_hours && place.opening_hours.weekday_text) {
              const todayIdx = new Date().getDay(); // 0: 일요일 ~ 6: 토요일
              const googleIdx = todayIdx === 0 ? 6 : todayIdx - 1; // 구글은 월요일이 0번 인덱스
              hoursText = place.opening_hours.weekday_text[googleIdx] || "영업시간 정보 없음";
            }

            // 3. 카테고리 태그 처리
            let tagText = "맛집";
            if (place.types && place.types.includes("cafe")) tagText = "카페/디저트";
            else if (place.types && place.types.includes("restaurant")) tagText = "식당";

            // 상태에 저장
            setStore({
              tag: tagText,
              name: place.name || "이름 없음",
              nameEn: "", // 구글 API에서 영문명은 다국어 설정에 따라 다르므로 임시로 비움
              heroImageUrl: photoUrl,
              address: place.formatted_address || "주소 정보 없음",
              contact: place.formatted_phone_number || "전화번호 정보 없음",
              hours: hoursText,
              latitude: place.geometry?.location?.lat() || 33.49962,
              longitude: place.geometry?.location?.lng() || 126.5312,
              placeId: id,
            });
          } else {
            addToast("식당 정보를 불러오지 못했습니다.", "", "error");
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error("상세 정보 로딩 에러:", error);
        setIsLoading(false);
      }
    };

    fetchPlaceDetail();
  }, [id, isLoaded, addToast]);


  // 공유 기능 (그대로 유지)
  const handleShare = async () => {
    if (!store) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: store.name,
          text: `${store.name} - ${store.address}`,
          url: window.location.href,
        });
        addToast("공유되었습니다", "", "success");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        addToast("링크가 복사되었습니다", "", "success");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        addToast("공유에 실패했습니다", "", "error");
      }
    }
  };

  // 좋아요 기능 (그대로 유지)
  const handleLike = () => {
    setIsLiked((prev) => {
      const newState = !prev;
      addToast(
        newState ? "좋아요를 눌렀습니다" : "좋아요를 취소했습니다",
        "",
        "success"
      );
      return newState;
    });
  };

  // 로딩 중이거나 데이터가 없을 때의 화면 처리
  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header title="로딩 중..." onBack={() => navigate(-1)} />
        <main className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>상세 정보를 불러오는 중입니다...</p>
        </main>
      </div>
    );
  }

  if (!store) return null; // 데이터 로딩 실패 시 렌더링 방지

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <div className={styles.headerMain}>
          <Header title="맛집 상세" onBack={() => navigate(-1)} />
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="공유"
            onClick={handleShare}
          >
            <FiShare2 size={20} />
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${isLiked ? styles.liked : ""}`}
            aria-label="좋아요"
            onClick={handleLike}
          >
            {isLiked ? <FaHeart size={20} /> : <FiHeart size={20} />}
          </button>
        </div>
      </div>

      <main className={styles.container}>
        <section className={styles.hero} aria-label="매장 대표 이미지">
            
          {/* 백그라운드 매장 이미지 */}
          <div
            className={styles.heroBackground}
            style={{ backgroundImage: `url(${store.heroImageUrl})` }}
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroTitleWrap}>
            <span className={styles.heroTag}>
              {/* 카테고리 태그 */}
              {store.tag}
            </span>
            <h1 className={styles.storeName}>
              {/* 매장명 */}
              {store.name}
            </h1>
            <p className={styles.storeNameEn}>
              {/* 매장명 영어이름 */}
              {store.nameEn}
            </p>
          </div>
        </section>

        <section className={styles.section}>
          {/* StoreInfoCard 컴포넌트 */}
          <StoreInfoCard address={store.address} contact={store.contact} hours={store.hours} />
        </section>

        <section className={styles.section}>
          
          {/* StoreMap 컴포넌트 */}
          <StoreMap
            latitude={store.latitude}
            longitude={store.longitude}
          />
        </section>

        {store.placeId ? (
          <p className={styles.metaText}>placeId: {store.placeId}</p>
        ) : null}
      </main>

      <div className={styles.bottomNavWrap}>
        <BottomNavigation />
      </div>
    </div>
  );
}