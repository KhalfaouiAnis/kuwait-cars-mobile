import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface Draft {
  id: string;
  category: string;
  stepIndex: number;
  content: any;
  updatedAt: number;
}

interface DraftState {
  drafts: Record<string, Draft>;
  activeId: string | null;

  initializeSession: (draft: Draft) => void;
  updateActiveDraftContent: (data: any) => void;
  saveStep: (stepIndex: number) => void;
  removeDraft: (id: string) => void;
}

export const useAdDraftStore = create<DraftState>()(
  persist(
    (set) => ({
      drafts: {},
      activeId: null,
      initializeSession: (draft) =>
        set((state) => ({
          activeId: draft.id,
          drafts: { ...state.drafts, [draft.id]: draft },
        })),
      updateActiveDraftContent: (data) =>
        set((state) => {
          if (!state.activeId) return state;
          const current = state.drafts[state.activeId];
          return {
            drafts: {
              ...state.drafts,
              [state.activeId]: {
                ...current,
                content: { ...current.content, ...data },
                updatedAt: Date.now(),
              },
            },
          };
        }),
      saveStep: (stepIndex) =>
        set((state) => {
          if (!state.activeId) return state;
          return {
            drafts: {
              ...state.drafts,
              [state.activeId]: { ...state.drafts[state.activeId], stepIndex },
            },
          };
        }),
      removeDraft: (id) =>
        set((state) => {
          const newDrafts = { ...state.drafts };
          delete newDrafts[id];
          return {
            drafts: newDrafts,
            activeId: state.activeId === id ? null : state.activeId,
          };
        }),
    }),
    {
      name: "ad-drafts",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
