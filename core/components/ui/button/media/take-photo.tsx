import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export default function TakePhotoButton({ addMedia, label, disabled }: { addMedia: () => void, label: string, disabled?: boolean }) {
    return (
        <TouchableOpacity
            className="rounded-full gap-x-2 py-4 ps-10 bg-primary-500 flex-row items-center"
            onPress={addMedia}
            disabled={disabled}
        >
            <Ionicons name="camera" size={18} color={"#A8A8A8"} />
            <Text className="font-inter-semibold">{label}</Text>
        </TouchableOpacity>
    )
}