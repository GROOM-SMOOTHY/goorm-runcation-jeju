import styles from "@/components/pages/SignUp/SignUpInput/SignUpInput.module.css";

interface SignUpInputProps {
  type: "name" | "phone";
}
export default function SignUpInput({ type }: SignUpInputProps) {
  const config = {
    name: {
      label: "이름",
      placeholder: "성함을 입력해주세요",
      inputType: "text",
    },
    phone: {
      label: "연락처",
      placeholder: "010-1234-1234",
      inputType: "text",
    },
  };
  const { label, placeholder, inputType } = config[type];

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <input
          className={styles.input}
          type={inputType}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
