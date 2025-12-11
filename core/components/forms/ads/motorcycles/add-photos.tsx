import PickFromGallery from "@/core/components/ui/button/media/open-gallery";
import PickFromGallerySM from "@/core/components/ui/button/media/open-gallery-sm";
import TakePhotoButton from "@/core/components/ui/button/media/take-photo";
import { useAdPhotos } from "@/core/hooks/ad/useAdPhotos";
import { AdFormStepProps } from "@/core/types";
import { MotorcycleAdInterface } from "@/core/types/schema/ads/motorcycle";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

const MAX_IMAGES = 5;

export default function AddPhotos({ t, setValue, getValue }: AdFormStepProps<MotorcycleAdInterface>) {
    const { images, thumbnail, addPhoto, removePhoto, setThumbnail, setImages } = useAdPhotos(setValue)

    useEffect(() => {
        (async () => {
            const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

            if (libraryStatus.status !== 'granted') {
                Alert.alert('Permission denied', 'Gallery access is required for photo selection.');
            }
            if (cameraStatus.status !== 'granted') {
                Alert.alert('Permission denied', 'Camera access is required for taking photos.');
            }
        })();
    }, []);

    useEffect(() => {
        const thumbnail = getValue?.("thumbnail")
        thumbnail && setThumbnail(thumbnail)
        const images = getValue?.("images")
        images && setImages(images)
    }, [getValue, setThumbnail, setImages])

    const renderPhoto = (photoUri: string, type: "thumbnail" | "images", key: string) => (
        <View key={key} className="relative mr-2 mb-2">
            <Image source={{ uri: photoUri }} style={{ width: "auto", height: type === "thumbnail" ? 200 : 80, borderRadius: 8 }} contentFit="fill" />
            <TouchableOpacity
                className="absolute -top-4 -right-2 bg-red-500 rounded-full w-7 h-7 justify-center items-center"
                onPress={() => removePhoto(photoUri, type === "thumbnail")}
            >
                <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList showsVerticalScrollIndicator={false}
            data={[]}
            renderItem={() => <></>}
            ListHeaderComponent={<View>
                <View className="w-full items-center">
                    <View className="rounded-full mb-6 h-3 w-[60%] bg-[#EEEEEE]">
                        <View className="rounded-full bg-primary-500 w-1/2 h-3" />
                    </View>
                </View>
                <View className="gap-y-8">
                    {
                        thumbnail?.uri ? (<View>
                            <Text className="text-xl font-inter-bold mb-1 dark:text-white">{t("addPhotos")} <Text className="text-error">*</Text></Text>
                            {renderPhoto(thumbnail.uri, "thumbnail", thumbnail.name)}
                            <Text className="justify-end ml-auto mr-4 font-semibold dark:text-white"> {t("pickedXOofY", { pickedCount: images.length + 1, totalCount: MAX_IMAGES })}</Text>
                        </View>) : (
                            <View>
                                <View className="gap-y-6">
                                    <Text className="font-inter-semibold text-3xl dark:text-white">{t("goodPicturesSellFaster")}</Text>
                                    <Text numberOfLines={2} className="text-center dark:text-white">{t("capturePhoto")}</Text>
                                </View>
                                <View className="mt-4">
                                    <Text className="text-xl font-inter-bold mb-1 dark:text-white">{t("addPhotos")} <Text className="text-error">*</Text></Text>
                                    <PickFromGallery label="Select file" addMedia={() => addPhoto(false, true, false)} />
                                </View>
                            </View>
                        )
                    }
                    {
                        images?.length < MAX_IMAGES && <TakePhotoButton label="Open Camera & Take Photo" addMedia={() => addPhoto(true, true, false)} />
                    }
                    {images?.length < MAX_IMAGES && (
                        <View className="flex-row items-center justify-center">
                            <View className="border border-gray-300 w-2/5" />
                            <Text className="px-2 dark:text-white">Or</Text>
                            <View className="border border-gray-300 w-2/5" />
                        </View>
                    )}
                    {images?.length < MAX_IMAGES && <PickFromGallerySM label="Open Gallery" addMedia={() => addPhoto(false, false, true)} />}
                </View>

                <View className="flex-row flex-wrap gap-3 mt-8 pb-8">
                    {/* {
                                images && images.length > 0 && <ImageGrid images={images} />
                            } */}
                    {images?.map(image => (
                        <View className="w-[31%]" key={image.name}>
                            {renderPhoto(image.uri, "images", image.name)}
                        </View>
                    ))}
                </View>
            </View>}
        />
    )
}