import PickFromGallery from "@/core/components/ui/button/media/open-gallery";
import PickFromGallerySM from "@/core/components/ui/button/media/open-gallery-sm";
import TakePhotoButton from "@/core/components/ui/button/media/take-photo";
import { useAdPhotos } from "@/core/hooks/ad/useAdPhotos";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AdFormStepProps } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ImageGallery from "../image-gallery";

const MAX_IMAGES = 6;

export default function AddPhotos<T extends FieldValues>({ setValue, getValue }: AdFormStepProps<T>) {
    const { gallery, thumbnail, addPhoto, removePhoto, setAsThumbnail } = useAdPhotos(setValue, getValue, MAX_IMAGES)
    const { isRTL } = useUserPreferencesStore()
    const { t } = useTranslation("common")

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

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}>
            <View>
                <View className="w-full items-center">
                    <View className="rounded-full mb-6 h-3 w-[60%] bg-[#EEEEEE]">
                        <View className="rounded-full bg-primary-500 w-1/2 h-3" />
                    </View>
                </View>
                <View className="gap-y-5">
                    {
                        thumbnail?.uri ? (
                            <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
                                <Text className="text-xl font-inter-bold mb-1 dark:text-white">
                                    {t("createAd.addPhotos")}<Text className="text-error">*</Text>
                                </Text>
                                <View className="relative mr-2 mb-2" style={{ marginTop: isRTL ? 10 : 0 }}>
                                    <Image source={{ uri: thumbnail.uri }} style={{ width: "auto", height: 200, borderRadius: 8 }} contentFit="cover" />
                                    <TouchableOpacity
                                        className="absolute z-50 -top-4 right-4 bg-red-500 rounded-full w-8 h-8 justify-center items-center border border-white"
                                        onPress={() => removePhoto(thumbnail.id)}
                                    >
                                        <Ionicons name="close" size={24} color="white" className='border rounded-full border-white' />
                                    </TouchableOpacity>
                                </View>
                                <Text className="ml-auto mr-4 font-semibold dark:text-white">
                                    {t("createAd.pickedXOofY", { pickedCount: gallery.length, totalCount: MAX_IMAGES })}
                                </Text>
                            </View>
                        ) : (
                            <View>
                                <View className="gap-y-6">
                                    <Text className="font-inter-semibold text-center text-3xl dark:text-white">{t("createAd.goodPicturesSellFaster")}</Text>
                                    <Text numberOfLines={2} className="text-center dark:text-white">{t("createAd.capturePhoto")}</Text>
                                </View>
                                <View className="mt-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                                    <Text className="text-xl font-inter-bold mb-1 dark:text-white">
                                        {t("createAd.addPhotos")}<Text className="text-error">*</Text>
                                    </Text>
                                    <PickFromGallery label={t("createAd.selectFile")} addMedia={() => addPhoto(false, true, false)} />
                                </View>
                            </View>
                        )
                    }
                    {
                        gallery?.length < MAX_IMAGES && <TakePhotoButton label={t("createAd.openCameraTakePhoto")} addMedia={() => addPhoto(true, true, false)} />
                    }
                    {gallery?.length < MAX_IMAGES && (
                        <View className="flex-row items-center justify-center">
                            <View className="border border-gray-100 w-2/5" />
                            <Text className="px-2 dark:text-white text-error">{t("or")}</Text>
                            <View className="border border-gray-100 w-2/5" />
                        </View>
                    )}
                    {gallery?.length < MAX_IMAGES && <PickFromGallerySM label={t("createAd.openGallery")} addMedia={() => addPhoto(false, false, true)} />}
                </View>

                <View className="mt-8 pb-8">
                    {
                        gallery?.length > 0 && <ImageGallery
                            data={gallery}
                            removePhoto={removePhoto}
                            setAsThumbnail={setAsThumbnail}
                            mainImageLabel={t("createAd.MainPhoto")}
                        />
                    }
                </View>
            </View>
        </ScrollView>
    )
}