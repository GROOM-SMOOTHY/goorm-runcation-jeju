import { useState, useRef } from "react";
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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 입력 값 변경 핸들러
  const handleChange = (index: number, inputValue: string) => {
    const valueArray = value.split("");

    valueArray[index] = inputValue;
    const newValue = valueArray.join("");

    setValue(newValue);
    onChange?.(newValue);

    // 자동으로 다음 input으로 포커스 이동
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // 모두 입력되면 완료 콜백
    if (newValue.length === length) {
      onComplete?.(newValue);
    }
  };

  // 백스페이스 핸들러
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className={style.OTPcontener}>
      <div className={style.labelContener}>
        <label className={style.label}>인증코드</label>
      </div>

      <div className={style.OTPGroup}>
        {[...Array(length)].map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={style.OTPInput}
            maxLength={1}
          />
        ))}  
        </div>
    </div>
  );
}