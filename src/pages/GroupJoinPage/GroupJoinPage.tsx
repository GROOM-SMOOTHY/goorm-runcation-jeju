import Header from "@/components/layout/Header/Header";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import CodeInput from "@/components/common/CodeInput/CodeInput";
import { IoIosInformationCircleOutline } from "react-icons/io";
import InputCodeLogo from "@/assets/input-code-logo.png";
import Button from "@/components/common/Button/Button";
import useGroupJoin, { CODE_LENGTH } from "./hooks/useGroupJoin";

export default function GroupJoinPage() {
  const navigate = useNavigate();
  const { code, setCode, isSubmitting, handleJoin } = useGroupJoin();

  return (
    <>
      <Header title="그룹 참여하기" onBack={() => navigate(-1)} />
      <div className={styles.container}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>인증코드 입력</h1>
          <p className={styles.description}>
            참여할 그룹의 {CODE_LENGTH}자리 인증코드를 입력해주세요
          </p>
        </div>
        <CodeInput
          value={code}
          onChange={setCode}
          onComplete={setCode}
          length={CODE_LENGTH}
        />
        <div className={styles.info}>
          <IoIosInformationCircleOutline
            color="var(--brand-primary)"
            size={18}
          />
          <span className={styles.infoText}>
            그룹장에게 받은 코드를 입력하세요.
          </span>
        </div>
        <img
          src={InputCodeLogo}
          alt="input-code-logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.buttonWrap}>
        <Button
          type="button"
          onClick={handleJoin}
          disabled={code.trim().length !== CODE_LENGTH}
          loading={isSubmitting}
        >
          그룹 참여하기
        </Button>
      </div>
    </>
  );
}
