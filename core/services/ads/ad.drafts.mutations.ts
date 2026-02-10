import { useAdDraftStore } from "@/core/store/adDrafts.store";
import { AdDraftInput, AdDraftInterface } from "@/core/types/schema/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewAdDraft,
  deleteAdDraft,
  deleteAllAdDraft,
  updateAdDraft,
} from "./ad.drafts.service";

interface UpdateAdDraft extends AdDraftInput {
  id: string;
}

export const useAdDraftMutations = () => {
  const queryClient = useQueryClient();
  const { removeDraft, clearAllDrafts } = useAdDraftStore();

  const createAdDraft = useMutation({
    mutationFn: async (payload: AdDraftInput) => createNewAdDraft(payload),
    onMutate: async (newDraft) => {
      await queryClient.cancelQueries({ queryKey: ["ad-drafts"] });

      const previousDrafts =
        queryClient.getQueryData<AdDraftInterface[]>(["ad-drafts"]) || [];

      queryClient.setQueryData(
        ["ad-drafts"],
        (old: AdDraftInterface[] | undefined) => {
          const safeOld = old || [];
          const exists = safeOld.find((d) => d.ad_type === newDraft.ad_type);
          if (exists) {
            return safeOld.map((d) =>
              d.ad_type === newDraft.ad_type ? { ...d, ...newDraft } : d,
            );
          } else {
            return [...safeOld, newDraft];
          }
        },
      );

      return { previousDrafts };
    },
    onError: (err, newDraft, context) => {
      queryClient.setQueryData(["ad-drafts"], context?.previousDrafts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ad-drafts"] });
    },
  });

  const syncDraft = useMutation({
    mutationFn: async (payload: UpdateAdDraft) =>
      updateAdDraft(payload.id, payload),
    onMutate: async (newDraft) => {
      await queryClient.cancelQueries({ queryKey: ["ad-drafts"] });

      const previousDrafts =
        queryClient.getQueryData<AdDraftInterface[]>(["ad-drafts"]) || [];

      queryClient.setQueryData(
        ["ad-drafts"],
        (old: AdDraftInterface[] | undefined) => {
          const safeOld = old || [];
          const exists = safeOld.find((d) => d.ad_type === newDraft.ad_type);
          if (exists) {
            return safeOld.map((d) =>
              d.ad_type === newDraft.ad_type ? { ...d, ...newDraft } : d,
            );
          } else {
            return [...safeOld, newDraft];
          }
        },
      );

      return { previousDrafts };
    },
    onError: (err, newDraft, context) => {
      queryClient.setQueryData(["ad-drafts"], context?.previousDrafts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ad-drafts"] });
    },
  });

  const deleteDraft = useMutation({
    mutationFn: (id: string) => deleteAdDraft(id),
    onMutate: (id) => {
      removeDraft(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad-drafts"] });
    },
  });

  const deleteAllDrafts = useMutation({
    mutationFn: () => deleteAllAdDraft(),
    onMutate: async () => {
      clearAllDrafts();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad-drafts"] });
    },
  });

  return { createAdDraft, syncDraft, deleteDraft, deleteAllDrafts };
};
