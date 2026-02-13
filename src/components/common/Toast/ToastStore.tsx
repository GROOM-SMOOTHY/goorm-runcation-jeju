import { create } from "zustand";

// 토스트 유형을 정의
export type ToastType = "success" | "error" | "warning" | "info";

// 하나의 토스트 객체 구조를 정의
export interface ToastItem {
  id: string;            // 고유 식별자
  title: string;         // 제목
  description: string;   // 설명 
  type: ToastType;       // 토스트 유형( success, error, warning, info )
  createdAt: Date;       // 생성 시간
}

// 새 토스트 배열로 저장하고 낡은 토스트는 제거
interface ToastStore {
  toasts: ToastItem[];
  addToast: (title: string, description?: string, type?: ToastType) => void;  //
  removeToast: (id: string) => void;
}

// zustand 토스트 전역 스토어 생성
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (title, description, type = "info") =>
    set((state) => {
      // 새 토스트 객체 생성
      const newToast: ToastItem = {
        id: crypto.randomUUID(),
        title,
        description: description || "",
        type,
        createdAt: new Date(),
      };

      // 기존 배열 복사 + 새 토스트 추가
      let updatedToasts = [...state.toasts, newToast];
      // 최대 5개 유지
      if (updatedToasts.length > 5) updatedToasts = updatedToasts.slice(-5);
      // 객체로 반환
      return { toasts: updatedToasts };
    }),
  
  removeToast : (id) =>
    // ID가 일치하지 않는 토스트만 남김
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
