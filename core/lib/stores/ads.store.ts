import { ADS_STORAGE_KEY } from "@/core/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "../api/httpClient";
import useSortingAndFilteringStore from "./sorting-filtering.store";
import { zustandStorage } from "./storage";

interface AdsState {
  ads: any[];
  nextCursor: string | null;
  hasMore: boolean;
  loading: boolean;

  setLoading: (loading: boolean) => void;
  fetchAds: (cursor: string | null) => void;
}

const useAdsStore = create<AdsState>()(
  persist(
    (set, get) => ({
      ads: [],
      nextCursor: null,
      hasMore: true,
      loading: false,

      setLoading: (loading) => {
        return set({ loading });
      },

      fetchAds: async (cursor = null) => {
        const { loading, hasMore, ads } = get();
        const { year } = useSortingAndFilteringStore.getState();
        if (loading || !hasMore) return;

        const { data: responseData } = await httpClient.post("/ads", { year });

        const { data, pagination } = responseData;
        set({
          ads: [...ads, ...data],
          nextCursor: pagination.nextCursor,
          hasMore: pagination.hasMore,
          loading: false,
        });
      },
    }),
    {
      name: ADS_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ ads: state.ads }),
    }
  )
);

export default useAdsStore;
