import { useNavigate } from "react-router-dom";
import TopNav from "@/components/layout/TopNavigation";
import orange from "@/assets/icons/commen_Icons/orange.png";
import styles from "@/pages/HomePage.module.css";
import type { FC } from "react";
import mapIcon from "@/assets/icons/commen_Icons/image 17.png";
import taxiIcon from "@/assets/icons/commen_Icons/Group 230.png";

// 뒤로가기
const HomePage: FC = () => {
  const navigate = useNavigate();
  
  const cohortName: string = "프론트엔드 7기"; // 나중에 로그인 데이터로 교체

  return (
    <main className={styles.container}>

      <TopNav
        onBack={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
        backTextColor="#ffffff"
        rightElement={<img src={orange} width={50} height={50} alt="메뉴" />}
      />

      <div className={styles.hero}>
        <p className={styles.subtitle}>어디로 놀러갈까?</p>
        <h1 className={styles.title}>{cohortName}</h1>

        <div className={styles.cards}>
          <button
            className={styles.card}
            onClick={() => navigate("/stamp")}
          >
            <div className={styles.icon}>
              <img src={mapIcon} alt="지역명소" />
            </div>
            <p className={styles.cardText}>
              지역명소<br />도장깨기
            </p>
          </button>

          

          <button
            className={styles.cardHighlight}
            onClick={() => navigate("/travel")}
          >
            <p className={styles.cardText}>여행출발!</p>
            <div className={styles.icon}>
              <img src={taxiIcon} alt="여행출발" />
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
