import styles from "@/pages/Login/Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}></div>
      <div className={styles.header}>
        <img />
        <h1>SMOOTHY</h1>
        <p>제주에서의 특별한 런케이션, 스무디와 함께하세요. </p>
      </div>
      <div className={styles.input}></div>
      <div className={styles.code}></div>
      <div className={styles.footer}>
        <p>
          아직 회원이 아니신가요? <span>로그인</span>
        </p>
      </div>
    </div>
  );
}
