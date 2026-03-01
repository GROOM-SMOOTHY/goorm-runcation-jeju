import React from "react";
import styles from "@/pages/LoadingPage/LoadingPage.module.css";
import orangeImg from "@/assets/orange.png"

const LoadingPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}>
      <img src={orangeImg} className={styles.centerImage} alt="loading" />
      </div>

      <div className={styles.title}>
        제주로 떠나는 중...
      </div>
      <div className={styles.subtitle}>
        SMOOTHY가<br/>당신의 런케이션을 준비하고 있어요
      </div> 
    </div>
  );
};

export default LoadingPage;