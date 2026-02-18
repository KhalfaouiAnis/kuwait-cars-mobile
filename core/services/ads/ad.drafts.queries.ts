import { fetchAdDrafts } from "@/core/services/ads/ad.drafts.service";
import { useQuery } from "@tanstack/react-query";

export const useAdDraftsQueries = () => {
  const fetchDrafts = useQuery({
    queryKey: ["ad-drafts"],
    queryFn: fetchAdDrafts,
    staleTime: 1000 * 60 * 5,
  });
  return { fetchDrafts };
};
