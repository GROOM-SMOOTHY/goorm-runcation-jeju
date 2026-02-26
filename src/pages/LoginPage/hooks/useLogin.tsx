import { signIn as authSignIn } from "@/services/authService";
import { getUserById, type UsersRow } from "@/services/userService";
import { useUser, type UserState } from "@/store/useUser";
import { LOGIN_VALIDATION, validateLoginForm } from "@/utils/validate";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function userRowToState(row: UsersRow, fallbackEmail: string): UserState {
  return {
    id: row.id,
    data: {
      email: row.email ?? fallbackEmail,
      nickname: row.nickname ?? "",
      phone: row.phone ?? "",
      profile: row.profile ?? null,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    },
  } as UserState;
}

export default function useLogin() {
  const navigate = useNavigate();
  const setUser = useUser((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    const error = validateLoginForm(email, password);
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);
    try {
      const authData = await authSignIn(email, password);
      const authUserId = authData.user?.id;
      if (!authUserId) {
        alert(LOGIN_VALIDATION.USER_NOT_FOUND);
        return;
      }

      const userRow = await getUserById(authUserId);
      if (!userRow) {
        alert(LOGIN_VALIDATION.USER_NOT_FOUND);
        return;
      }

      setUser(userRowToState(userRow, email));
      navigate("/main");
    } catch (err) {
      console.error("로그인 에러:", err);
      const message =
        err instanceof Error ? err.message : "로그인에 실패했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, setUser, navigate]);

  const goToSignUp = useCallback(() => navigate("/"), [navigate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    goToSignUp,
  };
}
