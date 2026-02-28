import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tables } from "@/types/supabase";

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
    }
  )
);
