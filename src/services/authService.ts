import { supabase } from "@/lib/supabase";
import { authErrorMessages, type AuthErrorCode } from "@/utils/authError";
import { AuthError, createClient } from "@supabase/supabase-js";

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

export async function deleteUser() {
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser?.id) {
    throw new Error("로그인이 필요합니다.");
  }

  const userId = authUser.id;

  // 1. users 테이블 soft-delete (로그인 세션으로 본인 행 업데이트)
  const { data: updatedUser, error: userDataError } = await supabase
    .from("users")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("id")
    .maybeSingle();

  if (userDataError) {
    throw userDataError;
  }

  if (!updatedUser) {
    throw new Error("사용자 정보를 찾을 수 없거나 삭제되지 않았습니다.");
  }

  // 2. auth.users에서 사용자 삭제 (service_role 필요)
  const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("회원 탈퇴를 처리할 수 없습니다. 관리자에게 문의하세요.");
  }

  const adminClient = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    serviceRoleKey,
  );
  const { error } = await adminClient.auth.admin.deleteUser(userId);

  if (error) {
    return {
      success: false,
      error: {
        name: "AuthError",
        message: error.message,
        code: error.code,
      } as AuthError,
    };
  }

  return {
    success: true,
    error: undefined,
  };
}
