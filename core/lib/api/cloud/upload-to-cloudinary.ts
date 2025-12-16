import { PLATE_RECOGNIZER_API_URL } from "@/core/constants";
import { CloudinarySignRequestInterface } from "@/core/types";
import { httpClient } from "../httpClient";

export const signRequest = async (params: any) => {
  return httpClient.post("/cloudinary/gen-signature", params);
};

export const uploadFileToCloudinary = async (
  compressedUri: string,
  type?: string,
  name?: string | null,
  signingParams?: CloudinarySignRequestInterface
) => {
  const formData = new FormData();

  formData.append("file", {
    uri: compressedUri,
    type,
    name,
  } as any);

  const { data: response } = await signRequest(signingParams);

  formData.append("api_key", response.apiKey);
  formData.append("signature", response.signature);
  formData.append("timestamp", response.params.timestamp);
  formData.append("upload_preset", response.params.upload_preset);

  if (response.params.eager) {
    formData.append("eager", response.params.eager);
  }

  const data = await fetch(response.uploadUrl, {
    method: "POST",
    body: formData,
  });

  const uploadData = await data.json();

  if (uploadData.error) throw new Error(uploadData.error.message);

  return {
    publicId: uploadData.public_id,
    originalUrl: uploadData.secure_url,
    transformedUrl: uploadData.eager?.[0]?.secure_url,
  };
};

export const hideLisencePlate = async (upload_url: string) => {
  const formData = new FormData();
  formData.append("upload_url", upload_url);

  try {
    const response = await fetch(PLATE_RECOGNIZER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.EXPO_PUBLIC_PLATE_API_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();

    const { xmin, ymin, xmax, ymax } = result?.results?.[0]?.box;
    const blurEffect = `e_blur_region:1000,x_${xmin},y_${ymin},w_${
      xmax - xmin
    },h_${ymax - ymin}`;

    const urlParts = upload_url.split("/f_auto,q_auto/");
    const finalUrl = `${urlParts[0]}/${blurEffect}/f_auto,q_auto/${urlParts[1]}`;

    return finalUrl;
  } catch (error) {
    console.error("Upload Error:", error);
  }
};
