import * as React from "react";
import { Toast } from "radix-ui";
import styles from "@/components/common/Toast/Toast.module.css";
import { useToastStore } from "@/components/common/Toast/ToastStore";
import type { ToastItem } from "@/components/common/Toast/ToastStore";
import { FaTimes, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import type { JSX } from "react";

// 타입별 아이콘
const ToastIcon: Record<ToastItem["type"], JSX.Element> = {
  success: <FaCheckCircle className={styles.Icon} />,
  error: <FaTimesCircle className={styles.Icon} />,
  warning: <FaExclamationTriangle className={styles.Icon} />,
  info: <FaInfoCircle className={styles.Icon} />,
};

// 자동 닫힘 시간 (5초)
const AUTO_CLOSE_MS = 5000;

const AnimatedToast: React.FC = () => {
  // 전역상태 토스트와 제거 함수 가져오기
  const { toasts, removeToast } = useToastStore();

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <ToastItemComponent key={toast.id} toast={toast} removeToast={removeToast} />
      ))}

      <Toast.Viewport className={styles.Viewport} />
    </Toast.Provider>
  );
};

// ToastItemComponent가 받을 props 정의
interface ToastItemProps {
  toast: ToastItem;
  removeToast: (id: string) => void;
}

const ToastItemComponent: React.FC<ToastItemProps> = ({ toast, removeToast }) => {
  // 브라우저와 Node 환경 모두 호환되도록 타입 지정
  const [open, setOpen] = React.useState(true);
  const timerRef = React.useRef<NodeJS.Timeout | number | null>(null);

  React.useEffect(() => {
    // setTimeout 반환값을 ref에 저장
    timerRef.current = window.setTimeout(() => setOpen(false), AUTO_CLOSE_MS);

    return () => {
      // clearTimeout에 맞는 타입으로 변환
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current as number);
      }
      removeToast(toast.id);
    };
  }, [toast.id, removeToast]);

  return (
    <Toast.Root
      // 클래스 적용: Root + show + 타입별 색상
      className={`${styles.Root} ${styles.show} ${styles[toast.type]}`}
      open={open} // 로컬 open 상태 사용 → exit 애니메이션 실행
      onOpenChange={(isOpen) => {
        // Toast가 닫히면 스토어에서 제거
        if (!isOpen) removeToast(toast.id);
      }}
    >
      <div className={styles.Content}>
        {ToastIcon[toast.type]}
        <div className={styles.Text}>
          <Toast.Title className={styles.Title}>{toast.title}</Toast.Title>
        </div>
        <Toast.Action className={styles.Action} asChild altText="닫기">
          {/* 클릭 시 Toast 닫기 */}
          <button
            className={`${styles.Button} small`}
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
        </Toast.Action>
      </div>
    </Toast.Root>
  );
};
export default AnimatedToast;
