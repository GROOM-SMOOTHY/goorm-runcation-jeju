import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiHeart, FiShare2 } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";

import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import StoreInfoCard from "@/components/pages/restaurant-store-page/StoreInfoCard/StoreInfoCard";
import StoreMap from "@/components/pages/restaurant-store-page/StoreMap/StoreMap";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import LoadingPage from "@/pages/LoadingPage/LoadingPage";
import { useRestaurantDetail } from "@/hooks/useRestaurantDetail";
import styles from "@/pages/RestaurantStorePage/RestaurantStorePage.module.css";

const STORAGE_KEY = "favorite_restaurants_ids";

export default function RestaurantStorePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const addToast = useToastStore((state) => state.addToast);

  // isLoaded를 추가로 가져옵니다.
  const { store, isLoading, isLoaded } = useRestaurantDetail(id);

  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && id) {
      const favoriteIds = JSON.parse(saved) as string[];
      return favoriteIds.includes(id);
    }
    return false;
  });

  const toggleLike = () => {
    if (!id) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    let favoriteIds: string[] = saved ? JSON.parse(saved) : [];

    if (isLiked) {
      favoriteIds = favoriteIds.filter((favId) => favId !== id);
      addToast("좋아요 목록에서 제거되었습니다.", "", "success");
    } else {
      if (!favoriteIds.includes(id)) favoriteIds.push(id);
      addToast("좋아요 목록에 추가되었습니다.", "", "success");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (!store) return;
    
    const shareData = {
      title: `[제주 맛집] ${store.name}`,
      text: `${store.name} - ${store.category}\n위치: ${store.location}`,
      url: window.location.href,
    };
  
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        addToast("주소가 클립보드에 복사되었습니다.", "친구에게 공유해보세요!", "success");
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        addToast("공유 중 오류가 발생했습니다.", "", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className={styles.fullOverlay}>
        <LoadingPage />
      </div>
    );
  }

  if (!store) {
    return (
      <div className={styles.page}>
        <Header title="정보 없음" onBack={() => navigate(-1)} />
        <div className={styles.container}>정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <Header title="맛집 상세" onBack={() => navigate(-1)} />
        <div className={styles.headerActions}>
          <button className={styles.iconButton} onClick={handleShare}>
            <FiShare2 size={20} />
          </button>
          <button className={styles.iconButton} onClick={toggleLike}>
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

        {/* 훅에서 받은 isLoaded를 StoreMap에 전달합니다 */}
        <StoreMap 
          latitude={store.latitude} 
          longitude={store.longitude} 
          isLoaded={isLoaded}
        />
      </main>
      <BottomNavigation />
    </div>
  );
}