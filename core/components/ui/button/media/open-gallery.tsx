import { EvilIcons, Octicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function PickFromGallery({ addMedia, video, label, disabled }: { addMedia: () => void, label: string, video?: boolean, disabled?: boolean }) {
    return (
        <TouchableOpacity className="justify-center w-full h-40 rounded-3xl border-2 border-primary-500"
            onPress={addMedia}
            disabled={disabled}
        >
            {
                disabled ? <ActivityIndicator className="text-primary-500" size="large" /> : (
                    <View className="items-center">
                        {video ? <Octicons name="video" size={24} color="#9E9E9E" /> : <EvilIcons name="image" size={32} color="#9E9E9E" />}
                        <Text className=" dark:text-white">{label}</Text>
                    </View>
                )
            }

        </TouchableOpacity>
    )
}