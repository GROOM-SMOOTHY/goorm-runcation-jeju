import { create } from "zustand";
import type { Tables } from "@/types/supabase";
import { persist } from "zustand/middleware";

export type GroupState = Tables<"groups"> | null;

export interface UseGroupState {
  group: GroupState;
  setGroup: (group: GroupState) => void;
  clearGroup: () => void;
}

export const useGroup = create<UseGroupState>()(
  persist(
    (set) => ({
      group: null,
      setGroup: (group) => set({ group }),
      clearGroup: () => set({ group: null }),
    }),
    {
      name: "group-storage",
      partialize: (state) => ({ group: state.group }),
    },
  ),
);
