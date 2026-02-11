import styles from "./TravelPage.module.css";
import TopNav from "@/components/layout/TopNavigation";
import orange from "@/assets/icons/commen_Icons/orange.png";
import { useNavigate } from "react-router-dom";



export default function TravelPage() {
  const navigate = useNavigate();

  return (
      <div className={styles.container}>

        {/* 상단 배경 카드 */}
        <div className={styles.heroCard}>
          <TopNav
            onBack={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
            backTextColor="#b39e9e"
            rightElement={<img src={orange} width={50} height={50} alt="메뉴" />}
          />
          <div className={styles.heroContent}>
            <p className={styles.subtitle}>현재 위치 추천 맛집</p>
            <h1 className={styles.title}>우진해장국</h1>
            <button className={styles.detailBtn}>자세히 보기 →</button>
          </div>
        </div>

        {/* 카드 섹션 */}
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.orange}`}> 
            <img src="@\assets\icons\commen_Icons\travel.png" alt="여행" />
            <p>지역별<br />맛집 탐방</p>
          </div>

          <div className={`${styles.card} ${styles.blue}`}> 
            <div className={styles.weatherBox}>
              <span>제주도 서귀포</span>
              <strong>20°</strong>
              <img src="/icons/cloud.png" alt="날씨" />
            </div>
          </div>

          <div className={`${styles.card} ${styles.green}`}> 
            <img src="/icons/money.png" alt="정산" />
            <p>정산하기</p>
          </div>
        </div>

        {/* 하단 리스트 */}
        <div className={styles.bottomSection}>
          <div className={styles.sectionHeader}>
            <h2>방명록</h2>
            <button>더보기 →</button>
          </div>

          <div className={styles.listGrid}>
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className={styles.listCard}>
                <p className={styles.listTitle}>00우님</p>
                <p className={styles.listDesc}>런케이션 진행하면서 너무 유용하게 잘썼어요!런케이션 진행하면서 너무 유용하게 잘썼어요!런케이션 진행하면서 너무 유용하게 잘썼어요!런케이션 진행하면서 너무 유용하게 잘썼어요!</p>
              </div>
            ))}
          </div>
        </div>
      </div>

  );
}
