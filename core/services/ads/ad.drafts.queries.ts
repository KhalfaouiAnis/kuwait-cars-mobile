import { fetchDrafts } from "@/core/services/ads/ad.drafts.service";
import { useQuery } from "@tanstack/react-query";

export const useAdDraftsQuery = () => {
  return useQuery({
    queryKey: ["ad-drafts"],
    queryFn: fetchDrafts,
    staleTime: 1000 * 60 * 5,
  });
};
