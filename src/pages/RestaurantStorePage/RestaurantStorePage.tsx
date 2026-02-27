import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { useJsApiLoader } from "@react-google-maps/api";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import StoreInfoCard from "@/components/pages/restaurant-store-page/StoreInfoCard/StoreInfoCard";
import StoreMap from "@/components/pages/restaurant-store-page/StoreMap/StoreMap";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import styles from "@/pages/RestaurantStorePage/RestaurantStorePage.module.css";

const libraries: ("places")[] = ["places"];

export default function RestaurantStorePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const addToast = useToastStore((state) => state.addToast);

  // 1. 초기값: 리스트에서 전달받은 데이터가 있으면 사용, 없으면 null
  const [store, setStore] = useState<any>(state?.storeData || null);
  // 리스트에서 넘어온 데이터에 상세 정보(주소 등)가 이미 있다면 로딩 생략
  const [isLoading, setIsLoading] = useState(!state?.storeData?.address);
  const [isLiked, setIsLiked] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
    language: "ko",
    region: "KR",
  });

  useEffect(() => {
    // 구글 맵 라이브러리가 아직 로드 전이거나 ID가 없으면 중단
    if (!isLoaded || !id) return;

    // 이미 상세 데이터(주소 등)가 있는 상태라면 API 중복 호출 방지
    if (store && (store.address || store.formatted_address)) {
      setIsLoading(false);
      return;
    }

    const fetchPlaceDetail = async () => {
      setIsLoading(true);
      try {
        // PlacesService는 DOM 요소가 필요하므로 가상 div 생성
        const service = new window.google.maps.places.PlacesService(document.createElement("div"));

        service.getDetails(
          {
            placeId: id,
            fields: [
              "name",
              "formatted_address",
              "formatted_phone_number",
              "opening_hours",
              "photos",
              "geometry",
              "types",
              "rating",
            ],
          },
          (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
              const photoUrl =
                place.photos?.[0]?.getUrl({ maxWidth: 1200 }) ||
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80";

              setStore({
                name: place.name,
                imageUrl: photoUrl,
                address: place.formatted_address,
                location: place.formatted_address?.match(/([가-힣]+(읍|면|동))/)?.[0] || "제주도",
                rating: place.rating || 0,
                category: place.types?.includes("cafe") ? "카페/디저트" : "식당",
                contact: place.formatted_phone_number || "전화번호 정보 없음",
                latitude: place.geometry?.location?.lat(),
                longitude: place.geometry?.location?.lng(),
                // 추가로 영업시간 정보가 필요하다면 여기에 매핑
                hours: place.opening_hours?.weekday_text || ["영업시간 정보 없음"],
              });
            } else {
              addToast("상세 정보를 불러올 수 없습니다.", "ID를 확인해주세요.", "error");
            }
            setIsLoading(false);
          }
        );
      } catch (error) {
        addToast("API 호출 중 오류가 발생했습니다.", "", "error");
        setIsLoading(false);
      }
    };

    fetchPlaceDetail();
    // 의존성 배열에서 'store'를 제거하여 무한 루프 방지
  }, [id, isLoaded, addToast]);

  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return <div className={styles.loading}>상세 정보를 불러오는 중...</div>;
  }

  // 데이터가 정말 없을 때 표시
  if (!store) {
    return <div className={styles.error}>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <Header title="맛집 상세" onBack={() => navigate(-1)} />
        <div className={styles.headerActions}>
          <button className={styles.iconButton} onClick={() => {}}>
            <FiShare2 size={20} />
          </button>
          <button className={styles.iconButton} onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <FaHeart size={20} color="red" /> : <FiHeart size={20} />}
          </button>
        </div>
      </div>

      <main className={styles.container}>
        <section
          className={styles.hero}
          style={{ backgroundImage: `url(${store.imageUrl})` }}
        >
          <div className={styles.heroOverlay} />
          <div className={styles.heroTitleWrap}>
            <div className={styles.tagContainer}>
              <span className={styles.ratingTag}>
                <FaStar size={12} /> {store.rating}
              </span>
              <span className={styles.tag}>{store.location}</span>
              <span className={styles.tag}>{store.category}</span>
            </div>
            <h1 className={styles.storeName}>{store.name}</h1>
          </div>
        </section>

        <StoreInfoCard
          address={store.address}
          contact={store.contact}
          hours={Array.isArray(store.hours) ? store.hours[0] : store.hours}
        />

        <StoreMap latitude={store.latitude} longitude={store.longitude} />
      </main>
      <BottomNavigation />
    </div>
  );
}