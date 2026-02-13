import { useState } from "react";
import * as OneTimePasswordField from "@radix-ui/react-one-time-password-field";
import style from "@/components/common/CodeInput.module.css";

interface CodeInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
}

export default function CodeInput({
  value: initialValue = "",
  onChange,
  onComplete,
  length = 6,
}: CodeInputProps) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
    if (newValue.length === length) {
      onComplete?.(newValue);
    }
  };

  return (
    <div className={style.OTPcontener}>
      <div className={style.labelContener}>
        <label className={style.label}>인증코드</label>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <OneTimePasswordField.Root
          name="otp"
          value={value}
          onValueChange={handleValueChange}
          className={style.OTPGroup}
          autoComplete="one-time-code"
        >
          {[...Array(length)].map((_, i) => (
            <OneTimePasswordField.Input
              key={i}
              className={style.OTPInput}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
          <OneTimePasswordField.HiddenInput />
        </OneTimePasswordField.Root>
      </form>
    </div>
  );
}
