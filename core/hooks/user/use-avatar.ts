import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const useAvatar = (setValue: any) => {
  const [avatar, setAvatar] = useState<any>(null);

  const addAvatar = async (fromCamera: boolean) => {
    const options: ImagePicker.ImagePickerOptions | undefined = {
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.8,
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
    };

    setAvatar(fileObj);
    setValue?.("avatar", fileObj);
  };

  const removeAvatar = (uri: string) => {
    setAvatar(null);
    setValue("avatar", undefined);
    return;
  };

  return {
    avatar,
    addAvatar,
    setAvatar,
    removeAvatar,
  };
};
