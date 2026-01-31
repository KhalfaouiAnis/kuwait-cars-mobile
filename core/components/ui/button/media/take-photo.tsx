import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export default function TakePhotoButton({ addMedia, label, disabled }: { addMedia: () => void, label: string, disabled?: boolean }) {
    return (
        <TouchableOpacity
            className="rounded-[20px] h-[45px] w-[290px] self-center border border-grayish bg-[#FAFAFA] gap-6 flex-row items-center"
            onPress={addMedia}
            disabled={disabled}
        >
            <Ionicons className="ms-10" name="camera" size={18} color={"#A8A8A8"} />
            <Text className="font-inter-medium">{label}</Text>
        </TouchableOpacity>
    )
}