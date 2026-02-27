import styles from "@/pages/SignUp/SignUp.module.css";
import SignUpInput from "@/components/pages/SignUp/SignUpInput/SignUpInput";
import SignUpEmailVerification from "@/components/pages/SignUp/SignUpEmailVerification/SignUpEmailVerification";
import { Link } from "react-router-dom";
import useSignUp from "@/pages/SignUp/hooks/useSignUp";
import Button from "@/components/common/Button/Button";

export default function SignUp() {
  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    isAgreed,
    setIsAgreed,
    isLoading,
    handleSignUp,
    handleVerified,
  } = useSignUp();

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
        <SignUpInput type="name" value={name} onChange={setName} />
        <SignUpInput type="phone" value={phone} onChange={setPhone} />

        <SignUpEmailVerification
          email={email}
          input={code}
          onChangeEmail={setEmail}
          onChangeCode={setCode}
          onVerified={handleVerified}
        />

        <SignUpInput type="password" value={password} onChange={setPassword} />

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
        <Button type="button" onClick={handleSignUp} disabled={isLoading}>
          {isLoading ? "처리중" : "시작하기"}
        </Button>

        <p className={styles.front}>
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className={styles.login}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
