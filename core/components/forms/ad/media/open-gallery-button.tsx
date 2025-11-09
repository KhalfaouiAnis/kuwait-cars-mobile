import { EvilIcons, Octicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { Text, TouchableOpacity } from "react-native";

export default function PickFromGalleryGallery({ addMedia, small, video }: { addMedia: () => Promise<void>, small?: boolean, video?: boolean }) {
    return (
        <TouchableOpacity className={clsx("items-center justify-center", {
            "rounded-full gap-x-2 py-4 px-6 bg-primary-500 flex-row": small,
            "w-full h-40 gap-y-3 rounded-3xl border-2 border-primary-500": !small
        })}
            onPress={addMedia}
        >
            {video
                ? <Octicons name="video" size={24} color="#9E9E9E" />
                : <EvilIcons name="image" size={small ? 24 : 32} color="#9E9E9E" />}
            <Text
                className={clsx("", {
                    "font-inter-semibold": small
                })}
            >Select file</Text>
        </TouchableOpacity>
    )
}