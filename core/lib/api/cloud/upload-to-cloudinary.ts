import { httpClient } from "../httpClient";
const API_TOKEN = "2bf029a8e90c91a3211cc3a33a8277b6fe7f1c30";
const API_URL = "https://api.platerecognizer.com/v1/plate-reader/";

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

export const hideLisencePlate = async (media: any) => {
  const formData = new FormData();

  formData.append("upload", {
    uri: media.uri,
    // uri: Platform.OS === "android" ? media.uri : media.uri.replace("file://", ""),
    name: media.fileName || "photo.jpg",
    type: media.type || "image/jpeg",
  } as any);

  formData.append("detection_mode", "vehicle");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    // box: {
    //   "xmax": 362,
    //   "xmin": 233,
    //   "ymax": 558,
    //   "ymin": 506
    // }

    // const xmin = 233;
    // const ymin = 506;
    // const width = 220; // xmax (362) - xmin (233)
    // const height = 60; // ymax (558) - ymin (506)
    // const publicId = "your_uploaded_image_public_id";
    // const cloudName = "your_cloudinary_cloud_name";

    // const blurTransformation = `e_blur_region:1000,x_${xmin},y_${ymin},w_${width},h_${height}`;
    // const blurredImageUrl =
    //   `res.cloudinary.com{cloudName}/image/upload/${blurTransformation}/v1/` +
    //   publicId;

    console.log("Box:", result.results[0].box);

    return result;
  } catch (error) {
    console.error("Upload Error:", error);
  }
};
