/**
 * 계좌번호의 가운데 부분을 ***로 마스킹해서 반환
 * 예) "1101234567890" → "110-***-7890", "3521234567890" → "352-***-7890"
 *
 * @param account {string} - 실제 계좌번호 (숫자, 하이픈 허용)
 * @returns {string} - 가운데를 ***로 가린 계좌번호
 */
export function maskAccountNumber(account: string): string {
  const digits = account.replace(/[^0-9]/g, "");

  if (digits.length <= 7) {
    if (digits.length <= 3) return digits;
    return `${digits.slice(0, 3)}-***-${digits.slice(3)}`;
  }

  const first = digits.slice(0, 3);
  const last = digits.slice(-4);

  return `${first}-***-${last}`;
}
