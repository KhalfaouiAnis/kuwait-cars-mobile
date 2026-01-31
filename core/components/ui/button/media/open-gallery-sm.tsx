import { EvilIcons, Octicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function PickFromGallerySM({ addMedia, video, label, disabled }: { addMedia: () => void, label: string, video?: boolean, disabled?: boolean }) {
    return (
        <TouchableOpacity
            className="rounded-[20px] h-[45px] w-[290px] self-center border border-grayish bg-[#FAFAFA] gap-6 flex-row items-center"
            onPress={addMedia}
            disabled={disabled}
        >
            {
                disabled ? <ActivityIndicator className="text-primary-500" size="large" /> : (
                    <View className="items-center justify-center flex-row gap-6">
                        {video ? <Octicons className="ms-10" name="video" size={24} color="#9E9E9E" /> : <EvilIcons className="ms-10" name="image" size={24} color="#9E9E9E" />}
                        <Text className="font-inter-medium">{label}</Text>
                    </View>
                )
            }

        </TouchableOpacity>
    )
}