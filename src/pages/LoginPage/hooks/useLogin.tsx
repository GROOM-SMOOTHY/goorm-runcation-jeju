import { signIn as authSignIn } from "@/services/authService";
import { getUserGroup } from "@/services/groupMembersService";
import { getUserById, type UsersRow } from "@/services/userService";
import { useGroup } from "@/store/useGroup";
import { useUser, type UserState } from "@/store/useUser";
import { LOGIN_VALIDATION, validateLoginForm } from "@/utils/validate";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "@/components/common/Toast/ToastStore";

function userRowToState(row: UsersRow, fallbackEmail: string): UserState {
  return {
    id: row.id,
    data: {
      email: row.email ?? fallbackEmail,
      nickname: row.nickname ?? "",
      phone: row.phone ?? "",
      profile: row.profile ?? null,
      created_at: new Date(row.created_at),
    },
  } as UserState;
}

export default function useLogin() {
  const navigate = useNavigate();
  const setGroup = useGroup((s) => s.setGroup);
  const setUser = useUser((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addToast = useToastStore((state) => state.addToast);

  const handleLogin = useCallback(async () => {
    const error = validateLoginForm(email, password);
    if (error) {
      addToast(error, "", "warning");
      return;
    }

    setIsLoading(true);
    try {
      const authData = await authSignIn(email, password);
      const authUserId = authData.user?.id;
      if (!authUserId) {
        addToast(LOGIN_VALIDATION.USER_NOT_FOUND, "", "warning");
        return;
      }

      const userRow = await getUserById(authUserId);
      if (!userRow) {
        addToast(LOGIN_VALIDATION.USER_NOT_FOUND, "", "warning");
        return;
      }

      const userGroup = await getUserGroup(authUserId);
      if (!userGroup) {
        addToast(LOGIN_VALIDATION.USER_NOT_FOUND, "", "warning");
        return;
      }

      setUser(userRowToState(userRow, email));

      if (userGroup.length !== 0 && userGroup[0] && userGroup[0].groups) {
        setGroup(userGroup[0].groups);
        navigate("/main");
        return;
      }

      navigate("/group");
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : "로그인에 실패했습니다.",
        "",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  }, [email, password, setUser, navigate]);

  const goToSignUp = useCallback(() => navigate("/register"), [navigate]);

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
