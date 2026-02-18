import { httpClient } from "@/core/api/httpClient";
import { CloudinarySignRequestInterface } from "@/core/types";
import { AdMediaAsset } from "@/core/types/schema/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";
import {
  editAd,
  flag,
  incrementAdViews,
  repostAd,
  softDeleteAd,
  toggleFavorite,
} from "./ad.service";

export type UploadFileType = {
  file: AdMediaAsset;
  signingParams: CloudinarySignRequestInterface;
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adId: string) => toggleFavorite(adId),

    onMutate: async (adId) => {
      await queryClient.cancelQueries({ queryKey: ["ads"] });

      const previousAds = queryClient.getQueryData(["ads"]);

      queryClient.setQueryData(["ads"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((ad: any) =>
              ad.id === adId ? { ...ad, is_favorited: !ad.is_favorited } : ad,
            ),
          })),
        };
      });

      return { previousAds };
    },

    onError: (err, adId, context) => {
      if (context?.previousAds) {
        queryClient.setQueryData(["ads"], context.previousAds);
      }
      toast.error("Could not update favorite. Please try again.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};

export const useFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adId: string) => flag(adId),

    onMutate: async (adId) => {
      await queryClient.cancelQueries({ queryKey: ["ads"] });

      const previousAds = queryClient.getQueryData(["ads"]);

      queryClient.setQueryData(["ads"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((ad: any) =>
              ad.id === adId ? { ...ad, is_flaged: !ad.is_flaged } : ad,
            ),
          })),
        };
      });

      return { previousAds };
    },

    onError: (err, adId, context) => {
      if (context?.previousAds) {
        queryClient.setQueryData(["ads"], context.previousAds);
      }
      toast.error("Could not flag the ad. Please try again.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};

export const useSoftDeletAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adId: string) => softDeleteAd(adId),
    onMutate: async (adId) => {
      await queryClient.cancelQueries({ queryKey: ["ads"] });

      const previousAds = queryClient.getQueryData(["ads"]);

      queryClient.setQueryData(["ads"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((ad: any) => ad.id !== adId),
          })),
        };
      });

      return { previousAds };
    },

    onError: (err, adId, context) => {
      if (context?.previousAds) {
        queryClient.setQueryData(["ads"], context.previousAds);
      }
      toast.error("Could not delete the ad. Please try again.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};

export const useRepostAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adId: string) => repostAd(adId),
    onError: () => {
      toast.error("Could not delete the ad. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};

export const useAdMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await httpClient.post("/ads/create", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  return { ...mutation };
};

export const useIncrementAdViews = () => {
  const mutation = useMutation({
    mutationFn: incrementAdViews,
  });
  return { ...mutation };
};

export const useAdMutations = () => {
  const useEditAd = useMutation({
    mutationFn: editAd,
  });

  return { useEditAd };
};
