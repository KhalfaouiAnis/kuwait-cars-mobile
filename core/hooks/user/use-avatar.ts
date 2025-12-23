import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { getFileSize, Image } from "react-native-compressor";

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

    const { uri } = result.assets[0];

    const compressedUri = await Image.compress(uri, {
      output: "jpg",
      disablePngTransparency: true,
    });

    const compressedSize = await getFileSize(compressedUri);

    const fileObj: any = {
      uri: compressedUri,
      type: result.assets[0].mimeType,
      name: result.assets[0].fileName,
      size: compressedSize,
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
