import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";
import style from "@/components/common/CodeInput.module.css";

export default function CodeInput() {
  const OTP_LENGTH = 6;

  return (
    <div className={style.OTPcontener}>
      <div className={style.labelContener}>
        <label className={style.label}>인증코드</label>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <OneTimePasswordField.Root
          name="otp"
          className={style.OTPGroup}
          autoComplete="one-time-code"
        >
          {[...Array(OTP_LENGTH)].map((_, i) => (
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
