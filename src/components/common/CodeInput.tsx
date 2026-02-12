import * as React from "react";
import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";
import style from "@/components/common/CodeInput.module.css";

export default function CodeInput() {
  // const OTP_LENGTH = 6;
  // const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // // const handleChange = (index: number, value: string) => {
  // //   if (value.length > 0 && index < OTP_LENGTH - 1) {
  // //     inputRefs.current[index + 1]?.focus();
  // //   }
  // // };

  // // const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
  // //   if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
  // //     inputRefs.current[index - 1]?.focus();
  // //   }
  // // };

  return (
    <div className={style.OTPcontener}>
      <div className={style.labelContener}>
        <label className={style.label}>인증 코드</label>
      </div>
      
      <form onSubmit={(e) => e.preventDefault()} >
        <OneTimePasswordField.Root name="otp" className={style.OTPGroup}>
          {[...Array(6)].map((_, i) => (
            <OneTimePasswordField.Input 
              key={i}
              className={style.OTPInput}
              maxLength={1}
            />
          ))}
          <OneTimePasswordField.HiddenInput />
        </OneTimePasswordField.Root>
      </form>
    </div>
  );
}
