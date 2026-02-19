import { MediaAsset } from "@/core/types/schema/shared";
import { generateId } from "@/core/utils";
import * as ImagePicker from "expo-image-picker";
import { Image, getFileSize } from "react-native-compressor";

export const useMediaUploader = (
  maxImages: number,
  fields: any[],
  append: any,
  move: (from: number, to: number) => void,
  update: any,
) => {
  const pickImages = async (fromCamera: boolean, multiple: boolean) => {
    const options: ImagePicker.ImagePickerOptions | undefined = {
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.8,
      allowsMultipleSelection: multiple,
      orderedSelection: multiple,
      selectionLimit: (maxImages || 6) - fields.length,
    };

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (result.canceled) return;

    if (!result.canceled) {
      const promises = result.assets.map(async (asset) => {
        const compressedUri = await Image.compress(asset.uri, {
          output: "jpg",
          disablePngTransparency: true,
        });

        const compressedSize = await getFileSize(compressedUri);

        const newAsset: MediaAsset = {
          id: asset.assetId || generateId(),
          type: asset.mimeType,
          uri: compressedUri,
          name: asset.fileName || generateId(),
          size: Number(compressedSize),
          media_type: fields.length === 0 ? "THUMBNAIL" : "IMAGE",
        };
        append(newAsset);
      });
      await Promise.all(promises);
    }
  };

  const setThumbnail = (index: number) => {
    if (index === 0) return;

    // move(index, 0);

    // We don't even need a loop. Just update the two specific indices.
    update(0, { ...fields[index], media_type: "THUMBNAIL" });
    update(index, { ...fields[0], media_type: "IMAGE" });
  };

  return {
    pickImages,
    setThumbnail,
  };
};
