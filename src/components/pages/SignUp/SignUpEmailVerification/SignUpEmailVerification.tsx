import styles from "@/components/pages/SignUp/SignUpEmailVerification/SignUpEmailVerification.module.css";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface SignUpEmailVerificationProps {
  email: string;
  input: string;
  onChangeEmail: (value: string) => void;
  onChangeCode: (value: string) => void;
  onVerified: () => void;
}

export default function SignUpEmailVerification({
  email,
  input,
  onChangeEmail,
  onChangeCode,
  onVerified,
}: SignUpEmailVerificationProps) {
  const [show, setShow] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = validEmail.test(email);
  const codeNumber = input.length === 8;

  const onClickButton = async () => {
    if (!isValidEmail) {
      alert("이메일 형식이 유효하지 않습니다");
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) {
      alert(error.message);
      return;
    }
    setShow(true);
    alert("인증코드가 전송되었습니다");
  };

  const onClickVerify = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: input,
      type: "email",
    });
    if (error) {
      alert("인증코드가 올바르지 않습니다");
      return;
    }
    setIsVerified(true);
    onVerified();
    alert("인증 성공");
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
            placeholder="8자리 번호 입력"
            value={input}
            onChange={(e) => onChangeCode(e.target.value)}
            disabled={isVerified}
          />
        </div>
        <button
          className={styles.button}
          onClick={onClickVerify}
          disabled={!show || isVerified || !codeNumber}
        >
          확인
        </button>
      </div>
    </div>
  );
}
