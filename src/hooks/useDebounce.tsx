import { useEffect, useState } from "react";

// 벨류를 제네릭 타입으로 받음 / 3초 대기
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // 벨류가 바뀌면 3초 대기 후 디바운스벨류 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 벨류가 다시 바뀌면 기존 타이머제거 후 타이머 재 생성
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
