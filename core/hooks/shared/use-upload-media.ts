import { UploadFileType } from "@/core/services/ads/ad.mutations";
import { signCloudinaryUpload } from "@/core/services/cloud/cloudinary";
import axios from "axios";
import { useState } from "react";

type CloudinaryUploadResponse = {
  public_id: string;
  secure_url: string;
  eager: [{ secure_url: string }] | undefined;
};

export const useUploadMedia = () => {
  const [fileProgress, setFileProgress] = useState<Record<number, number>>({});

  const upload = async (files: UploadFileType[]) => {
    try {
      const uploadPromises = files.map(
        async (
          { file: { uri, type, name }, media_type, signingParams },
          index
        ) => {
          const { data: response } = await signCloudinaryUpload(signingParams);

          const formData = new FormData();

          formData.append("file", {
            uri: uri,
            type: type,
            name: name,
          } as any);

          formData.append("api_key", response.apiKey);
          formData.append("signature", response.signature);
          formData.append("timestamp", response.params.timestamp);
          formData.append("upload_preset", response.params.upload_preset);

          if (response.params.eager) {
            formData.append("eager", response.params.eager);
          }

          if (response.params.upload_preset === "x_cars_avatars") {
            formData.append("overwrite", true as any);
            formData.append("invalidate", true as any);
          }

          const { data } = await axios.postForm<CloudinaryUploadResponse>(
            response.uploadUrl,
            formData,
            {
              onUploadProgress: (ev) => {
                const percent = Math.round((ev.loaded * 100) / (ev.total || 0));
                setFileProgress((prev) => ({ ...prev, [index]: percent }));
              },
            }
          );

          return {
            public_id: data.public_id,
            original_url: data.secure_url,
            transformed_url: data.eager?.[0]?.secure_url,
            media_type,
          };
        }
      );

      return Promise.all(uploadPromises);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const totalFiles = Object.keys(fileProgress).length;
  const totalProgress =
    totalFiles > 0
      ? Math.round(
          Object.values(fileProgress).reduce((a, b) => a + b, 0) / totalFiles
        )
      : 0;

  return { upload, setFileProgress, totalProgress };
};
