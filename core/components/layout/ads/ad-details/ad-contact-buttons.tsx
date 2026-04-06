import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function AdContactButtons() {
    return (
        <View className="flex-row items-center justify-between gap-2">
            <Pressable
                className="flex-1"
                style={{
                    boxShadow: boxShadow(4, 6, 20, 0, "rgb(000 000 000 / 0.25)").button.boxShadow,
                    borderWidth: 0.5,
                    borderColor: "#A8A8A8",
                    paddingVertical: 12,
                    paddingHorizontal: 6,
                    borderRadius: 25,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FEF32D",
                }}
            >
                <Ionicons name="chatbox-ellipses-outline" color="black" size={20} />
                <Text className="font-inter-semibold text-sm">
                    Chat & Call
                </Text>
            </Pressable>
            <Pressable
                className="flex-1"
                style={{
                    boxShadow: boxShadow(4, 6, 20, 0, "rgb(000 000 000 / 0.25)").button.boxShadow,
                    borderWidth: 0.5,
                    borderColor: "#A8A8A8",
                    paddingVertical: 12,
                    paddingHorizontal: 6,
                    borderRadius: 25,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#00C95A",
                }}
            >
                <Ionicons name="logo-whatsapp" color="black" size={20} />
                <Text className="font-inter-semibold text-sm">
                    WhatsApp
                </Text>
            </Pressable>
            <Pressable
                className="flex-1"
                style={{
                    boxShadow: boxShadow(4, 6, 20, 0, "rgb(000 000 000 / 0.25)").button.boxShadow,
                    borderWidth: 0.5,
                    borderColor: "#A8A8A8",
                    paddingVertical: 12,
                    paddingHorizontal: 6,
                    borderRadius: 25,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#00A6DA",
                }}
            >
                <Ionicons name="call-outline" color="black" size={20} />
                <Text className="font-inter-semibold text-sm">
                    Contact
                </Text>
            </Pressable>
        </View>
    )
}