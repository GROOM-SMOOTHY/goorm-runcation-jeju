import styles from "@/components/pages/SignUp/SignUpInput/SignUpInput.module.css";

const INPUT_CONFIG = {
  name: {
    label: "이름",
    placeholder: "성함을 입력해주세요",
    inputType: "text",
  },
  phone: {
    label: "연락처",
    placeholder: "010-1234-1234",
    inputType: "tel",
  },
} as const;

interface SignUpInputProps {
  type: keyof typeof INPUT_CONFIG;
}

export default function SignUpInput({ type }: SignUpInputProps) {
  const { label, placeholder, inputType } = INPUT_CONFIG[type];
  const inputId = `signup-${type}`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.input}
        type={inputType}
        placeholder={placeholder}
      />
    </div>
  );
}
