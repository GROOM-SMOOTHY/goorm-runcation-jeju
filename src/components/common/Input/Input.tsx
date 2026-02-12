import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Form } from "radix-ui";
import styles from "@/components/common/Input/Input.module.css";

interface InputProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  variant?: "default" | "auth";
  onAuthRequest?: () => void;
  required?: boolean;
  authTimeout?: number; // 초 단위 (기본값: 120초)
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value = "",
  onChange,
  type = "text",
  placeholder = "",
  variant = "default",
  onAuthRequest,
  required = false,
  authTimeout = 120,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isRequested, setIsRequested] = useState(false);
  const [timeLeft, setTimeLeft] = useState(authTimeout);

  // 외부 value 변경 시 내부 상태 동기화
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // 타이머 로직
  useEffect(() => {
    if (!isRequested || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev - 1 <= 0) {
          setIsRequested(false);
          return authTimeout;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRequested, timeLeft, authTimeout]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  const handleAuthRequest = useCallback(() => {
    setIsRequested(true);
    setTimeLeft(authTimeout);
    onAuthRequest?.();
  }, [authTimeout, onAuthRequest]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Form.Root className={styles.Root}>
      <Form.Field name={name} className={styles.Field}>
        <div className={styles.LabelWrapper}>
          <Form.Label className={styles.Label}>{label}</Form.Label>
        </div>

        <Form.Control asChild>
          <input
            className={styles.Input}
            type={type}
            value={internalValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            required={required}
          />
        </Form.Control>

        {/* 유효성 메시지 */}
        <Form.Message className={styles.Message} match="valueMissing">
          {label}을 입력해주세요
        </Form.Message>
        {type === "email" && (
          <Form.Message className={styles.Message} match="typeMismatch">
            올바른 이메일 형식으로 입력해주세요
          </Form.Message>
        )}

        {/* 인증 요청 variant */}
        {variant === "auth" && (
          <div className={styles.AuthContainer}>
            {!isRequested ? (
              <button
                type="button"
                className={styles.AuthRequestText}
                onClick={handleAuthRequest}
              >
                인증요청
              </button>
            ) : (
              <div className={styles.AuthTimerContainer}>
                <button
                  type="button"
                  className={styles.AuthRetryText}
                  onClick={handleAuthRequest}
                >
                  인증요청 다시보내기
                </button>
                <span className={styles.TimerText}>{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        )}
      </Form.Field>
    </Form.Root>
  );
};

export default Input;
