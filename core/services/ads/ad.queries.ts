import { httpClient } from "@/core/lib/api/httpClient";
import { fetchAds, fetchMyAds } from "@/core/services/ads/ad.service";
import useRecentlyViewedStore from "@/core/store/recently-viewed-ad.store";
import useSearchStore from "@/core/store/search.store";
import { AdvertisementInterface } from "@/core/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useAdsQuery = () => {
  const { filters, sorting } = useSearchStore();

  return useInfiniteQuery({
    queryKey: ["ads", filters, sorting],
    queryFn: ({ pageParam }) =>
      fetchAds({
        filters,
        sorting,
        cursor: pageParam as string | null,
        limit: 10,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : null,
  });
};

export const useMyAdsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["ads", "me"],
    queryFn: ({ pageParam }) =>
      fetchMyAds({
        cursor: pageParam as string | null,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : null,
  });
};

export const useRecentlyViewed = () => {
  const viewedIds = useRecentlyViewedStore((state) => state.viewedIds);

  return useQuery({
    queryKey: ["ads", "recently-viewed", viewedIds],
    queryFn: async () =>
      httpClient
        .post<AdvertisementInterface[]>("/ads/batch-list", { ids: viewedIds })
        .then((res) =>
          res.data?.sort(
            (a, b) => viewedIds.indexOf(a.id) - viewedIds.indexOf(b.id)
          )
        ),
    enabled: viewedIds.length > 0,
    staleTime: 1000 * 60 * 10,
  });
};
