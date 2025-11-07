import { VehicleAdFormSteps } from "@/core/types/schema/vehicleAd";
import { cn } from "@/core/utils/cn";
import { EvilIcons, Ionicons, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AddMedia({ control, errors, setValue }: VehicleAdFormSteps) {
    const [tab, setTab] = useState(0)
    const [thumbnail, setThumbnail] = useState<any>(null);
    const [images, setImages] = useState<any[]>([]);
    const [video, setVideo] = useState<any>(null);

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

    const pickFromGallery = async (videoType: boolean, allowsMultipleSelection: boolean) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: [videoType ? "videos" : "images"],
            allowsMultipleSelection,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (result.canceled || !result.assets) return;

        if (allowsMultipleSelection) {
            const newFiles = result.assets.map(asset => ({
                uri: asset.uri,
                type: asset.mimeType,
                name: asset.fileName,
                size: asset.fileSize,
            }));
            setImages((prev) => [...prev, ...newFiles]);
            setValue?.('images', [...images, ...newFiles]);
            return
        }

        const fileObj: any = {
            uri: result.assets[0].uri,
            type: result.assets[0].mimeType,
            name: result.assets[0].fileName,
            size: result.assets[0].fileSize,
            duration: result.assets[0].duration ? result.assets[0].duration * 1000 : undefined
        };

        if (videoType) {
            setVideo(fileObj);
            setValue?.('video', fileObj);
            return;
        }

        if (!videoType && !allowsMultipleSelection) {
            setThumbnail(fileObj)
            setValue?.('thumbnail', fileObj);
            return;
        }

        setImages(prevState => {
            setValue?.('images', [...prevState, fileObj]);
            return [...prevState, fileObj]
        })
    };

    const takeFromCamera = async (videoType: boolean, forThumbnail: boolean) => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: [videoType ? "videos" : "images"],
            aspect: [4, 3],
            quality: 0.8,
        });

        if (result.canceled || !result.assets) return;

        const fileObj: any = {
            uri: result.assets[0].uri,
            type: result.assets[0].mimeType,
            name: result.assets[0].fileName,
            duration: result.assets[0].duration ? result.assets[0].duration * 1000 : undefined
        };


        if (videoType) {
            setVideo(fileObj);
            setValue?.('video', fileObj);
            return;
        }

        if (forThumbnail) {
            setThumbnail(fileObj)
            setValue?.('thumbnail', fileObj);
            return;
        }

        setImages(prevState => {
            setValue?.('images', [...prevState, fileObj]);
            return [...prevState, fileObj]
        })
    };

    const removePhoto = (uri: string) => {
        setImages((prev) => prev.filter((u) => u.uri !== uri));
    };

    const renderPhoto = (photoUri: string, key: string) => (
        <View key={key} className="relative mr-2 mb-2">
            <Image source={{ uri: photoUri }} style={{ width: 80, height: 80, borderRadius: 8 }} />
            <TouchableOpacity
                className="absolute top-1 right-1 bg-red-500 rounded-full w-6 h-6 justify-center items-center"
                onPress={() => removePhoto(photoUri)}
            >
                <Ionicons name="close" size={16} color="white" />
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
                <View className="gap-y-8">
                    <View className="gap-y-2">
                        <Text className="font-inter-semibold text-3xl">Good pictures sell faster</Text>
                        <Text numberOfLines={2}>Capture the front, back, and sides — buyers love seeing the full view</Text>
                    </View>
                    <View className="">
                        <Text className="text-xl font-inter-bold mb-1">Add photos *</Text>
                        <TouchableOpacity className="w-full items-center justify-center h-40 gap-y-3 rounded-3xl border-2 border-primary-500"
                            onPress={() => pickFromGallery(false, true)}
                        >
                            <EvilIcons name="image" size={24} color="#9E9E9E" />
                            <Text>Select file</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center justify-center">
                        <View className="border border-gray-300 w-2/5" />
                        <Text className="px-2">Or</Text>
                        <View className="border border-gray-300 w-2/5" />
                    </View>
                    <TouchableOpacity
                        className="rounded-2xl gap-x-2 py-4 px-6 bg-primary-500 flex-row items-center justify-center"
                        onPress={() => takeFromCamera(false, false)}
                    >
                        <Ionicons name="camera" size={18} color={"#A8A8A8"} />
                        <Text className="font-inter-semibold">Open Camera & Take Photo</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="gap-y-8">
                    <View className="gap-y-2">
                        <Text className="font-inter-semibold text-3xl">Attract more buyers</Text>
                        <Text numberOfLines={2}>A 10–30 second clip can help buyers see your car’s true condition</Text>
                    </View>
                    <View className="">
                        <Text className="text-xl font-inter-bold mb-1">Add Videos</Text>
                        <TouchableOpacity className="w-full items-center justify-center h-40 gap-y-3 rounded-3xl border-2 border-primary-500"
                            onPress={() => pickFromGallery(true, false)}
                        >
                            <Octicons name="video" size={24} color="#9E9E9E" />
                            <Text>Select file</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center justify-center">
                        <View className="border border-gray-300 w-2/5" />
                        <Text className="px-2">Or</Text>
                        <View className="border border-gray-300 w-2/5" />
                    </View>
                    <TouchableOpacity
                        className="rounded-2xl gap-x-2 py-4 px-6 bg-primary-500 flex-row items-center justify-center"
                        onPress={() => takeFromCamera(true, false)}
                    >
                        <Ionicons name="camera" size={18} color={"#A8A8A8"} />
                        <Text className="font-inter-semibold">Open Camera & Take Video</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View className="flex-row flex-wrap gap-1">
                {images.map(image => renderPhoto(image.uri, image.name))}
            </View>
        </ScrollView>
    )
}