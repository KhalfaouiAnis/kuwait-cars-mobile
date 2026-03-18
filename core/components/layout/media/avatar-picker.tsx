import { IMAGES } from "@/core/constants/images";
import { useAvatar } from "@/core/hooks/user/use-avatar";
import { User } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import PickFromGallerySM from "../../ui/button/media/open-gallery-sm";
import TakePhotoButton from "../../ui/button/media/take-photo";
import AppModal from "../../ui/dialog/modal";

interface Props {
    user: User | null;
    control?: Control<FieldValues, any, FieldValues> | undefined
}

export default function AvatarPicker({ user, control }: Props) {
    const { field } = useController({ name: "avatar", control });
    const [showModal, setShowModal] = useState(false);
    const { addAvatar } = useAvatar(field);
    const { t } = useTranslation("common");

    return (
        <>
            <Pressable className="relative items-end" onPress={() => setShowModal(true)}>
                {field?.value ? (
                    <Image
                        source={{ uri: field.value?.original_url ? field.value?.original_url : field.value?.uri }}
                        style={{ width: 75, height: 75, borderRadius: 50 }}
                        contentFit="cover"
                    />
                ) : (
                    <Image
                        source={
                            user?.avatar
                                ? { uri: user?.avatar?.original_url }
                                : IMAGES.DefaultAvatar
                        }
                        style={{ width: 75, height: 75, borderRadius: 50 }}
                        contentFit="cover"
                    />
                )}
                <View className="absolute -left-7 bottom-1 z-10 bg-white rounded-full p-2">
                    <Ionicons name="camera-outline" size={24} />
                </View>
            </Pressable>
            <AppModal
                onClose={() => setShowModal(false)}
                visible={showModal}
                renderContent={() => (
                    <View className="gap-y-4">
                        <PickFromGallerySM
                            label={t("profile.openGallery")}
                            addMedia={() => {
                                addAvatar(false);
                                setShowModal(false);
                            }}
                        />
                        <TakePhotoButton
                            label={t("profile.OpenCameraTakePhoto")}
                            addMedia={() => {
                                addAvatar(true);
                                setShowModal(false);
                            }}
                        />
                    </View>
                )}
            />
        </>
    )
}