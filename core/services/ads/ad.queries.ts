import { httpClient } from "@/core/lib/api/httpClient";
import {
  fetchAds,
  fetchMyAds,
  getAdById,
} from "@/core/services/ads/ad.service";
import useRecentlyViewedStore from "@/core/store/recently-viewed-ad.store";
import useSearchStore from "@/core/store/search.store";
import { AdvertisementInterface } from "@/core/types";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useAdsQuery = () => {
  const { filters, sorting } = useSearchStore();

  return useInfiniteQuery({
    queryKey: ["ads", filters, sorting],
    queryFn: ({ pageParam }) =>
      fetchAds({
        filters,
        sorting,
        cursor: pageParam as string | null as string,
        limit: 10,
      }),
    initialPageParam: null as string | null as string,
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

export const useRecentlyViewedQuery = () => {
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

export const useAdQuery = (adId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["ads", "detail", adId],
    queryFn: () => getAdById(adId),
    // 1. PERFORMANCE: Seed the cache from the existing search results
    initialData: () => {
      // Look through all pages of the infinite query cache
      const searchCache = queryClient.getQueryData<any>(["ads"]);
      const foundad = searchCache?.pages
        .flatMap((page: any) => page.data)
        .find((p: any) => p.id === adId);

      return foundad;
    },
    staleTime: 1000 * 60 * 2,
  });
};
