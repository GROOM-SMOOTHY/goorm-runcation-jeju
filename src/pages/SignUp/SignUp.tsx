import styles from "@/pages/SignUp/SignUp.module.css";
import SignUpInput from "@/components/pages/SignUp/SignUpInput/SignUpInput";
import SignUpEmailVerification from "@/components/pages/SignUp/SignUpEmailVerification/SignUpEmailVerification";
import Button from "@/components/common/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  const onClick = () => {
    if (!isVerified) {
      return alert("인증 먼저 하셈");
    } else if (!isAgreed) {
      return alert("서비스 이용약관에 동의하지 않으셨습니다.");
    } else {
      alert("회원가입 되셨습니다.");
      navigate("/main");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.up}>
          <img src="/src/assets/LoginLogo.png" className={styles.logo} />
          <p className={styles.logoName}>SMOOTHY</p>
        </div>
        <div className={styles.down}>
          <p className={styles.title}>제주에서의 새로운 시작</p>
          <p className={styles.desc}>SMOOTHY와 함께하는 스마트한 런케이션</p>
        </div>
      </div>

      <div className={styles.main}>
        <SignUpInput
          type="name"
          value={name}
          onChange={(val) => setName(val)}
        />
        <SignUpInput
          type="phone"
          value={phone}
          onChange={(val) => setPhone(val)}
        />
        <SignUpEmailVerification
          email={email}
          input={code}
          onChangeEmail={setEmail}
          onChangeCode={setCode}
          onVerified={() => setIsVerified(true)}
        />
        <label className={styles.checkBox}>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <span>서비스 이용약관 및 개인정보 처리방침에 동의합니다.</span>
        </label>
      </div>
      <div className={styles.footer}>
        <Button variant="primary" type="button" onClick={onClick}>
          시작하기{" "}
        </Button>
        <p className={styles.front}>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className={styles.login}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
