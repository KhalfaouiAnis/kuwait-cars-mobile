import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MAX_DRAFTS_COUNT } from "../constants";
import { AdDraftInterface } from "../types/schema/shared";
import { zustandStorage } from "./storage";

interface DraftState {
  drafts: Record<string, AdDraftInterface>;
  activeId: string | null;

  initializeSession: (draft: AdDraftInterface) => void;
  updateActiveDraftContent: (data: any) => void;
  saveStep: (step_index: number) => void;
  removeDraft: (id: string) => void;
  clearAllDrafts: () => void;
  canCreateNewDraft: () => boolean;
}

export const useAdDraftStore = create<DraftState>()(
  persist(
    (set, get) => ({
      drafts: {},
      activeId: null,
      initializeSession: (draft) =>
        set((state) => ({
          activeId: draft.id,
          drafts: {
            ...state.drafts,
            [draft.id]: {
              id: draft.id,
              ad_type: draft.ad_type,
              step_index: draft.step_index,
              content: draft.content,
              updated_at: new Date(draft.updated_at).getTime(),
            },
          },
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
                updated_at: Date.now(),
              },
            },
          };
        }),
      saveStep: (step_index) =>
        set((state) => {
          if (!state.activeId) return state;
          return {
            drafts: {
              ...state.drafts,
              [state.activeId]: { ...state.drafts[state.activeId], step_index },
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
      clearAllDrafts: async () => {
        set({ drafts: {}, activeId: null });
      },
      canCreateNewDraft: () => {
        return Object.keys(get().drafts).length < Number(MAX_DRAFTS_COUNT);
      },
    }),
    {
      name: "ad-drafts",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
