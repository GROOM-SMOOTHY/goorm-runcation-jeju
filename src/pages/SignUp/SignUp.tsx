import styles from "@/pages/SignUp/SignUp.module.css";
import SignUpInput from "@/components/pages/SignUp/SignUpInput/SignUpInput";
import useSignUp from "@/pages/SignUp/hooks/useSignUp";
import Button from "@/components/common/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import { supabase } from "@/lib/supabase";

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
    isAgreed,
    setIsAgreed,
    isLoading,
    setIsLoading,
  } = useSignUp();

  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const handleEmailVerification = async () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      addToast("이름을 먼저 입력해주세요", "", "warning");
      return;
    }

    if (!phone.trim()) {
      addToast("전화번호를 먼저 입력해주세요", "", "warning");
      return;
    }

    if (!validEmail.test(email)) {
      addToast("이메일 형식이 올바르지 않습니다", "", "warning");
      return;
    }

    if (!password) {
      addToast("비밀번호를 먼저 입력해주세요", "", "warning");
      return;
    }

    if (!isAgreed) {
      addToast("약관에 동의해주세요", "", "warning");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      addToast(error.message, "", "error");
      setIsLoading(false);
      return;
    }

    addToast("인증코드를 이메일로 전송했습니다", "", "success");
    setIsLoading(false);

    navigate("/authentication", {
      state: { email, name, phone, password },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.up}>
          <img src="/images/LoginLogo.webp" className={styles.logo} />
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
        <SignUpInput type="password" value={password} onChange={setPassword} />
        <SignUpInput type="email" value={email} onChange={setEmail} />

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
        <Button
          type="button"
          onClick={handleEmailVerification}
          loading={isLoading}
        >
          인증하고 회원가입
        </Button>

        <p className={styles.front}>
          이미 계정이 있으신가요?
          <Link to="/login" className={styles.login}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
