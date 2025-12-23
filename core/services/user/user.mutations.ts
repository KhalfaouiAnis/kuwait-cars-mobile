import { httpClient } from "@/core/api/httpClient";
import useAuthStore from "@/core/store/auth.store";
import { UpdateProfileInterface } from "@/core/types/schema/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { signCloudinaryUpload } from "../cloud/cloudinary";

export const useUpdateProfile = () => {
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();
  const { setUser, user } = useAuthStore((state) => state);

  const mutation = useMutation({
    mutationFn: async (data: UpdateProfileInterface) => {
      const { avatar, ...profileData } = data;
      let avatarData = null;

      if (avatar && "uri" in avatar) {
        const { data: response } = await signCloudinaryUpload({
          mediaType: "profile_pic",
        });

        const uploadFormData = new FormData();

        uploadFormData.append("file", {
          uri: avatar.uri,
          type: avatar.type,
          name: `avatar_${user?.id}`,
        } as any);

        uploadFormData.append("api_key", response.apiKey);
        uploadFormData.append("signature", response.signature);
        uploadFormData.append("timestamp", response.params.timestamp);
        uploadFormData.append("upload_preset", response.params.upload_preset);
        uploadFormData.append("overwrite", true as any);
        uploadFormData.append("invalidate", true as any);

        const { data: cloudinaryRes } = await axios.postForm(
          response.uploadUrl,
          uploadFormData,
          {
            onUploadProgress: (ev) => {
              const percent = Math.round((ev.loaded * 100) / (ev.total || 1));
              setProgress(percent);
            },
          }
        );

        avatarData = {
          public_id: cloudinaryRes.public_id,
          original_url: cloudinaryRes.secure_url,
          media_type: "IMAGE",
        };
      }

      const { data: finalResponse } = await httpClient.patch("/users", {
        ...profileData,
        avatar: avatarData,
      });

      return finalResponse;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setProgress(0);
    },
    onError: () => setProgress(0),
  });

  return { ...mutation, uploadProgress: progress };
};
