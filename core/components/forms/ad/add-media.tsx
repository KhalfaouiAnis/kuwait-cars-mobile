import { useAdMedia } from "@/core/hooks/ad/useAdMedia";
import { VehicleAdFormSteps } from "@/core/types/schema/vehicleAd";
import { cn } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PickFromGalleryGallery from "../../ui/button/open-gallery-button";
import TakePhotoButton from "../../ui/button/take-photo-button";
import AppModal from "../../ui/dialog/modal";
import VideoPlayer from "../../ui/shared/video-player";

const MAX_IMAGES = 10;

export default function AddMedia({ errors, setValue, getValue }: VehicleAdFormSteps) {
    const { images, thumbnail, video, tab, setTab, addMedia, removeMedia, setThumbnail, setImages, setVideo } = useAdMedia(setValue)
    const [showModal, setShowModal] = useState(false)

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
        const video = getValue?.("video")
        video && setVideo(video)
    }, [getValue, setThumbnail, setImages, setVideo])

    const renderPhoto = (photoUri: string, type: "thumbnail" | "video" | "images", key: string) => (
        <View key={key} className="relative mr-2 mb-2">
            <Image source={{ uri: photoUri }} style={{ width: "auto", height: type === "thumbnail" ? 200 : 80, borderRadius: 8 }} contentFit="fill" />
            <TouchableOpacity
                className="absolute -top-4 -right-2 bg-red-500 rounded-full w-7 h-7 justify-center items-center"
                onPress={() => removeMedia(photoUri, type === "thumbnail", type === "video")}
            >
                <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <View className="flex-row items-center justify-center mb-6 gap-2">
                <TouchableOpacity className={cn("rounded-full p-4", {
                    "bg-[#EEEEEE]": tab !== 0,
                    "bg-primary-500": tab === 0
                })} onPress={() => setTab(0)} >
                    <Text>Photos</Text>
                </TouchableOpacity>
                <TouchableOpacity className={cn("rounded-full p-4", {
                    "bg-[#EEEEEE]": tab !== 1,
                    "bg-primary-500": tab === 1
                })} onPress={() => setTab(1)} >
                    <Text>
                        Video
                    </Text>
                </TouchableOpacity>
            </View>
            {tab === 0 ? (
                thumbnail && thumbnail.uri ? (
                    <View className="gap-y-8">
                        <View>
                            <Text className="text-xl font-inter-bold mb-1">Add photos *</Text>
                            {renderPhoto(thumbnail.uri, "thumbnail", thumbnail.name)}
                            <Text className="justify-end ml-auto mr-4 font-semibold">Picked {images.length + 1} of {MAX_IMAGES}</Text>
                        </View>

                        {images.length < MAX_IMAGES && (
                            <View>
                                <TouchableOpacity className="w-full items-center justify-center h-12 gap-y-3 rounded-3xl border-2 border-primary-500"
                                    onPress={() => setShowModal(true)}
                                >
                                    <Text>Add secondary photos</Text>
                                </TouchableOpacity>
                                <AppModal
                                    onClose={() => setShowModal(false)}
                                    visible={showModal}
                                    renderContent={() => <View className="gap-y-4">
                                        <PickFromGalleryGallery small addMedia={() => addMedia(false, false, false)} />
                                        <TakePhotoButton label="Open Camera & Take Photo" addMedia={() => addMedia(true, false, false)} />
                                    </View>}
                                />
                            </View>
                        )}

                    </View>
                ) : (
                    <View className="gap-y-8">
                        <View className="gap-y-2">
                            <Text className="font-inter-semibold text-3xl">Good pictures sell faster</Text>
                            <Text numberOfLines={2}>Capture the front, back, and sides — buyers love seeing the full view</Text>
                        </View>
                        <View>
                            <Text className="text-xl font-inter-bold mb-1">Add photos *</Text>
                            <PickFromGalleryGallery addMedia={() => addMedia(false, false, true)} />
                        </View>
                        <View className="flex-row items-center justify-center">
                            <View className="border border-gray-300 w-2/5" />
                            <Text className="px-2">Or</Text>
                            <View className="border border-gray-300 w-2/5" />
                        </View>
                        <TakePhotoButton label="Open Camera & Take Photo" addMedia={() => addMedia(true, false, true)} />
                    </View>
                )
            ) : (
                <View className="gap-y-8">
                    <View className="gap-y-2">
                        <Text className="font-inter-semibold text-3xl">Attract more buyers</Text>
                        <Text numberOfLines={2}>A 10–30 second clip can help buyers see your car’s true condition</Text>
                    </View>
                    <View className="">
                        <Text className="text-xl font-inter-bold mb-1">Add Videos *</Text>
                        <PickFromGalleryGallery video addMedia={() => addMedia(false, true, false)} />
                    </View>
                    <View className="flex-row items-center justify-center">
                        <View className="border border-gray-300 w-2/5" />
                        <Text className="px-2">Or</Text>
                        <View className="border border-gray-300 w-2/5" />
                    </View>
                    <TakePhotoButton addMedia={() => addMedia(true, true, false)} label="Open Camera & Take Video" />
                </View>
            )}
            <View className="flex-row flex-wrap gap-3 mt-8 pb-8">
                {images.map(image => (
                    <View className="w-[31%]" key={image.name}>
                        {renderPhoto(image.uri, "images", image.name)}
                    </View>
                ))}
                {video && video.uri && (<View className="relative w-full pr-2">
                    <VideoPlayer source={video.uri} />
                    <TouchableOpacity
                        className="absolute -top-4 -right-0 bg-red-500 rounded-full w-7 h-7 justify-center items-center"
                        onPress={() => removeMedia(video.uri, false, true)}
                    >
                        <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                )
                }
            </View>
        </ScrollView>
    )
}