import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const useAdMedia = (setValue: any) => {
  const [tab, setTab] = useState(0);
  const [images, setImages] = useState<any[]>([]);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);

  const addMedia = async (
    fromCamera: boolean,
    videoType: boolean,
    forThumbnail: boolean
  ) => {
    const options: ImagePicker.ImagePickerOptions | undefined = {
      mediaTypes: [videoType ? "videos" : "images"],
      aspect: [4, 3],
      videoMaxDuration: 30,
      quality: videoType ? 1 : 0.8,
    };
    const result = await (fromCamera
      ? ImagePicker.launchCameraAsync(options)
      : ImagePicker.launchImageLibraryAsync(options));

    if (result.canceled || !result.assets) return;

    const fileObj: any = {
      uri: result.assets[0].uri,
      type: result.assets[0].mimeType,
      name: result.assets[0].fileName,
      size: result.assets[0].fileSize,
      duration: result.assets[0].duration
        ? result.assets[0].duration
        : undefined,
    };

    if (videoType) {
      setVideo(fileObj);
      setValue?.("video", fileObj);
      return;
    }

    if (forThumbnail) {
      setThumbnail(fileObj);
      setValue?.("thumbnail", fileObj);
      return;
    }

    setImages((prevState) => {
      setValue?.("images", [...prevState, fileObj]);
      return [...prevState, fileObj];
    });
  };

  const removeMedia = (uri: string, isThumbnail: boolean, isVideo: boolean) => {
    if (isThumbnail) {
      setThumbnail(null);
      setValue("thumbnail", undefined);
      return;
    }
    if (isVideo) {
      setVideo(null);
      setValue("video", undefined);
      return;
    }
    setImages((prev) => {
      const filtered = prev.filter((u) => u.uri !== uri);
      setValue("images", filtered);
      return filtered;
    });
  };

  return {
    addMedia,
    removeMedia,
    images,
    thumbnail,
    video,
    tab,
    setTab,
    setThumbnail,
    setImages,
    setVideo,
  };
};
