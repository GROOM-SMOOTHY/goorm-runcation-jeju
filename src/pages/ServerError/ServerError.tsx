import styles from "@/pages/ServerError/ServerError.module.css";
import Button from "@/components/common/Button/Button";
import { useNavigate } from "react-router-dom";

export default function ServerError() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.desc}>
          <h3>길을 잃으셨나요?</h3>
          <p>제주 날씨가 잠시 변덕을 부렸어요</p>
          <p>서버에 문제가 발생했습니다</p>
        </div>
        <Button
          type="button"
          variant="primary"
          onClick={() => navigate("/main")}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
