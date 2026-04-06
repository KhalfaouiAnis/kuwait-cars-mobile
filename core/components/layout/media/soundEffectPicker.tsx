import { SOUND_EFFECTS } from "@/core/constants/audio";
import { SoundEffectTypes } from "@/core/types";
import { clsx } from "clsx";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { VideoSelectorProps } from "../../ui";
import AudioPlayer from "../../ui/shared/audio-player";

function soundSource(sound_effect: SoundEffectTypes) {
    if (sound_effect === 'mute') return;
    if (sound_effect === 'effect_1') return SOUND_EFFECTS.NoLuck
    if (sound_effect === 'effect_2') return SOUND_EFFECTS.YouWin
    if (sound_effect === 'effect_3') return SOUND_EFFECTS.NoLuck
    if (sound_effect === 'effect_4') return SOUND_EFFECTS.YouWin
    if (sound_effect === 'effect_5') return SOUND_EFFECTS.NoLuck

    // throw "Sound effect not supported"
}

const SOUND_EFFECTS_NAMES = [
    'mute',
    'effect_1',
    'effect_2',
    'effect_3',
    'effect_4',
    'effect_5',
]

export default function SoundEffectPicker({ name }: VideoSelectorProps) {
    const { control, } = useFormContext()
    const [showModal, setShowModal] = useState(false)
    const { t } = useTranslation("common")
    const { field: { onChange, value } } = useController({ name, control });

    return (
        <View className="gap-2 mt-6">
            <Text className="text-xl font-inter-bold mb-2 dark:text-white">{t("createAd.addVideoSoundEffect")}</Text>
            <View className="mt-2 gap-3 flex-row-reverse flex-wrap">
                {
                    SOUND_EFFECTS_NAMES.map(effect => (
                        <TouchableOpacity key={effect} className={clsx("w-[31%] border-2 py-6 px-1 rounded-lg", {
                            "border-primary-500": value !== effect,
                            "border-error": value === effect,
                        })}
                            onPress={() => {
                                onChange(effect)
                                if (effect === "mute") return;
                                setShowModal(true)
                            }}
                        >
                            <Text className="text-center font-inter-semibold dark:text-white">
                                {t(`createAd.soundEffects.${effect}`)}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <Modal
                transparent
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-lg w-80 h-40 px-4 justify-center items-center overflow-hidden">
                            <Text>{t("createAd.soundEffects.playingSound")} {t(`createAd.soundEffects.${value}`)}</Text>
                            <View className="w-full h-14 mt-2">
                                <AudioPlayer source={soundSource(value)} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}