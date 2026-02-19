import { MediaAsset } from "@/core/types/schema/shared";
import { generateId } from "@/core/utils";
import * as ImagePicker from "expo-image-picker";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { getFileSize, Image } from "react-native-compressor";

export const useAvatar = (
  field: ControllerRenderProps<FieldValues, string>,
) => {
  const addAvatar = async (fromCamera: boolean) => {
    try {
      const options: ImagePicker.ImagePickerOptions | undefined = {
        mediaTypes: ["images"],
        videoQuality: 3,
        quality: 0.8,
      };

      const result = await (fromCamera
        ? ImagePicker.launchCameraAsync(options)
        : ImagePicker.launchImageLibraryAsync(options));

      if (result.canceled || !result.assets) return;

      const { uri: originalUri } = result.assets[0];

      const compressedUri = await Image.compress(originalUri, {
        output: "jpg",
        disablePngTransparency: true,
      });

      const compressedSize = await getFileSize(compressedUri);

      const video: MediaAsset = {
        uri: compressedUri,
        media_type: "IMAGE",
        size: Number(compressedSize),
        type: result.assets[0].mimeType,
        id: result.assets[0].assetId || generateId(),
        name: result.assets[0].fileName || generateId(),
      };

      field.onChange(video);
    } catch (e) {
      console.log(e);
    }
  };

  const removeAvatar = () => {
    field.onChange(null);
  };

  return {
    addAvatar,
    removeAvatar,
  };
};
