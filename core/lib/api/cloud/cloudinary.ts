import { CloudinarySignRequestInterface, SoundEffectTypes } from "@/core/types";
import { httpClient } from "../httpClient";

const signRequest = async (params: CloudinarySignRequestInterface) => {
  return httpClient.post("/cloudinary/gen-signature", params);
};

const uploadFileToCloudinary = async (
  compressedUri: string,
  signingParams: CloudinarySignRequestInterface,
  type?: string,
  name?: string | null
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

  try {
    const data = await fetch(response.uploadUrl, {
      method: "POST",
      body: formData,
    });

    const uploadData = await data.json();

    if (uploadData.error) throw new Error(uploadData.error.message);

    return {
      public_id: uploadData.public_id,
      original_url: uploadData.secure_url,
      transformed_url: uploadData.eager?.[0]?.secure_url,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const uploadStructuredMedia = async (
  thumbnail: any,
  images: any[],
  video: any,
  audioFlag?: SoundEffectTypes
) => {
  const promises = [];

  promises.push(
    uploadFileToCloudinary(
      thumbnail.uri,
      { mediaType: "image" },
      thumbnail?.type,
      thumbnail?.name
    )
  );

  if (video) {
    promises.push(
      uploadFileToCloudinary(
        video.uri,
        { mediaType: "video", audioFlag },
        video.type,
        video.name
      )
    );
  }

  if (images.length > 0) {
    images.forEach((image) => {
      promises.push(
        uploadFileToCloudinary(
          image.uri,
          { mediaType: "image" },
          image.type,
          image.name
        )
      );
    });
  }

  try {
    const results = await Promise.all(promises);

    let resultIndex = 0;
    const thumbnailData = results[resultIndex++];

    let videoData = null;
    if (video) {
      videoData = results[resultIndex++];
    }

    const imagesData = results.slice(resultIndex);

    return {
      thumbnailData,
      videoData,
      imagesData,
    };
  } catch (error) {
    console.error("One or more uploads failed:", error);
    throw error;
  }
};
