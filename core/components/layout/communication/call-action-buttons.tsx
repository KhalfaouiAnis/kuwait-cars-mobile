import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function CallActionButtons() {
    return (
        <Established />
    )
}

const Established = () => (
    <View className="flex-1 flex-row items-center justify-between min-w-64">
        <View className="items-center">
            <Pressable className="items-center justify-center p-4 bg-[#FFFFFF29] rounded-full">
                <Ionicons name="volume-high" color={"white"} size={26} />
            </Pressable>
            <Text className="text-white mt-2">Speaker</Text>
        </View>
        <View className="items-center">
            <Pressable className="items-center justify-center p-4 bg-[#EB5545] rounded-full">
                <AntDesign name="close" size={26} color="white" />
            </Pressable>
            <Text className="text-white mt-2">End</Text>
        </View>
        <View className="items-center">
            <Pressable className="items-center justify-center p-4 bg-[#FFFFFF29] rounded-full">
                <AntDesign name="audio-muted" size={26} color="white" />
            </Pressable>
            <Text className="text-white mt-2">Mute</Text>
        </View>
    </View>
)

const Dial = () => (
    <View className="flex-1 flex-row items-center justify-between min-w-64">
        <View className="items-center">
            <Pressable className="items-center justify-center p-4 bg-[#EB5545] rounded-full">
                <MaterialIcons name="call-end" size={30} color="white" />
            </Pressable>
            <Text className="text-white mt-2">Decline</Text>
        </View>
        <View className="items-center">
            <Pressable className="items-center justify-center p-4 bg-[#67CE67] rounded-full">
                <Ionicons name="call" size={30} color="white" />
            </Pressable>
            <Text className="text-white mt-2">Accept</Text>
        </View>
    </View>
)