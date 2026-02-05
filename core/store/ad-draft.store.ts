import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface FlowDraft {
  data: any;
  currentStepIndex: number;
}

interface GlobalDraftState {
  drafts: Record<string, FlowDraft>;
  updateDraft: (flowType: string, data: any) => void;
  setStep: (flowType: string, stepIndex: number) => void;
  clearDraft: (flowType: string) => void;
}

export const useAdDraftStore = create<GlobalDraftState>()(
  persist(
    (set) => ({
      drafts: {},
      updateDraft: (flowType, data) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [flowType]: {
              ...state.drafts[flowType],
              data: { ...state.drafts[flowType]?.data, ...data },
            },
          },
        })),
      setStep: (flowType, currentStepIndex) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [flowType]: { ...state.drafts[flowType], currentStepIndex },
          },
        })),
      clearDraft: (flowType) =>
        set((state) => {
          const { [flowType]: _, ...remaining } = state.drafts;
          return { drafts: remaining };
        }),
    }),
    {
      name: "ad-drafts",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
