import { httpClient } from "@/core/lib/api/httpClient";
import {
  AdSearchParams,
  AdvertisementInterface,
  PaginatedResponse,
} from "@/core/types";

export const fetchAds = async ({
  filters,
  sorting,
  cursor,
  direction,
  limit = 10,
}: AdSearchParams): Promise<PaginatedResponse<AdvertisementInterface>> => {
  const { data } = await httpClient.post<
    PaginatedResponse<AdvertisementInterface>
  >("/ads", {
    pagination: { cursor, limit },
    filters,
    sorting,
    direction,
  });

  return data;
};

export const fetchMyAds = async ({
  cursor,
}: AdSearchParams): Promise<PaginatedResponse<AdvertisementInterface>> => {
  const { data } = await httpClient.post<
    PaginatedResponse<AdvertisementInterface>
  >("/ads", {
    pagination: { cursor, limit: 10 },
    filters: { isMine: true },
    sorting: { field: "created_at", direction: "desc" },
  });

  return data;
};

export const toggleFavorite = async (adId: string): Promise<void> => {
  await httpClient.post(`/ads/${adId}/toggle-favorite`);
};

export const flag = async (adId: string): Promise<void> => {
  await httpClient.post(`/ads/${adId}/flag`);
};
