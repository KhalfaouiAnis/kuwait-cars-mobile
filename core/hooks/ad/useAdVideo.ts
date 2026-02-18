import { AdMediaAsset } from "@/core/types/schema/shared";
import { generateId } from "@/core/utils";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Video, getFileSize } from "react-native-compressor";

export const useAdVideo = (
  field: ControllerRenderProps<FieldValues, string>,
  maxRecordingDuration?: number,
) => {
  const [loading, setLoading] = useState(false);

  const addVideo = async (fromCamera: boolean) => {
    try {
      const options: ImagePicker.ImagePickerOptions | undefined = {
        videoMaxDuration: maxRecordingDuration || 10,
        mediaTypes: ["videos"],
        videoQuality: 3,
        quality: 0.8,
      };

      const result = await (fromCamera
        ? ImagePicker.launchCameraAsync(options)
        : ImagePicker.launchImageLibraryAsync(options));

      if (result.canceled || !result.assets) return;

      setLoading(true);

      const { uri: originalUri } = result.assets[0];

      const compressedUri = await Video.compress(originalUri, { bitrate: 2 });

      const compressedSize = await getFileSize(compressedUri);

      const video: AdMediaAsset = {
        uri: compressedUri,
        media_type: "VIDEO",
        size: Number(compressedSize),
        type: result.assets[0].mimeType,
        id: result.assets[0].assetId || generateId(),
        name: result.assets[0].fileName || generateId(),
        duration: result.assets[0].duration || undefined,
      };

      field.onChange(video);
    } finally {
      setLoading(false);
    }
  };

  const removeVideo = () => {
    field.onChange(null);
  };

  return {
    loading,
    addVideo,
    removeVideo,
  };
};
