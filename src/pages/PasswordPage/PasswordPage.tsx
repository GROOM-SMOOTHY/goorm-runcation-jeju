import styles from "@/pages/PasswordPage/PasswordPage.module.css";
import Header from "@/components/layout/Header/Header";
import LoginIcon from "@/assets/LoginPageIcon.webp";
import ButtonNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import { supabase } from "@/lib/supabase";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addToast = useToastStore((state) => state.addToast);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      addToast("비밀번호를 입력해주세요", "", "warning");
      return;
    }

    if (password !== confirmPassword) {
      addToast("비밀번호가 일치하지 않습니다", "", "warning");
      return;
    }

    if (password.length < 6) {
      addToast("비밀번호는 최소 6자 이상이어야 합니다", "", "warning");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      addToast("비밀번호 변경 실패", "", "error");
      return;
    }

    addToast("비밀번호가 변경되었습니다", "", "success");
    navigate(-1);
  };
  return (
    <div className={styles.container}>
      <Header title="비밀번호 변경" onBack={() => navigate(-1)} />

      <div className={styles.box}>
        <section className={styles.content}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <img src={LoginIcon} alt="" />
            </div>
            <h1>SMOOTHY</h1>
          </div>

          <div className={styles.input}>
            <Input
              name="password"
              label="새 비밀번호"
              type="password"
              placeholder="새 비밀번호"
              value={password}
              onChange={setPassword}
            />

            <Input
              name="confirmPassword"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>

          <Button
            type="button"
            variant="default"
            onClick={handleChangePassword}
          >
            비밀번호 변경
          </Button>
        </section>
      </div>

      <ButtonNavigation />
    </div>
  );
}
