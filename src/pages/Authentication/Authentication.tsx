import styles from "@/pages/Authentication/Authentication.module.css";
import LoginIcon from "@/assets/LoginPageIcon.webp";
import Header from "@/components/layout/Header/Header";
import Button from "@/components/common/Button/Button";
import CodeInput from "@/components/common/CodeInput/CodeInput";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { createUser } from "@/services/userService";
import { useToastStore } from "@/components/common/Toast/ToastStore";

export default function Authentication() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, name, phone, password } = location.state;

  const [code, setCode] = useState("");

  const addToast = useToastStore((state) => state.addToast);

  const handleVerify = async () => {
    if (code.length !== 8) {
      addToast("8자리 인증코드를 입력해주세요", "", "warning");
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
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

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      addToast("사용자 정보를 가져올 수 없습니다", "", "error");
      return;
    }

    await createUser({
      userId: user.id,
      nickname: name,
      email,
      phone,
    });

    addToast("회원가입 완료", "", "success");

    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.container}>
      <Header title="인증코드" onBack={() => navigate(-1)} />

      <div className={styles.box}>
        <section className={styles.content}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <img src={LoginIcon} alt="" />
            </div>
            <h1>SMOOTHY</h1>
          </div>

          <p>제주에서의 특별한 런케이션, 스무디와 함께하세요</p>
        </section>

        <CodeInput value={code} onChange={setCode} length={8} />

        <Button type="button" onClick={handleVerify}>
          인증 완료
        </Button>
      </div>
    </div>
  );
}
