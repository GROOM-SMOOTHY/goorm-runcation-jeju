import styles from "@/pages/MyPage/MyPageInput.module.css";

type InputType = "name" | "tel" | "bank" | "account" | "depositor";

interface InputTypeProps {
  type: InputType;
  value: string;
  onChange: (value: string) => void;
}

const INPUT_CONFIG = {
  name: { label: "이름", placeholder: "홍길동" },
  tel: { label: "연락처", placeholder: "010-1234-5678" },
  bank: { label: "은행명", placeholder: "카카오뱅크" },
  account: { label: "계좌번호", placeholder: "계좌번호를 입력해주세요" },
  depositor: { label: "예금주", placeholder: "예금주를 입력해주세요" },
} as const;

export default function MyPageInput({ type, value, onChange }: InputTypeProps) {
  const { label, placeholder } = INPUT_CONFIG[type];

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
