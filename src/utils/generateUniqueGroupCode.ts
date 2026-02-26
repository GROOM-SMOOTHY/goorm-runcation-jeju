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

export async function generateUniqueGroupCode(): Promise<string> {
  for (let attempt = 0; attempt < MAX_UNIQUE_ATTEMPTS; attempt++) {
    const code = generateGroupCode();
    const taken = await hasGroupCode(code);
    if (!taken) return code;
  }
  throw new Error("고유한 그룹 코드를 생성하지 못했습니다. 다시 시도해주세요.");
}

export default generateUniqueGroupCode;
