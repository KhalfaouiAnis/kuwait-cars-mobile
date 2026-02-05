import { generateId } from "@/core/utils";
import * as ImagePicker from "expo-image-picker";
import { useMemo } from "react";
import { Image, getFileSize } from "react-native-compressor";

export const useMediaUploader = (
  thumbnail: any,
  images: any[],
  onSync: (nextThumb: any, nextImages: any[]) => void,
  maxImages: number,
) => {
  const currentGallery = useMemo(() => {
    return thumbnail ? [thumbnail, ...images] : images;
  }, [thumbnail, images]);
  const gallery = thumbnail ? [thumbnail, ...images] : images;

  const addPhoto = async (
    fromCamera: boolean,
    forThumbnail: boolean,
    multiple: boolean,
  ) => {
    try {
      const options: ImagePicker.ImagePickerOptions | undefined = {
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 0.8,
        allowsMultipleSelection: multiple,
        orderedSelection: multiple,
        selectionLimit: (maxImages || 6) - gallery.length,
      };

      const result = fromCamera
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);

      if (result.canceled) return;

      let nextGallery = [...gallery];

      if (multiple) {
        const promises = result.assets.map(async (asset) => {
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

      syncForm(nextGallery.slice(0, maxImages));
    } catch (e) {
      console.log(e);
    }
  };

  const removePhoto = (id: string) => {
    const nextGallery = gallery.filter((img) => img.id !== id);
    syncForm(nextGallery);
  };

  const setAsThumbnail = (id: string) => {
    const selectedIndex = currentGallery.findIndex((img) => img.id === id);
    if (selectedIndex <= 0) return;

    const nextGallery = [...currentGallery];
    const [selectedItem] = nextGallery.splice(selectedIndex, 1);
    nextGallery.unshift(selectedItem);

    syncForm(nextGallery);
  };

  const syncForm = (updatedGallery: any[]) => {
    if (updatedGallery.length === 0) {
      onSync(undefined, []);
      return;
    }
    const nextThumb = updatedGallery[0];
    const nextImages = updatedGallery.slice(1);
    onSync(nextThumb, nextImages);
  };

  return {
    gallery: currentGallery,
    thumbnail: currentGallery[0] || undefined,
    addPhoto,
    removePhoto,
    setAsThumbnail,
  };
};
