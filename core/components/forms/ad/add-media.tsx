import { StepProps } from "@/core/types";
import { cn } from "@/core/utils/cn";
import { EvilIcons, Ionicons, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function AddMedia({ control, errors }: StepProps) {
    const [tab, setTab] = useState(0)
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
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

    const pickFromGallery = async (video: boolean) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: [video ? "videos" : "images"],
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 0.8, // Balance quality/size
        });

        if (!result.canceled) {
            const newUris = result.assets.map((asset) => asset.uri);
            setSelectedPhotos((prev) => [...prev, ...newUris]); // Append to existing
        }
    };

    const takeFromCamera = async (video: boolean) => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: [video ? "videos" : "images"],
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setSelectedPhotos((prev) => [...prev, result.assets[0].uri]);
        }
    };

    const removePhoto = (uri: string) => {
        setSelectedPhotos((prev) => prev.filter((u) => u !== uri));
    };

    const renderPhoto = ({ item }: { item: string }) => (
        <View className="relative mr-2 mb-2">
            <Image source={{ uri: item }} style={{ width: 80, height: 80, borderRadius: 8 }} />
            <TouchableOpacity
                className="absolute top-1 right-1 bg-red-500 rounded-full w-6 h-6 justify-center items-center"
                onPress={() => removePhoto(item)}
            >
                <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <View className="flex-row items-center justify-center mb-6">
                <TouchableOpacity className={cn("rounded-xl w-1/2 h-2", {
                    "bg-[#EEEEEE]": tab !== 0,
                    "bg-primary-500": tab === 0
                })} onPress={() => setTab(0)} />
                <TouchableOpacity className={cn("rounded-xl w-1/2 h-2", {
                    "bg-[#EEEEEE]": tab !== 1,
                    "bg-primary-500": tab === 1
                })} onPress={() => setTab(1)} />
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
                            onPress={() => pickFromGallery(false)}
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
                        onPress={() => takeFromCamera(false)}
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
                            onPress={() => pickFromGallery(true)}
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
                        onPress={() => takeFromCamera(true)}
                    >
                        <Ionicons name="camera" size={18} color={"#A8A8A8"} />
                        <Text className="font-inter-semibold">Open Camera & Take Video</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}