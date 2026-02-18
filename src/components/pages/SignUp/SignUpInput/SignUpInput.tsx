import styles from "@/components/pages/SignUp/SignUpInput/SignUpInput.module.css";

interface SignUpInputProps {
  type: "name" | "phone";
  value: string;
  onChange: (value: string) => void;
}

const config = {
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

const phoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 3) return numbers;

  if (numbers.length <= 7) {
    return numbers.replace(/(\d{3})(\d+)/, "$1-$2");
  }
  return numbers.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
};

export default function SignUpInput({
  type,
  value,
  onChange,
}: SignUpInputProps) {
  const { label, placeholder, inputType } = config[type];

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === "phone") {
      const numbers = inputValue.replace(/\D/g, "");

      if (numbers.length > 11) return;

      onChange(phoneNumber(inputValue));
      return;
    }

    onChange(inputValue);
  };

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={inputType}
        value={value}
        onChange={onNumberChange}
        placeholder={placeholder}
      />
    </div>
  );
}
