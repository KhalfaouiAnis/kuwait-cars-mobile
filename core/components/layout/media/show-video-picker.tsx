import { VideoSelectorProps } from "@/core/components/ui";
import PickFromGallery from "@/core/components/ui/button/media/open-gallery";
import PickFromGallerySM from "@/core/components/ui/button/media/open-gallery-sm";
import TakePhotoButton from "@/core/components/ui/button/media/take-photo";
import VideoPlayer from "@/core/components/ui/shared/video-player";
import { DIMENSIONS } from "@/core/constants";
import { useAdVideo } from "@/core/hooks/ad/useAdVideo";
import { useAdDraftStore } from "@/core/store/adDrafts.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from "react";
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const { width } = DIMENSIONS

export default function ShowVideoPicker({ name }: VideoSelectorProps) {
    const { control, setValue } = useFormContext()
    const { t } = useTranslation("common")
    const { isRTL } = useUserPreferencesStore()
    const { field } = useController({ name, control });
    const { drafts, activeId, saveStep } = useAdDraftStore();
    const { loading, addVideo, removeVideo } = useAdVideo(field)

    const handleSkip = () => {
        saveStep(drafts[activeId!].step_index + 1)
        setValue("video", undefined)
    }

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
        <View>
            <View className="items-center mb-6">
                <View className="flex-row items-center ms-6">
                    <View className="rounded-full h-3 bg-primary-500 w-[60%]">
                        <View className="rounded-full bg-[#EEEEEE] w-1/2 h-3" />
                    </View>
                    <TouchableOpacity className="flex-row items-center ms-6" onPress={handleSkip}>
                        <Text className="text-lg dark:text-white">{t("skip")}</Text>
                        <Ionicons name="chevron-forward" size={18} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                (!field.value?.transformed_url && !field.value?.uri) && (
                    <View className="gap-y-5">
                        <View className="gap-y-2 px-4">
                            <Text className="font-inter-medium text-2xl text-center text-blue dark:text-white">{t("createAd.AttractMoreBuyers")}</Text>
                            <Text className="text-center dark:text-white" numberOfLines={2}>
                                {t("createAd.VideoClip", { minDuration: 15, maxDuration: 45 })}
                            </Text>
                        </View>
                        <View style={{ direction: isRTL ? "rtl" : "ltr", marginBottom: 12 }}>
                            <Text className="text-xl font-inter-medium mb-1 ms-6 text-blue dark:text-white">{t("createAd.AddVideos")}</Text>
                            <PickFromGallery disabled={loading} label={t("createAd.selectFile")} video addMedia={() => addVideo(false)} />
                        </View>
                        <TakePhotoButton disabled={loading} label={t("createAd.openCameraTakeVideo")} addMedia={() => addVideo(true)} />
                        <View className="flex-row items-center justify-center">
                            <View className="border-[0.5px] border-gray-200 w-2/5" />
                            <Text className="px-2 dark:text-white text-error">{t("or")}</Text>
                            <View className="border-[0.5px] border-gray-200 w-2/5" />
                        </View>
                        <PickFromGallerySM label={t("createAd.openGallery")} addMedia={() => addVideo(false)} />
                    </View>
                )
            }
            {
                (field.value?.uri || field.value?.transformed_url) && (
                    <View
                        className="relative pr-2 flex-1 mx-auto"
                        style={{ width: width - 40, height: 230 }}
                    >
                        <VideoPlayer source={field.value.transformed_url || field.value.uri}  />
                        <TouchableOpacity
                            onPress={removeVideo}
                            className="absolute -top-3 -right-0 bg-red-500 rounded-full w-8 h-8 justify-center items-center"
                        >
                            <Ionicons name="close" size={26} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )

}