// import { hideLisencePlate } from "@/core/lib/api/cloud/upload-to-cloudinary";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Video, getFileSize } from "react-native-compressor";

export const useAdVideo = (setValue: any, maxRecordingDuration?: number) => {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const addVideo = async (fromCamera: boolean) => {
    try {
      const options: ImagePicker.ImagePickerOptions | undefined = {
        mediaTypes: ["videos"],
        videoMaxDuration: maxRecordingDuration || 10,
        quality: 0.8,
        videoQuality: 3,
      };

      const result = await (fromCamera
        ? ImagePicker.launchCameraAsync(options)
        : ImagePicker.launchImageLibraryAsync(options));

      if (result.canceled || !result.assets) return;

      setLoading(true);

      const { uri: originalUri } = result.assets[0];

      const compressedUri = await Video.compress(originalUri, { bitrate: 2 });

      const compressedSize = await getFileSize(compressedUri);

      const fileObj: any = {
        uri: compressedUri,
        type: result.assets[0].mimeType,
        name: result.assets[0].fileName,
        size: compressedSize,
        duration: result.assets[0].duration,
      };

      // await hideLisencePlate(fileObj);

      setVideo(fileObj);
      setValue?.("video", fileObj);
    } finally {
      setLoading(false);
    }
  };

  const removeVideo = () => {
    setVideo(null);
    setValue("video", undefined);
  };

  return {
    loading,
    video,
    addVideo,
    removeVideo,
    setVideo,
  };
};
