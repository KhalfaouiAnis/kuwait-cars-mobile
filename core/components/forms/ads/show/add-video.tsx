import VideoPlayer from "@/core/components/ui/shared/video-player";
import { useAdVideo } from "@/core/hooks/ad/useAdVideo";
import { AdFormStepProps, SoundEffectTypes } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Alert, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import PickFromGallery from "@/core/components/ui/button/media/open-gallery";
import PickFromGallerySM from "@/core/components/ui/button/media/open-gallery-sm";
import TakePhotoButton from "@/core/components/ui/button/media/take-photo";
import AudioPlayer from "@/core/components/ui/shared/audio-player";
import { SOUND_EFFECTS } from "@/core/constants/audio";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { ShowCarAdInterface } from "@/core/types/schema/ads/showCar";
import { clsx } from "clsx";

function soundSource(sound_effect: SoundEffectTypes) {
    if (sound_effect === 'mute') return;
    if (sound_effect === 'effect_1') return SOUND_EFFECTS.NoLuck
    if (sound_effect === 'effect_2') return SOUND_EFFECTS.YouWin
    if (sound_effect === 'effect_3') return SOUND_EFFECTS.NoLuck
    if (sound_effect === 'effect_4') return SOUND_EFFECTS.YouWin
    if (sound_effect === 'effect_5') return SOUND_EFFECTS.NoLuck

    throw "Sound effect not supported"
}

export default function AddVideo({ setValue, getValue, onSkip, t }: AdFormStepProps<ShowCarAdInterface>) {
    const [showModal, setShowModal] = useState(false)
    const [currentSoundEffect, setCurrentSoundEffect] = useState<SoundEffectTypes>("mute")
    const { video, loading, addVideo, removeVideo } = useAdVideo(setValue, getValue, 45)
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

    useEffect(() => {
        const soundEffect = getValue?.("sound_effect")
        soundEffect && setCurrentSoundEffect(soundEffect as SoundEffectTypes)
    }, [getValue])

    function handleSelectSoundEffect(effectId: SoundEffectTypes) {
        setCurrentSoundEffect(effectId)
        setValue?.("sound_effect", effectId)
        if (effectId === "mute") return;
        setShowModal(true)
    }

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
                    <View className="gap-y-8">
                        <View>
                            <Text className="text-xl font-inter-bold mb-2">{t("addVideoSoundEffect")}</Text>
                            <View className="relative w-full pr-2">
                                <VideoPlayer source={video.uri} />
                                <TouchableOpacity
                                    onPress={removeVideo}
                                    className="absolute -top-4 -right-0 bg-red-500 rounded-full w-7 h-7 justify-center items-center"
                                >
                                    <Ionicons name="close" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="mt-2 gap-3 flex-row-reverse flex-wrap">
                            <TouchableOpacity className={clsx("w-[31%] border-2 py-6 px-1 rounded-lg", {
                                "border-primary-500": currentSoundEffect !== "mute",
                                "border-error": currentSoundEffect === "mute",
                            })}
                                onPress={() => {
                                    setCurrentSoundEffect("mute")
                                }}
                            >
                                <Text className="text-center font-inter-semibold">{t("soundEffects.silent")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSelectSoundEffect("effect_1")}
                                className={clsx("w-[31%] border-2 py-6 px-1 rounded-lg", {
                                    "border-primary-500": currentSoundEffect !== "effect_1",
                                    "border-error": currentSoundEffect === "effect_1",
                                })}
                            >
                                <Text className="text-center font-inter-semibold">{t("soundEffects.Effect1")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSelectSoundEffect("effect_2")}
                                className={clsx("w-[31%] border-2 py-6 px-1 rounded-lg", {
                                    "border-primary-500": currentSoundEffect !== "effect_2",
                                    "border-error": currentSoundEffect === "effect_2",
                                })}>
                                <Text className="text-center font-inter-semibold">{t("soundEffects.Effect2")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSelectSoundEffect("effect_3")}
                                className={clsx("w-[31%] border-2 py-6 px-1 rounded-lg", {
                                    "border-primary-500": currentSoundEffect !== "effect_3",
                                    "border-error": currentSoundEffect === "effect_3",
                                })}>
                                <Text className="text-center font-inter-semibold">{t("soundEffects.Effect3")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSelectSoundEffect("effect_4")}
                                className={clsx("w-[31%] border-2 py-6 px-1 rounded-lg", {
                                    "border-primary-500": currentSoundEffect !== "effect_4",
                                    "border-error": currentSoundEffect === "effect_4",
                                })}>
                                <Text className="text-center font-inter-semibold">{t("soundEffects.Effect4")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSelectSoundEffect("effect_5")}
                                className={clsx("w-[31%] border-2 py-6 px-1 rounded-lg", {
                                    "border-primary-500": currentSoundEffect !== "effect_5",
                                    "border-error": currentSoundEffect === "effect_5",
                                })}>
                                <Text className="text-center font-inter-semibold">{t("soundEffects.Effect5")}</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            visible={showModal}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setShowModal(false)}
                        >
                            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                                <View className="flex-1 justify-center items-center bg-black/50">
                                    <View className="bg-white rounded-lg w-80 h-40 px-4 justify-center items-center overflow-hidden">
                                        <Text>{t("soundEffects.playingSound")} {currentSoundEffect}</Text>
                                        <View className="w-full h-14 mt-2">
                                            <AudioPlayer source={soundSource(currentSoundEffect)} />
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </View>
                )
            }
        </ScrollView>
    )
}