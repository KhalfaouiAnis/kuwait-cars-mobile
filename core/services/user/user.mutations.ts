import { httpClient } from "@/core/api/httpClient";
import { useUploadMedia } from "@/core/hooks/shared/use-upload-media";
import useAuthStore from "@/core/store/auth.store";
import { UpdateProfileInterface } from "@/core/types/schema/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const { setLoading, upload } = useUploadMedia();
  const queryClient = useQueryClient();
  const { setUser, user } = useAuthStore((state) => state);

  const mutation = useMutation({
    mutationFn: async (data: UpdateProfileInterface) => {
      const { avatar, ...profileData } = data;
      let avatarData = null;

      if (avatar && "uri" in avatar) {
        const uploadResponse = await upload([
          {
            file: {
              ...avatar,
              name: `avatar_${user?.id}`,
              media_type: "IMAGE",
            },
            signingParams: { mediaType: "profile_pic" },
          },
        ]);
        if (uploadResponse) {
          avatarData = uploadResponse[0];
        }
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
    },
    onSettled: () => setLoading(false),
  });

  return { ...mutation };
};
