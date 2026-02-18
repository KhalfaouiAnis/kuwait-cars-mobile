import { UploadFileType } from "@/core/services/ads/ad.mutations";
import { signCloudinaryUpload } from "@/core/services/cloud/cloudinary";
import axios from "axios";
import { useState } from "react";
import { Platform } from "react-native";
import { toast } from "sonner-native";

type CloudinaryUploadResponse = {
  public_id: string;
  secure_url: string;
  eager: [{ secure_url: string }] | undefined;
};

export const useUploadMedia = () => {
  const [loading, setLoading] = useState(false);

  const upload = async (files: UploadFileType[]) => {
    toast.info("Uploading media, please wait!");
    setLoading(true);

    try {
      const uploadPromises = files.map(
        async ({ file, signingParams }, index) => {
          const { data: response } = await signCloudinaryUpload(signingParams);

          const formData = new FormData();

          formData.append("file", {
            uri:
              Platform.OS === "android"
                ? file.uri
                : file.uri?.replace("file://", ""),
            type: file.type,
            name: file.name,
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

          const { data } = await axios.post<CloudinaryUploadResponse>(
            response.uploadUrl,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              transformRequest: (data) => data,
              // onUploadProgress: (ev) => {
              //   const percent = Math.min(
              //     100,
              //     Math.round((ev.loaded * 100) / (ev.total || 1)),
              //   );
              //   setFileProgress((prev) => ({ ...prev, [index]: percent }));
              // },
            },
          );

          return {
            ...file,
            public_id: data.public_id,
            original_url: data.secure_url,
            transformed_url: data.eager?.[0]?.secure_url,
          };
        },
      );

      return Promise.all(uploadPromises);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // const totalProgress =
  //   currentBatchCount > 0
  //     ? Math.round(
  //         Object.values(fileProgress).reduce((a, b) => a + b, 0) /
  //           currentBatchCount,
  //       )
  //     : 0;

  return { upload, loading, setLoading };
};
