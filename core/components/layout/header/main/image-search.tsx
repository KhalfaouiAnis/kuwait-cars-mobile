import PickFromGallerySM from "@/core/components/ui/button/media/open-gallery-sm";
import TakePhotoButton from "@/core/components/ui/button/media/take-photo";
import AppModal from "@/core/components/ui/dialog/modal";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Image } from "react-native-compressor";

export default function ImageSearch() {
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation("common");
    const { dark } = useTheme();

    const selectImage = async (fromCamera: boolean) => {
        try {
            const options: ImagePicker.ImagePickerOptions | undefined = {
                mediaTypes: ["images"],
                quality: 0.8,
            };

            const result = await (fromCamera
                ? ImagePicker.launchCameraAsync(options)
                : ImagePicker.launchImageLibraryAsync(options));

            if (result.canceled || !result.assets) return;

            const { uri: originalUri } = result.assets[0];

            const compressedUri = await Image.compress(originalUri, {
                output: "jpg",
            });

            const formData = new FormData();
            formData.append('image', {
                uri: compressedUri,
                type: result.assets[0].mimeType,
                name: result.assets[0].fileName,
            } as any);

            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/api/v1/ads/search/visual", {
                method: 'POST',
                body: formData,
                
            });

            const results = await response.json();

            console.log(results);

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Pressable hitSlop={6} onPress={() => setShowModal(true)}>
                <Ionicons
                    name="camera-outline"
                    size={24}
                    color={dark ? "#ffffffb3" : "#000000b3"}
                />
            </Pressable>
            <AppModal
                onClose={() => setShowModal(false)}
                visible={showModal}
                renderContent={() => (
                    <View className="gap-y-4">
                        <PickFromGallerySM
                            label={t("profile.openGallery")}
                            addMedia={() => {
                                selectImage(false)
                                setShowModal(false);
                            }}
                        />
                        <TakePhotoButton
                            label={t("profile.OpenCameraTakePhoto")}
                            addMedia={() => {
                                selectImage(true)
                                setShowModal(false);
                            }}
                        />
                    </View>
                )}
            />
        </>
    )
}