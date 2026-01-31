import { EvilIcons, Octicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function PickFromGallery({ addMedia, video, label, disabled }: { addMedia: () => void, label: string, video?: boolean, disabled?: boolean }) {
    return (
        <TouchableOpacity 
        className="justify-center self-center w-[300px] h-52 bg-[#FAFAFA] rounded-[32px] border-2"
            onPress={addMedia}
            disabled={disabled}
        >
            {
                disabled ? <ActivityIndicator className="text-primary-500" size="large" /> : (
                    <View className="items-center">
                        {video ? <Octicons name="video" size={24} color="#9E9E9E" /> : <EvilIcons name="image" size={32} color="#9E9E9E" />}
                        <Text className=" dark:text-white mt-2">{label}</Text>
                    </View>
                )
            }

        </TouchableOpacity>
    )
}