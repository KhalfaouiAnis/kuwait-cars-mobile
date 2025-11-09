import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export default function TakePhotoButton({ addMedia, label }: { addMedia: () => Promise<void>, label: string }) {
    return (
        <TouchableOpacity
            className="rounded-full gap-x-2 py-4 px-6 bg-primary-500 flex-row items-center justify-center"
            onPress={addMedia}
        >
            <Ionicons name="camera" size={18} color={"#A8A8A8"} />
            <Text className="font-inter-semibold">{label}</Text>
        </TouchableOpacity>
    )
}