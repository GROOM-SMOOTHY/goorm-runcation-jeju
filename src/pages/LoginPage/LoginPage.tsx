import styles from "@/pages/LoginPage/LoginPage.module.css";
import LoginIcon from "@/assets/LoginPageIcon.png";
import Header from "@/components/layout/Header/Header";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      alert("올바른 이메일 형식을 입력해주세요");
      return;
    }
    if (!email.trim() || !password.trim()) {
      alert("이메일과 비밀번호 모두 입력해주세요");
      return;
    }
    alert("로그인 되었습니다.");
    return;
  };

  return (
    <div className={styles.container}>
      <Header title="로그인" />
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <img src={LoginIcon} alt="로그인 아이콘" />
            </div>
            <h1>SMOOTHY</h1>
          </div>
          <p>제주에서의 특별한 런케이션, 스무디와 함께하세요</p>
        </div>

        <div className={styles.input}>
          <Input
            label="이메일 주소"
            name="email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="이메일 주소를 입력해주세요"
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <Button type="button" variant="primary" onClick={handleLogin}>
          로그인
        </Button>
        <div className={styles.footer}>
          <p>
            아직 회원이 아니신가요? <span>회원가입</span>
          </p>
        </div>
      </div>
    </div>
  );
}
