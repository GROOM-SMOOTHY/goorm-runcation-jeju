import styles from "@/components/pages/SignUp/SignUpInput/SignUpInput.module.css";

interface SignUpInputProps {
  type: "name" | "phone" | "password";
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
  password: {
    label: "비밀번호",
    placeholder: "8자 이상, 영문+숫자 포함",
    inputType: "password",
  },
} as const;

const phoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return numbers.replace(/(\d{3})(\d+)/, "$1-$2");

  return numbers.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
};

const validatePassword = (password: string) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) && // 대문자
    /[a-z]/.test(password) && // 소문자
    /\d/.test(password) // 숫자
  );
};

export default function SignUpInput({
  type,
  value,
  onChange,
}: SignUpInputProps) {
  const { label, placeholder, inputType } = config[type];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === "phone") {
      const numbers = inputValue.replace(/\D/g, "");
      if (numbers.length > 11) return;
      onChange(phoneNumber(inputValue));
      return;
    }

    onChange(inputValue);
  };

  const isPasswordValid = type === "password" ? validatePassword(value) : true;

  return (
    <>
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>

        <input
          className={styles.input}
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>

      {type === "password" && value && !isPasswordValid && (
        <p className={styles.error}>
          비밀번호는 8자 이상, 대문자와 영문과 숫자를 포함해야 합니다.
        </p>
      )}
    </>
  );
}
