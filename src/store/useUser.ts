import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserState {
  id: string;
  data: {
    email: string;
    nickname: string;
    phone: string;
    profile: string | null;
    created_at: Date;
    updated_at: Date;
  };
  setUser: (user: UserState) => void;
  logoutUser: () => void;
}

const emptyUserData = {
  email: "",
  nickname: "",
  phone: "",
  profile: null as string | null,
  created_at: new Date(),
  updated_at: new Date(),
};

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      id: "",
      data: emptyUserData,
      setUser: (user: UserState) => set({ ...user }),
      logoutUser: () =>
        set({
          id: "",
          data: { ...emptyUserData },
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ id: state.id, data: state.data }),
    },
  ),
);
