import { supabase } from "@/lib/supabase";
import { authErrorMessages, type AuthErrorCode } from "@/utils/authError";

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: password.trim(),
  });

  if (error) {
    throw new Error(
      authErrorMessages[error.code as AuthErrorCode] ||
        "오류가 발생했습니다. 관리자에게 문의하세요.",
    );
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  });

  if (error) {
    throw new Error(
      authErrorMessages[error.code as AuthErrorCode] ||
        "오류가 발생했습니다. 관리자에게 문의하세요.",
    );
  }

  return data;
}
