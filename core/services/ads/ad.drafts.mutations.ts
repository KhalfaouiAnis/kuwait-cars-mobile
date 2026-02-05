import { CloudinarySignRequestInterface, MediaType } from "@/core/types";
import { MediaInterface } from "@/core/types/schema/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDraft } from "./ad.drafts.service";

export type UploadFileType = {
  file: MediaInterface;
  media_type: MediaType;
  signingParams: CloudinarySignRequestInterface;
};

export const useSyncDraft = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ draftId, content, step_index }: any) =>
      updateDraft(draftId, content, step_index),
    onMutate: async (newDraft) => {
      await queryClient.cancelQueries({ queryKey: ["ad-drafts"] });
      const previousDrafts = queryClient.getQueryData(["ad-drafts"]);
      queryClient.setQueryData(["ad-drafts"], (old: any) =>
        old.map((d: any) =>
          d.id === newDraft.draftId ? { ...d, ...newDraft } : d,
        ),
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

  return { ...mutation };
};
