import { httpClient } from "@/core/api/httpClient";
import {
  AdSearchParams,
  AdStatus,
  AdvertisementInterface,
  PaginatedResponse,
} from "@/core/types";
import { PaymentObjectInterface } from "@/core/types/schema/shared";
import { toast } from "sonner-native";

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

export const fetchBatchAds = async (ids: string[]) => {
  const { data } = await httpClient.post<AdvertisementInterface[]>(
    "/ads/batch-list",
    { ids },
  );

  return data?.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
};

export const getAdById = async (id: string) => {
  const { data } = await httpClient.get<AdvertisementInterface>(`/ads/${id}`);

  return data;
};

export const fetchMyAds = async (
  status: AdStatus,
): Promise<AdvertisementInterface[]> => {
  const { data } = await httpClient.get<AdvertisementInterface[]>(
    `/ads/me/${status}`,
  );

  return data;
};

export const fetchMyFavoritedAds = async (): Promise<
  AdvertisementInterface[]
> => {
  const { data } =
    await httpClient.get<AdvertisementInterface[]>("/ads/favorite");

  return data;
};

export const editAd = async (ad: AdvertisementInterface) => {
  const { data } = await httpClient.post(`/api/v1/drafts/${ad.id}`, {
    content: ad,
    ad_type: ad.ad_type,
  });
  return data;
};

export const toggleFavorite = async (adId: string): Promise<void> => {
  await httpClient.post(`/ads/${adId}/toggle-favorite`);
};

export const flag = async (adId: string): Promise<void> => {
  await httpClient.post(`/ads/${adId}/flag`);
};

export const softDeleteAd = async (adId: string): Promise<void> => {
  await httpClient.patch(`/ads/${adId}/delete`);
};

export const repostAd = async (adId: string): Promise<void> => {
  await httpClient.patch(`/ads/${adId}/repost`);
};

export const incrementAdViews = async (adId: string): Promise<void> => {
  await httpClient.post(`/ads/${adId}/view`);
};

export const initiatePayment = async (
  payload: PaymentObjectInterface,
  adType: string,
  draftId: string,
) => {
  try {
    const { data: paymentUrl } = await httpClient.post(
      "/ads/initiate-payment",
      {
        ...payload,
        urls: {
          errorUrl: `https://walrus-app-hz53d.ondigitalocean.app/api/v1/payment/failure?adType=${adType}&draftId=${draftId}`,
          successUrl: `https://walrus-app-hz53d.ondigitalocean.app/api/v1/payment/success?adType=${adType}&draftId=${draftId}`,
        },
      },
    );

    return paymentUrl;
  } catch (error) {
    console.log(error);
    toast.error("Payment failed.");
  }
};
