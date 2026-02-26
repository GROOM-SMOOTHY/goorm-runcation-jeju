export const validatePassword = (password: string) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
};

export function validateLoginForm(
  email: string,
  password: string,
): string | null {
  if (!EMAIL_REGEX.test(email)) return LOGIN_VALIDATION.INVALID_EMAIL;
  if (!email.trim() || !password.trim()) return LOGIN_VALIDATION.EMPTY_FIELDS;
  return null;
}

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const LOGIN_VALIDATION = {
  INVALID_EMAIL: "올바른 이메일 형식을 입력해주세요",
  EMPTY_FIELDS: "이메일과 비밀번호 모두 입력해주세요",
  USER_NOT_FOUND:
    "사용자 정보를 찾을 수 없습니다. Supabase 대시보드에서 users 테이블 RLS 정책을 확인해주세요.",
} as const;
