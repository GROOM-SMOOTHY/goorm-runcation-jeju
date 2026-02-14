import styles from "@/components/pages/SignUp/SignUpInput/SignUpInput.module.css";
export default function SignUpInput() {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label className={styles.label}>이름</label>
        <input className={styles.input} placeholder="성함을 입력해주세요" />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>연락처</label>
        <input className={styles.input} placeholder="010-1234-1234" />
      </div>

      <div className={styles.verify}>
        <div className={styles.row}>
          <div className={styles.first}>
            <label className={styles.label}>이메일</label>
            <input className={styles.input} placeholder="example@example.com" />
          </div>
          <button className={styles.button}>인증요청</button>
        </div>

        <div className={styles.second}>
          <label className={styles.label}>인증코드</label>
          <input className={styles.input} placeholder="6자리 번호 입력" />
        </div>
      </div>
    </div>
  );
}
