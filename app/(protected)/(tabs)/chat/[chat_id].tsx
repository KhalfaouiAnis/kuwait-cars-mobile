import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import ChatHeader from "@/core/components/layout/header/chat-header";
import { cn } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("common")

    const renderItem = ({ item }: {
        item: {
            id: string;
            senderId: string;
            content: string;
            sentAt: string;
        }
    }) => {

        return (
            <View className={cn("my-2 mx-2 gap-x-2 flex-row items-center", {
                "flex-row-reverse": item.senderId === "me"
            })}>
                <Image
                    source={item.senderId === "me" ? IMAGES.AvatarVideoBoy : IMAGES.AvatarVideoGirl}
                    style={{ width: 36, height: 36, borderRadius: 100 }}
                    contentFit="cover"
                />
                <View>
                    <View className={cn("border p-2 rounded-t-3xl", {
                        "rounded-bl-3xl border-gray-500": item.senderId === "me",
                        "rounded-br-3xl border-primary-500": item.senderId !== "me",
                    })}>
                        <Text className="max-w-80 dark:text-gray-300">{item.content}</Text>
                    </View>
                    <Text className={cn("text-xs dark:text-gray-200", {
                        "ms-auto": item.senderId === "me",
                        "me-auto": item.senderId !== "me",
                    })}>{item.sentAt}</Text>
                </View>
            </View>
        );
    };

    return (
        <Container header={<ChatHeader />}>
            <View className="flex-1 border border-primary-500 rounded-3xl relative">
                <View className="flex-row gap-2 self-center mt-4 rounded-xl border border-primary-500 py-2 px-4">
                    <Image source={IMAGES.CarMercedes} style={{ width: 60, height: 60 }} contentFit="cover" />
                    <View className="justify-around">
                        <View className="flex-row items-center justify-between">
                            <Text className="dark:text-white font-inter-semibold">Toyota Fortuner</Text>
                            <Text className="dark:text-white border-b border-b-primary-500 font-inter-semibold">2,200 Kwd</Text>
                        </View>
                        <View>
                            <Text className="text-gray-400 dark:text-gray-200 font-inter">topic title by the customer for ...</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-1">
                    <FlashList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 85 }}
                    />
                </View>
                <View className="absolute z-10 end-0 start-0 bottom-3">
                    <View className="flex-row items-center justify-center gap-2 mb-1">
                        <Pressable className="px-2 py-1 bg-gray-300 rounded-md">
                            <Text className="text-center font-inter-semibold">Hello</Text>
                        </Pressable>
                        <Pressable className="px-2 py-1 bg-gray-300 rounded-md">
                            <Text className="text-center font-inter-semibold">💰 Pricing</Text>
                        </Pressable>
                        <Pressable className="px-2 py-1 bg-gray-300 rounded-md">
                            <Text className="text-center font-inter-semibold">🙋‍♂ FQAs</Text>
                        </Pressable>
                    </View>
                    <View
                        style={styles.button}
                        className="flex-row py-1 px-2 mx-4 items-center justify-between rounded-3xl bg-primary-500 opacity-95">
                        <View className="flex-1 flex-row items-center gap-x-3">
                            <Pressable hitSlop={4}>
                                <Ionicons name="images-outline" size={20} color="black" />
                            </Pressable>
                            <Pressable hitSlop={4}>
                                <Ionicons name="camera-outline" size={20} color="black" />
                            </Pressable>
                            <TextInput
                                placeholder={t("communication.typeMsgHere")}
                                className="flex-1 placeholder:text-gray-800 dark:text-gray-600"
                                autoCapitalize="none"
                            />
                        </View>
                        <Pressable className="p-2 bg-white rounded-full items-center justify-center">
                            <Feather name="send" size={20} color="black" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    button: {
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 0,
                blurRadius: 14,
                spreadDistance: 3,
                color: "rgb(000 000 000 / 0.12)",
            },
        ],
    },
});