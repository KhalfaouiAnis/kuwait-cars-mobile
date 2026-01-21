import { generateId } from "@/core/utils";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, getFileSize } from "react-native-compressor";

export const useAdPhotos = (
  setValue: any,
  getValue: any,
  MAX_IMAGES?: number,
) => {
  const [gallery, setGallery] = useState<any[]>(() => {
    const currentThumb = getValue("thumbnail");
    const currentImages = getValue("images") || [];
    return currentThumb ? [currentThumb, ...currentImages] : currentImages;
  });

  const addPhoto = async (
    fromCamera: boolean,
    forThumbnail: boolean,
    multiple: boolean,
  ) => {
    try {
      const options: ImagePicker.ImagePickerOptions | undefined = {
        mediaTypes: ["images"],
        aspect: [4, 3],
        // allowsEditing: !multiple,
        quality: 0.8,
        allowsMultipleSelection: multiple,
        orderedSelection: multiple,
        selectionLimit: (MAX_IMAGES || 6) - gallery.length,
      };

      const result = await (fromCamera
        ? ImagePicker.launchCameraAsync(options)
        : ImagePicker.launchImageLibraryAsync(options));

      if (result.canceled || !result.assets) return;

      let nextGallery = [...gallery];

      if (multiple) {
        const promises = result.assets.map(async (asset, index) => {
          const compressedUri = await Image.compress(asset.uri, {
            output: "jpg",
            disablePngTransparency: true,
          });

          const compressedSize = await getFileSize(compressedUri);

          return {
            id: asset.assetId || generateId(),
            type: asset.mimeType,
            uri: compressedUri,
            name: asset.fileName,
            size: compressedSize,
          };
        });
        const newPhotos: any[] = await Promise.all(promises);
        nextGallery = [...nextGallery, ...newPhotos];
      } else {
        const { uri } = result.assets[0];

        const compressedUri = await Image.compress(uri, {
          output: "jpg",
          disablePngTransparency: true,
        });

        const compressedSize = await getFileSize(compressedUri);

        const fileObj: any = {
          id: result.assets[0].assetId || generateId(),
          uri: compressedUri,
          type: result.assets[0].mimeType,
          name: result.assets[0].fileName,
          size: compressedSize,
        };

        if (forThumbnail) {
          nextGallery = [fileObj, ...nextGallery];
        } else {
          nextGallery = [...nextGallery, fileObj];
        }
      }

      syncForm(nextGallery.slice(0, MAX_IMAGES));
    } catch (e) {
      console.log(e);
    }
  };

  const removePhoto = (id: string) => {
    const nextGallery = gallery.filter((img) => img.id !== id);
    syncForm(nextGallery);
  };

  const setAsThumbnail = (id: string) => {
    const itemIndex = gallery.findIndex((img) => img.id === id);

    if (itemIndex <= 0) return;

    const newGallery = [...gallery];
    const [selectedItem] = newGallery.splice(itemIndex, 1);
    newGallery.unshift(selectedItem);

    syncForm(newGallery);
  };

  const syncForm = (updatedGallery: any[]) => {
    setGallery(updatedGallery);
    if (updatedGallery.length > 0) {
      const [newThumb, ...others] = updatedGallery;
      setValue("thumbnail", newThumb, { shouldValidate: true });
      setValue("images", others, { shouldValidate: true });
    } else {
      setValue("thumbnail", null, { shouldValidate: true });
      setValue("images", [], { shouldValidate: true });
    }
  };

  const reorderGallery = (newData: any[]) => {
    syncForm(newData);
  };

  return {
    addPhoto,
    removePhoto,
    reorderGallery,
    setAsThumbnail,
    gallery,
    thumbnail: gallery[0] || null,
  };
};
