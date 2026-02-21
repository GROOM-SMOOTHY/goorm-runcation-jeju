import styles from "@/pages/StartPage/StartPage.module.css";
import "@/styles/reset.css";
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={`${styles.logo} font-plus-jakarta-sans`} data-content="SMOOTHY">SMOOTHY</p>
      </div>

      <div className={styles.bottom}>
        <div className={styles.desc}>
          <p>
            함께해서 더 즐거운 제주, <br />
            우리의 기록은
            <span className={`${styles.highlight} font-plus-jakarta-sans`}>
              {" "}
              SMOOTHY
            </span>
          </p>
          <p>워케이션의 새로운 기준을 경험해보세요</p>
        </div>
        <div className={styles.box}>
          <Link to="/register" className={styles.authButton}>
            회원가입
          </Link>
          <Link to="/login" className={styles.authButton}>
            로그인
          </Link>
        </div>
        <p className={styles.foot}>POWERED BY JEJU WORKATION ALLIANCE</p>
      </div>
    </div>
  );
}
