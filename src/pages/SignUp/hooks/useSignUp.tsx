import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "@/services/authService";
import { createUser } from "@/services/userService";
import { validatePassword } from "@/utils/validate";

export default function useSignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validationCheck = useCallback((): string | null => {
    if (!isVerified) {
      return "인증이 필요해요";
    }
    if (!isAgreed) {
      return "서비스 이용약관에 동의하지 않았어요";
    }
    if (!email || !name) {
      return "이메일/이름을 입력해주세요.";
    }
    if (!validatePassword(password)) {
      return "비밀번호는 8자 이상, 영문과 숫자를 포함해야 해요.";
    }
    return null;
  }, [isVerified, isAgreed, email, name, password]);

  const handleSignUp = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const validationError = validationCheck();
      if (validationError) {
        alert(validationError);
        return;
      }

      const signUpData = await signUp(email, password);
      const userId = signUpData?.user?.id;
      if (!userId) {
        throw new Error("회원 정보를 가져올 수 없습니다.");
      }
      await createUser({
        userId,
        nickname: name,
        email,
        phone,
      });

      alert("회원가입 완료");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "회원가입에 실패했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, validationCheck, email, password, name, phone, navigate]);

  const handleVerified = useCallback(() => setIsVerified(true), []);

  return {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    isAgreed,
    setIsAgreed,
    isLoading,
    handleSignUp,
    handleVerified,
  };
}
