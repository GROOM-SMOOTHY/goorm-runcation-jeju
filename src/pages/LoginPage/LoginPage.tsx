import styles from "@/pages/LoginPage/LoginPage.module.css";
import LoginIcon from "@/assets/LoginPageIcon.png";
import Header from "@/components/layout/Header/Header";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import useLogin from "./hooks/useLogin";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    goToSignUp,
  } = useLogin();

  return (
    <div className={styles.container}>
      <Header title="로그인" />
      <div className={styles.box}>
        <section className={styles.content} aria-label="로그인 안내">
          <div className={styles.header}>
            <div className={styles.icon}>
              <img src={LoginIcon} alt="" />
            </div>
            <h1>SMOOTHY</h1>
          </div>
          <p>제주에서의 특별한 런케이션, 스무디와 함께하세요</p>
        </section>

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

        {/* TODO: props loading으로 제어 */}
        <Button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          loading={isLoading}
        >
          로그인
        </Button>

        <div className={styles.footer}>
          <p>
            아직 회원이 아니신가요?{" "}
            <button
              type="button"
              className={styles.signUpLink}
              onClick={goToSignUp}
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
