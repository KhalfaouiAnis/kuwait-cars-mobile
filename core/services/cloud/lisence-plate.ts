import { PLATE_RECOGNIZER_API_URL } from "@/core/constants";

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
