import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, getFileSize } from "react-native-compressor";

export const useAdPhotos = (setValue: any, MAX_IMAGES?: number) => {
  const [images, setImages] = useState<any[]>([]);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const addPhoto = async (
    fromCamera: boolean,
    forThumbnail: boolean,
    multiple: boolean
  ) => {
    try {
      const options: ImagePicker.ImagePickerOptions | undefined = {
        mediaTypes: ["images"],
        aspect: [4, 3],
        allowsEditing: !multiple,
        quality: 0.8,
        allowsMultipleSelection: multiple,
        orderedSelection: multiple,
        selectionLimit: (MAX_IMAGES || 6) - images.length,
      };

      const result = await (fromCamera
        ? ImagePicker.launchCameraAsync(options)
        : ImagePicker.launchImageLibraryAsync(options));

      if (result.canceled || !result.assets) return;

      if (multiple) {
        const processingPromises = result.assets.map(async (asset) => {
          const compressedUri = await Image.compress(asset.uri, {
            output: "jpg",
            disablePngTransparency: true,
          });
          const compressedSize = await getFileSize(compressedUri);

          return {
            id: asset.assetId || Math.random() * 1000 + "",
            uri: compressedUri,
            type: "IMAGE",
            name: asset.fileName,
            size: compressedSize,
          };
        });
        const newPhotos: any[] = await Promise.all(processingPromises);

        setImages((prevState) => {
          setValue("images", [thumbnail,...prevState, ...newPhotos]);
          return [...prevState, ...newPhotos];
        });
        return;
      }

      const { uri } = result.assets[0];

      const compressedUri = await Image.compress(uri, {
        output: "jpg",
        disablePngTransparency: true,
      });

      const compressedSize = await getFileSize(compressedUri);

      const fileObj: any = {
        id: result.assets[0].assetId || Math.random() * 10000 + "",
        uri: compressedUri,
        type: forThumbnail ? "THUMBNAIL" : "IMAGE",
        name: result.assets[0].fileName,
        size: compressedSize,
      };

      if (forThumbnail) {
        setThumbnail(fileObj);
        setValue("thumbnail", fileObj);
        setImages((prevState) => {
          setValue("images", [fileObj, ...prevState]);
          return [fileObj, ...prevState];
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = (uri: string, isThumbnail: boolean) => {
    if (isThumbnail) {
      setThumbnail(null);
      setValue("thumbnail", undefined);
      return;
    }
    setImages((prev) => {
      const filtered = prev.filter((u) => u.uri !== uri);
      setValue("images", filtered);
      return filtered;
    });
  };

  return {
    images,
    loading,
    thumbnail,
    addPhoto,
    removePhoto,
    setThumbnail,
    setImages,
  };
};
