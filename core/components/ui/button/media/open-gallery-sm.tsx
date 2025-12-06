import { EvilIcons, Octicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function PickFromGallerySM({ addMedia, video, label, disabled }: { addMedia: () => void, label: string, video?: boolean, disabled?: boolean }) {
    return (
        <TouchableOpacity className="rounded-full gap-x-2 py-4 ps-10 bg-primary-500 flex-row"
            onPress={addMedia}
            disabled={disabled}
        >
            {
                disabled ? <ActivityIndicator className="text-primary-500" size="large" /> : (
                    <View className="items-center flex-row gap-x-2">
                        {video ? <Octicons name="video" size={24} color="#9E9E9E" /> : <EvilIcons name="image" size={24} color="#9E9E9E" />}
                        <Text className="font-inter-semibold ">{label}</Text>
                    </View>
                )
            }

        </TouchableOpacity>
    )
}