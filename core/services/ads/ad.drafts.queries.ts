import { fetchAdDrafts } from "@/core/services/ads/ad.drafts.service";
import { useQuery } from "@tanstack/react-query";

export const useAdDraftsQuery = () => {
  return useQuery({
    queryKey: ["ad-drafts"],
    queryFn: fetchAdDrafts,
    staleTime: 1000 * 60 * 5,
  });
};
