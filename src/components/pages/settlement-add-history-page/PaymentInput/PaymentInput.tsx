import React from "react";
import styles from "./PaymentInput.module.css";

export interface PaymentInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
}

export default function PaymentInput({
  value,
  onChange,
  placeholder,
}: PaymentInputProps) {
  const formattedValue =
    value === null || value === 0 ? "" : value.toLocaleString("ko-KR");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");

    if (rawValue === "") {
      onChange(0);
      return;
    }

    const num = parseInt(rawValue, 10);
    if (!Number.isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.currency}>₩</span>
      <input
        type="text"
        inputMode="numeric"
        autoFocus
        value={formattedValue}
        placeholder={placeholder ?? "0"}
        onChange={handleChange}
        className={styles.input}
        aria-label="결제 금액"
      />
    </div>
  );
}
