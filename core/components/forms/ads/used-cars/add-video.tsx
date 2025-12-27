import VideoPlayer from "@/core/components/ui/shared/video-player";
import { useAdVideo } from "@/core/hooks/ad/useAdVideo";
import { AdFormStepProps } from "@/core/types";
import { UsedCarAdInterface } from "@/core/types/schema/ads/usedCar";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import PickFromGallery from "@/core/components/ui/button/media/open-gallery";
import PickFromGallerySM from "@/core/components/ui/button/media/open-gallery-sm";
import TakePhotoButton from "@/core/components/ui/button/media/take-photo";
import useUserPreferencesStore from "@/core/store/preferences.store";

export default function AddVideo({ setValue, getValue, onSkip, t }: AdFormStepProps<UsedCarAdInterface>) {
    const { video, loading, addVideo, removeVideo } = useAdVideo(setValue, getValue)
    const { isRTL } = useUserPreferencesStore()

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
            <View className="items-center mb-6">
                <View className="flex-row items-center ms-6">
                    <View className="rounded-full h-3 bg-primary-500 w-[60%]">
                        <View className="rounded-full bg-[#EEEEEE] w-1/2 h-3" />
                    </View>
                    <TouchableOpacity className="flex-row items-center ms-6" onPress={onSkip}>
                        <Text className="text-lg dark:text-white">{t("Skip")}</Text>
                        <Ionicons name="chevron-forward" size={18} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                !video?.uri && (
                    <View className="gap-y-8">
                        <View className="gap-y-2">
                            <Text className="font-inter-semibold text-3xl text-center dark:text-white">{t("AttractMoreBuyers")}</Text>
                            <Text className="text-center dark:text-white" numberOfLines={2}>
                                {t("VideoClip", { minDuration: 5, maxDuration: 15 })}
                            </Text>
                        </View>
                        <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
                            <Text className="text-xl font-inter-bold mb-1 dark:text-white">{t("AddVideos")}</Text>
                            <PickFromGallery disabled={loading} label={t("selectFile")} video addMedia={() => addVideo(false)} />
                        </View>
                        <TakePhotoButton disabled={loading} label={t("openCameraTakeVideo")} addMedia={() => addVideo(true)} />
                        <View className="flex-row items-center justify-center">
                            <View className="border border-gray-300 w-2/5" />
                            <Text className="px-2 dark:text-white">{t("Or")}</Text>
                            <View className="border border-gray-300 w-2/5" />
                        </View>
                        <PickFromGallerySM label={t("openGallery")} addMedia={() => addVideo(false)} />
                    </View>
                )
            }

            {
                video && video?.uri && (
                    <View>
                        <View className="relative w-full pr-2">
                            <VideoPlayer source={video.uri} />
                            <TouchableOpacity
                                onPress={removeVideo}
                                className="absolute -top-3 -right-0 bg-red-500 rounded-full w-8 h-8 justify-center items-center"
                            >
                                <Ionicons name="close" size={26} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}