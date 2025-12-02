import { EvilIcons, Octicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function PickFromGallery({ addMedia, small, video, label, disabled }: { addMedia: () => void, label: string, small?: boolean, video?: boolean, disabled?: boolean }) {
    return (
        <TouchableOpacity className={clsx("", {
            "rounded-full gap-x-2 py-4 ps-10 bg-primary-500 flex-row": small,
            "justify-center items-center w-full h-40 gap-y-3 rounded-3xl border-2 border-primary-500": !small
        })}
            onPress={addMedia}
            disabled={disabled}
        >
            {
                disabled ? <ActivityIndicator className="text-primary-500" size="large" /> : (
                    <View className={clsx("", { "items-center": !small })}>
                        {video ? <Octicons name="video" size={24} color="#9E9E9E" /> : <EvilIcons name="image" size={small ? 24 : 32} color="#9E9E9E" />}
                        <Text className={clsx("", { "font-inter-semibold": small })}>{label}</Text>
                    </View>
                )
            }

        </TouchableOpacity>
    )
}