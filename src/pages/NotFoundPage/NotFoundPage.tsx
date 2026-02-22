import styles from "@/pages/NotFoundPage/NotFoundPage.module.css";
import Button from "@/components/common/Button/Button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.desc}>
          <h3>길을 잃으셨나요?</h3>
          <p>요청하신 페이지를 찾을 수 없습니다.</p>
          <p>제주바람에 페이지가 날아갔나 봐요</p>
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
