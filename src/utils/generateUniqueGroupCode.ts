import { hasGroupCode } from "@/services/groupService";

const CODE_LENGTH = 6;
const MAX_UNIQUE_ATTEMPTS = 20;

export function generateGroupCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

/**
 * 그룹 코드를 생성하고, isCodeTaken으로 중복 여부를 확인한 뒤 사용 가능한 코드만 반환합니다.
 * @param isCodeTaken - 코드가 이미 사용 중이면 true를 반환하는 비동기 함수 (예: getGroupByCode(code) !== null)
 * @returns 사용 가능한 6자리 코드
 */
export async function generateUniqueGroupCode(): Promise<string> {
  for (let attempt = 0; attempt < MAX_UNIQUE_ATTEMPTS; attempt++) {
    const code = generateGroupCode();
    const taken = await hasGroupCode(code);
    if (!taken) return code;
  }
  throw new Error("고유한 그룹 코드를 생성하지 못했습니다. 다시 시도해주세요.");
}

export default generateUniqueGroupCode;
