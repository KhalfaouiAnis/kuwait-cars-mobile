import { httpClient } from "@/core/api/httpClient";
import { AdDraftInput, AdDraftInterface } from "@/core/types/schema/shared";

export const fetchAdDrafts = async (): Promise<AdDraftInterface[]> => {
  const { data } = await httpClient.get<AdDraftInterface[]>("/ads/drafts");

  return data;
};

export const createNewAdDraft = async (payload: AdDraftInput) => {
  const { data } = await httpClient.post<AdDraftInterface>(
    "/ads/drafts",
    payload,
  );

  return data;
};

export const promoteAd = async (id: string) => {
  const { data } = await httpClient.post<AdDraftInterface>(
    `/ads/drafts/promote/${id}`,
  );

  return data;
};

export const updateAdDraft = async (id: string, payload: AdDraftInput) => {
  const { data } = await httpClient.put<AdDraftInterface>(
    `/ads/drafts/${id}`,
    payload,
  );

  return data;
};

export const deleteAdDraft = async (id: string) => {
  const { data } = await httpClient.delete<AdDraftInterface>(
    `/ads/drafts/${id}`,
  );

  return data;
};

export const deleteAllAdDraft = async () => {
  const { data } = await httpClient.delete<AdDraftInterface>(`/ads/drafts/all`);

  return data;
};
