import { PLATE_RECOGNIZER_API_URL } from "@/core/constants";
import { AdMediaAsset } from "@/core/types/schema/shared";
import { delay } from "@/core/utils";

export const processLicensePlates = async (assets: AdMediaAsset[]) => {
  const processedAssets: AdMediaAsset[] = [];

  for (const asset of assets) {
    try {
      await delay(1000);
      const blurredUrl = await hideLicense(asset.transformed_url!);
      processedAssets.push({
        ...asset,
        is_blurred: true,
        transformed_url: blurredUrl,
      });
    } catch (error) {
      console.warn(`${error}, skipping...`);
      processedAssets.push({ ...asset, is_blurred: false });
    }
  }

  return processedAssets;
};

export const hideLicense = async (upload_url: string): Promise<string> => {
  const formData = new FormData();
  formData.append("upload_url", upload_url);

  const response = await fetch(PLATE_RECOGNIZER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.EXPO_PUBLIC_PLATE_API_TOKEN}`,
    },
    body: formData,
  });

  const result = await response.json();

  const { xmin, ymin, xmax, ymax } = result?.results?.[0]?.box;
  const blurEffect = `e_blur_region:1000,x_${xmin},y_${ymin},w_${
    xmax - xmin
  },h_${ymax - ymin}`;

  const urlParts = upload_url.split("/f_auto,q_auto/");
  const finalUrl = `${urlParts[0]}/${blurEffect}/f_auto,q_auto/${urlParts[1]}`;

  return finalUrl;
};

export const hideLisencePlate = async (upload_url: string): Promise<string> => {
  const formData = new FormData();
  formData.append("upload_url", upload_url);

  const response = await fetch(PLATE_RECOGNIZER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.EXPO_PUBLIC_PLATE_API_TOKEN}`,
    },
    body: formData,
  });

  const result = await response.json();

  const { xmin, ymin, xmax, ymax } = result?.results?.[0]?.box;
  const blurEffect = `e_blur_region:1000,x_${xmin},y_${ymin},w_${
    xmax - xmin
  },h_${ymax - ymin}`;

  const urlParts = upload_url.split("/f_auto,q_auto/");
  const finalUrl = `${urlParts[0]}/${blurEffect}/f_auto,q_auto/${urlParts[1]}`;

  return finalUrl;
};
