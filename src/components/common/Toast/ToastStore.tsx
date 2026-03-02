import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description: string;
  type: ToastType;
  createdAt: Date;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (title: string, description?: string, type?: ToastType) => void;  //
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (title, description, type = "info") =>
    set((state) => {

      const newToast: ToastItem = {
        id: crypto.randomUUID(),
        title,
        description: description || "",
        type,
        createdAt: new Date(),
      };

      let updatedToasts = [...state.toasts, newToast];
      if (updatedToasts.length > 5) updatedToasts = updatedToasts.slice(-5);
      return { toasts: updatedToasts };
    }),
  
  removeToast : (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
