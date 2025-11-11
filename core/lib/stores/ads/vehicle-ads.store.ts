import { ADS_PAGE_SIZE, VEHICLES_ADS_STORAGE_KEY } from "@/core/constants";
import { VehicleAdInterface } from "@/core/types/schema/vehicleAd";
import { isAxiosError } from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { httpClient } from "../../api/httpClient";
import useSortingAndFilteringStore from "../sorting-filtering.store";
import { zustandStorage } from "../storage";

interface VehicleAdsState {
  ads: VehicleAdInterface[];
  loading: boolean;
  error: string | null;
  nextCursor: string | null;
  hasMore: boolean;

  fetchVehicleAds: (cursor?: string) => Promise<void>;
  createVehicleAd: (data: Partial<VehicleAdInterface>) => Promise<VehicleAdInterface>;
  updateVehicleAd: (id: string, data: Partial<VehicleAdInterface>) => Promise<VehicleAdInterface>;
  deleteVehicleAd: (id: string) => Promise<void>;
}

const useVehicleAdsStore = create<VehicleAdsState>()(
  persist(
    (set, get) => ({
      ads: [],
      loading: false,
      nextCursor: null,
      hasMore: true,
      error: null,

      fetchVehicleAds: async (cursor) => {
        const { loading, hasMore, ads } = get();
        const { year } = useSortingAndFilteringStore.getState();
        if (loading || !hasMore) return;

        try {
          const params = new URLSearchParams({
            limit: ADS_PAGE_SIZE,
            direction: "forward",
            ...(cursor && { cursor }),
          });

          const { data: responseData } = await httpClient.post(
            `/ads/vehicles?${params}`,
            {
              year,
            }
          );

          const { data, pagination } = responseData;
          set({
            ads: [...ads, ...data],
            nextCursor: pagination.nextCursor,
            hasMore: pagination.hasMore,
          });
        } catch (error) {
          if (isAxiosError(error)) {
            set({ error: error.message });
          }
        } finally {
          set({ loading: false });
        }
      },

      createVehicleAd: async (data) => {
        try {
          set({ loading: true });
          const { data: responseData } = await httpClient.post(
            "/vehicles/create",
            data
          );

          return responseData;
        } catch (error) {
          if (isAxiosError(error)) {
            set({ error: error.message });
          }
        } finally {
          set({ loading: false });
        }
      },

      updateVehicleAd: async (id, data) => {
        try {
          set({ loading: true });
          const { data: responseData } = await httpClient.patch(
            `/vehicles/${id}`,
            data
          );

          return responseData;
        } catch (error) {
          if (isAxiosError(error)) {
            set({ error: error.message });
          }
        } finally {
          set({ loading: false });
        }
      },

      deleteVehicleAd: async (id) => {
        try {
          set({ loading: true });
          await httpClient.delete(`/vehicles/${id}`);
        } catch (error) {
          if (isAxiosError(error)) {
            set({ error: error.message });
          }
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: VEHICLES_ADS_STORAGE_KEY,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ ads: state.ads }),
    }
  )
);

export default useVehicleAdsStore;
