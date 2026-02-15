import styles from "@/components/pages/SignUp/SignUpEmailVerification/SignUpEmailVerification.module.css";
import { useState } from "react";

export default function SignUpInput() {
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const MOCK_DATA = "123456";

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = validEmail.test(email);

  const onClickButton = () => {
    if (!isValidEmail) {
      return alert("이메일 형식이 유효하지 않습니다.");
    }
    setShow(true);
    alert("인증코드가 전송되었습니다.");
  };
  const onClickVerify = () => {
    if (input === MOCK_DATA) {
      setIsVerified(true);
      return alert("인증 성공");
    }
    alert("인증코드가 올바르지 않습니다.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>이메일</label>
          <input
            className={styles.input}
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isVerified}
          />
        </div>
        <button
          className={styles.button}
          onClick={onClickButton}
          disabled={isVerified}
        >
          인증요청
        </button>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>인증코드</label>
          <input
            className={styles.input}
            placeholder="6자리 번호 입력"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          className={styles.button}
          onClick={onClickVerify}
          disabled={!show}
        >
          확인
        </button>
      </div>
    </div>
  );
}
