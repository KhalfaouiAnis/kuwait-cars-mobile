import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MAX_DRAFTS_COUNT } from "../constants";
import { AdDraftInterface } from "../types/schema/shared";
import { zustandStorage } from "./storage";

interface DraftState {
  drafts: Record<string, AdDraftInterface>;
  activeId: string | null;

  initializeSession: (draft: AdDraftInterface) => void;
  syncWithServer: (serverDrafts: AdDraftInterface[]) => void;
  updateActiveDraftContent: (data: any) => void;
  setActiveDraft: (id: string | null) => void;
  saveStep: (step_index: number) => void;
  removeDraft: (id: string) => void;
  clearAllDrafts: () => void;
}

export const useAdDraftStore = create<DraftState>()(
  persist(
    (set, get) => ({
      drafts: {},
      activeId: null,
      initializeSession: (draft) => {
        const { drafts } = get();
        if (Object.keys(drafts).length >= MAX_DRAFTS_COUNT) return;
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
        }));
      },
      syncWithServer: (serverDrafts) => {
        const mappedDrafts = serverDrafts.reduce(
          (acc, draft) => {
            acc[draft.id] = draft;
            return acc;
          },
          {} as Record<string, AdDraftInterface>,
        );
        set({
          drafts: mappedDrafts,
          activeId: mappedDrafts[get().activeId!] ? get().activeId : null,
        });
      },
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
      setActiveDraft: (id: string | null) => {
        set({ activeId: id });
      },
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
    }),
    {
      name: "ad-drafts",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export const canCreateNewDrafts = (state: DraftState) => {
  const drafts = Object.values(state.drafts);
  const newDraftsCount = drafts.filter((d) => !d.edit_ad_id).length;
  return newDraftsCount < MAX_DRAFTS_COUNT;
};
