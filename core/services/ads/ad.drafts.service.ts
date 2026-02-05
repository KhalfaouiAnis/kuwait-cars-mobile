import { httpClient } from "@/core/api/httpClient";
import { AdDraftInterface, AdvertisementInterface } from "@/core/types";

export const fetchDrafts = async (): Promise<AdDraftInterface[]> => {
  const { data } = await httpClient.get<AdDraftInterface[]>("/ads/drafts");

  return data;
};

export const updateDraft = async (
  id: string,
  content: any,
  step_index: number,
) => {
  const { data } = await httpClient.put<AdDraftInterface>(`/ads/drafts/${id}`, {
    content,
    step_index,
  });

  return data;
};

export const getAdById = async (id: string) => {
  const { data } = await httpClient.get<AdvertisementInterface>(`/ads/${id}`);

  return data;
};
