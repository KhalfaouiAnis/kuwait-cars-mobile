import { ADS_PAGE_SIZE } from "@/core/constants";
import {
  fetchAds,
  fetchBatchAds,
  fetchMyAds,
  fetchMyFavoritedAds,
  getAdById,
} from "@/core/services/ads/ad.service";
import useRecentlyViewedStore from "@/core/store/recently-viewed-ad.store";
import useSearchStore from "@/core/store/search.store";
import { AdStatus } from "@/core/types";
import { sanitizeFiltersForApi } from "@/core/utils/filter-sanitizer";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useAdsQuery = () => {
  const { appliedFilters } = useSearchStore();

  return useInfiniteQuery({
    queryKey: ["ads", appliedFilters],
    queryFn: async ({ pageParam }) => {
      const { sorting, ...sanitizedFilters } =
        sanitizeFiltersForApi(appliedFilters);
      return fetchAds({
        filters: sanitizedFilters,
        sorting,
        cursor: pageParam as string | null as string,
        limit: ADS_PAGE_SIZE,
      });
    },
    initialPageParam: null as string | null as string,
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyAdsQuery = (status: AdStatus) => {
  return useQuery({
    queryKey: ["ads", "me", status],
    queryFn: () => fetchMyAds(status),
    staleTime: 1000 * 60 * 10,
  });
};

export const useMyFavoritedAdsQuery = () => {
  return useQuery({
    queryKey: ["ads", "my-favorited"],
    queryFn: fetchMyFavoritedAds,
    staleTime: 1000 * 60 * 10,
  });
};

export const useRecentlyViewedQuery = () => {
  const viewedIds = useRecentlyViewedStore((state) => state.viewedIds);

  return useQuery({
    queryKey: ["ads", "recently-viewed", viewedIds],
    queryFn: () => fetchBatchAds(viewedIds),
    enabled: viewedIds.length > 0,
    staleTime: 1000 * 60 * 10,
  });
};

export const useAdDetailQuery = (adId: string) => {
  return useQuery({
    queryKey: ["ads", "detail", adId],
    queryFn: () => getAdById(adId),
    staleTime: 1000 * 60 * 2,
  });
};
