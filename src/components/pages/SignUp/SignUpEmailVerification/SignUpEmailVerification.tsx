import styles from "@/components/pages/SignUp/SignUpEmailVerification/SignUpEmailVerification.module.css";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToastStore } from "@/components/common/Toast/ToastStore";

interface SignUpEmailVerificationProps {
  email: string;
  input: string;
  password: string;
  name: string;
  phone: string;
  onChangeEmail: (value: string) => void;
  onChangeCode: (value: string) => void;
  onVerified: () => void;
}

export default function SignUpEmailVerification({
  email,
  input,
  password,
  name,
  phone,
  onChangeEmail,
  onChangeCode,
  onVerified,
}: SignUpEmailVerificationProps) {
  const [show, setShow] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const addToast = useToastStore((state) => state.addToast);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onClickButton = async () => {
    if (!validEmail.test(email)) {
      addToast("이메일 형식이 올바르지 않습니다", "", "warning");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      addToast(error.message, "", "error");
      return;
    }

    setShow(true);
    addToast("인증코드를 이메일로 전송했습니다", "", "success");
  };

  const onClickVerify = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: input,
      type: "email",
    });

    if (error) {
      addToast("인증코드가 올바르지 않습니다", "", "error");
      return;
    }

    const { error: pwError } = await supabase.auth.updateUser({
      password,
    });

    if (pwError) {
      addToast(`비밀번호 설정 실패: ${pwError.message}`, "", "error");
      return;
    }

    setIsVerified(true);
    onVerified();
    addToast("인증이 완료되었습니다", "", "success");
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
            onChange={(e) => onChangeEmail(e.target.value)}
            disabled={
              isVerified ||
              !name.trim() ||
              !phone.trim() ||
              password.length < 8 ||
              !/[A-Z]/.test(password) ||
              !/[a-z]/.test(password) ||
              !/\d/.test(password)
            }
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
            placeholder="8자리 번호 입력"
            value={input}
            onChange={(e) => onChangeCode(e.target.value)}
            disabled={isVerified}
          />
        </div>

        <button
          className={styles.button}
          onClick={onClickVerify}
          disabled={!show || isVerified || input.length !== 8}
        >
          확인
        </button>
      </div>
    </div>
  );
}
