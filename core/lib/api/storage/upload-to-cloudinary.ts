import { httpClient } from "../httpClient";

export const signRequest = async (params: any) => {
  return httpClient.post("/ads/generate-upload-signature", params);
};

export const uploadFileToCloudinary = async (
  compressedUri: string,
  type?: string,
  name?: string | null,
  signingParams?: any
) => {
  const formData = new FormData();

  formData.append("file", {
    uri: compressedUri,
    type,
    name,
  } as any);

  const { data: response } = await signRequest(signingParams);

  formData.append("api_key", response.apiKey);
  formData.append("timestamp", response.params.timestamp);
  if (response.params.upload_preset) {
    formData.append("upload_preset", response.params.upload_preset);
  }
  formData.append("signature", response.signature);

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
