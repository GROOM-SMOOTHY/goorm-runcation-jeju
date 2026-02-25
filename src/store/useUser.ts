import { create } from 'zustand';

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

export const useUser = create<UserState>((set) => ({
  id: '',
  data: {
    email: '',
    nickname: '',
    phone: '',
    profile: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  setUser: (user: UserState) => set({ ...user }),
  logoutUser: () =>
    set({
      id: '',
      data: {
        email: '',
        nickname: '',
        phone: '',
        profile: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    }),
}));
