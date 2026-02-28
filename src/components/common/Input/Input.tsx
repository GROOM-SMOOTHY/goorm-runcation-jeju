import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Form } from "radix-ui";
import styles from "@/components/common/Input/Input.module.css";

interface InputProps {
  label?: string;
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
  const [isRequested, setIsRequested] = useState(false);
  const [timeLeft, setTimeLeft] = useState(authTimeout);

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

  // 인증 요청 핸들러
  const handleAuthRequest = useCallback(() => {
    setIsRequested(true);
    setTimeLeft(authTimeout);
    onAuthRequest?.();
  }, [authTimeout, onAuthRequest]);

  // 시간 포맷팅 (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const phoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) {
      return numbers.replace(/(\d{3})(\d+)/, "$1-$2");
    }

    return numbers.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
  };

  return (
    <Form.Root className={styles.Root}>
      <Form.Field className={styles.Field} name={name}>
        {label && (
          <div className={styles.LabelWrapper}>
            <Form.Label className={styles.Label}>{label}</Form.Label>
          </div>
        )}

        {variant === "auth" ? (
          <div className={styles.AuthContainer}>
            <Form.Control asChild>
              <input
                className={styles.Input}
                type={type}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                required={required}
                placeholder={placeholder}
              />
            </Form.Control>

            <Form.Message className={styles.Message} match="valueMissing">
              {label}을 입력해주세요
            </Form.Message>
            {type === "email" && (
              <Form.Message className={styles.Message} match="typeMismatch">
                {label}을 올바르게 작성해주세요
              </Form.Message>
            )}

            {/* 인증 요청 텍스트 버튼 */}
            {!isRequested ? (
              <div
                className={styles.AuthRequestText}
                onClick={handleAuthRequest}
              >
                인증요청
              </div>
            ) : (
              <div className={styles.AuthTimerContainer}>
                <span
                  className={styles.AuthRetryText}
                  onClick={handleAuthRequest}
                >
                  인증요청 다시보내기
                </span>
                <span className={styles.TimerText}>{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        ) : (
          <Form.Control asChild>
            <input
              className={styles.Input}
              type={type}
              value={value}
              onChange={(e) => {
                const inputValue = e.target.value;

                if (type === "tel") {
                  onChange?.(phoneNumber(inputValue));
                } else {
                  onChange?.(inputValue);
                }
              }}
              required={required}
              placeholder={placeholder}
            />
          </Form.Control>
        )}
      </Form.Field>
    </Form.Root>
  );
};

export default Input;
