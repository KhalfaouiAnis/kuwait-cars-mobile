import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native";

import ChatHeader from "@/core/components/layout/header/chat-header";
import { cn } from "@/core/utils/cn";

const messages = [
    {
        id: "1",
        senderId: "me",
        content: "Hello",
        sentAt: "10 AM"
    },
    {
        id: "2",
        senderId: "other",
        content: "sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui.",
        sentAt: "10 AM"
    },
    {
        id: "3",
        senderId: "me",
        content: "Hello",
        sentAt: "10 AM"
    },
    {
        id: "4",
        senderId: "other",
        content: "sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui.",
        sentAt: "10 AM"
    },
    {
        id: "5",
        senderId: "me",
        content: "Hello",
        sentAt: "10 AM"
    },
    {
        id: "6",
        senderId: "other",
        content: "sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui.",
        sentAt: "10 AM"
    },
    {
        id: "7",
        senderId: "me",
        content: "Hello",
        sentAt: "10 AM"
    },
    {
        id: "8",
        senderId: "other",
        content: "sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui.",
        sentAt: "10 AM"
    },
]

export default function ChatScreen() {
    const renderItem = ({ item }: {
        item: {
            id: string;
            senderId: string;
            content: string;
            sentAt: string;
        }
    }) => {

        return (
            <View className={cn("my-4 mx-2 gap-x-2 flex-row items-center", {
                "flex-row-reverse": item.senderId === "me"
            })}>
                <Image
                    source={item.senderId === "me" ? images.AvatarVideoBoy : images.AvatarVideoGirl}
                    style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 100 }}
                />
                <View>
                    <View className={cn("border p-2 rounded-t-3xl", {
                        "rounded-bl-3xl border-gray-500": item.senderId === "me",
                        "rounded-br-3xl border-primary-500": item.senderId !== "me",
                    })}>
                        <Text className="max-w-80">{item.content}</Text>
                    </View>
                    <Text className="text-xs">{item.sentAt}</Text>
                </View>
            </View>
        );
    };

    return (
        <Container header={<ChatHeader username="Mohamed Tunisia" phone="+96554454545" />}>
            <View className="flex-1 border border-primary-500 rounded-3xl relative">
                <View className="flex-1">
                    <FlatList
                        data={messages}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        renderItem={renderItem}
                    />
                </View>
                <View className="absolute py-1 px-2 z-10 mx-4 end-0 start-0 bottom-2 flex-row items-center justify-between border border-gray-100 rounded-3xl bg-primary-500">
                    <View className="flex-row items-center gap-x-3">
                        <Entypo name="emoji-happy" size={24} color="#6b7280" />
                        <TextInput
                            placeholder="Type message here..."
                            className="w-full max-w-64"
                            autoCapitalize="none"
                        />
                    </View>
                    <Pressable className="p-2 bg-white rounded-full items-center justify-center">
                        <Feather name="send" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
        </Container>
    )
}