export const authErrorMessages = {
  // 로그인/회원가입 공통
  invalid_credentials: "이메일 또는 비밀번호가 일치하지 않습니다.",
  email_not_confirmed:
    "이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.",
  user_not_found: "존재하지 않는 사용자입니다.",
  invalid_grant: "로그인 정보가 유효하지 않습니다.",

  // 회원가입 전용
  user_already_exists: "이미 가입된 이메일 주소입니다.",
  signup_disabled: "현재 회원가입이 비활성화되어 있습니다.",
  weak_password: "비밀번호가 너무 취약합니다. (최소 6자 이상)",

  // 제한/보안
  over_email_send_rate_limit:
    "메일 발송 제한을 초과했습니다. 잠시 후 다시 시도해주세요.",
  too_many_requests:
    "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.",

  // 기타
  bad_json: "요청 데이터 형식이 올바르지 않습니다.",
  unexpected_failure: "예상치 못한 오류가 발생했습니다. 다시 시도해주세요.",
};

export type AuthErrorCode = keyof typeof authErrorMessages;
