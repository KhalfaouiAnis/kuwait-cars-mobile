import Container from "@/core/components/ui/container";
import ConfirmDeleteDialog from "@/core/components/ui/dialog/confirm-delete-dialog";
import { ProfileDrawer } from "@/core/components/ui/shared/profile-drawer";
import { IMAGES } from "@/core/constants/images";
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    interpolate,
    SharedValue,
    useAnimatedStyle
} from 'react-native-reanimated';

const ReanimatedView = Reanimated.View;

const listings = [
    {
        id: "1",
        avatar: IMAGES.AvatarVideoBoy,
        username: "Michael tony",
        message: "Lorem ipsum dolor sit amet amet consectetur adipisicing elit. consectetur adipisicing elit.",
        sentAt: "10 min",
        unreadCount: 2
    },
    {
        id: "2",
        avatar: IMAGES.AvatarVideoGirl,
        username: "Metal Exchange",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "25 min",
        unreadCount: 3
    },
    {
        id: "3",
        avatar: IMAGES.AvatarVideoBoy,
        username: "Michael tony",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "10 min",
        unreadCount: 2
    },
    {
        id: "4",
        avatar: IMAGES.AvatarVideoGirl,
        username: "Metal Exchange",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "25 min",
        unreadCount: 3
    },
    {
        id: "5",
        avatar: IMAGES.AvatarVideoBoy,
        username: "Michael tony",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "10 min",
        unreadCount: 2
    },
    {
        id: "6",
        avatar: IMAGES.AvatarVideoGirl,
        username: "Metal Exchange",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "25 min",
        unreadCount: 3
    },
    {
        id: "7",
        avatar: IMAGES.AvatarVideoBoy,
        username: "Michael tony",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "10 min",
        unreadCount: 2
    },
    {
        id: "8",
        avatar: IMAGES.AvatarVideoGirl,
        username: "Metal Exchange",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "25 min",
        unreadCount: 3
    },
    {
        id: "9",
        avatar: IMAGES.AvatarVideoBoy,
        username: "Michael tony",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "10 min",
        unreadCount: 2
    },
    {
        id: "10",
        avatar: IMAGES.AvatarVideoGirl,
        username: "Metal Exchange",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        sentAt: "25 min",
        unreadCount: 3
    },
]

const RightAction = ({ progress, handleDelete }: { progress: SharedValue<number>, handleDelete: () => void }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const threshold = 0.3;
        const opacity = interpolate(progress.value, [threshold, 1], [0, 1])
        return {
            opacity: progress.value >= threshold ? opacity : 0,
        };
    });

    return (
        <ReanimatedView style={[animatedStyle]} className="flex-row items-center gap-x-2 me-2">
            <RectButton style={{ height: 56, backgroundColor: "#FF123D", paddingVertical: 16, paddingHorizontal: 8, borderRadius: 12 }}>
                <MaterialIcons name="block-flipped" size={24} color="white" />
            </RectButton>
            <RectButton onPress={handleDelete} style={{ height: 56, backgroundColor: "#FFE7E5", paddingVertical: 16, paddingHorizontal: 8, borderRadius: 12 }}>
                <Ionicons name="trash-outline" size={24} color="#F44336" />
            </RectButton>
        </ReanimatedView>
    );
};


export default function ChatScreen() {
    const swipeableRef = useRef<any>(null);
    const { user } = useAuthStore();
    const [show, setShow] = useState<boolean>(false)
    const { isRTL } = useUserPreferencesStore()
    const { dark } = useTheme()
    const { t } = useTranslation("common")

    const renderItem = ({ item }: {
        item: {
            id: string;
            avatar: any;
            username: string;
            message: string;
            sentAt: string;
            unreadCount: number;
        }
    }) => {

        return (
            <Swipeable
                ref={swipeableRef}
                friction={2}
                rightThreshold={40}
                leftThreshold={40}
                renderRightActions={(progress) => <RightAction progress={progress} handleDelete={() => setShow(true)} />}
            >
                <Link href={"/chat/id12545555"} asChild>
                    <Pressable className="flex-row border-b py-4 items-center justify-around border-primary-500">
                        <View className="w-2/12 rounded-full items-center justify-center p-1 me-1">
                            <Image source={item.avatar} style={{ width: 50, height: 50, marginEnd: 4 }} contentFit="contain" />
                        </View>
                        <View className="w-7/12">
                            <View className="flex-row items-center gap-2">
                                <Text className="font-inter-semibold mb-1 text-black dark:text-gray-200">{item.username}</Text>
                                <Text className="py-1 px-2 bg-primary-500 rounded-md text-center font-bold text-sm">{item.unreadCount}</Text>
                            </View>
                            <View>
                                <Text numberOfLines={2} ellipsizeMode="tail" className="text-[#636363] dark:text-gray-300 text-sm">{item.message}</Text>
                            </View>
                            <View className="mt-1 ms-2">
                                <Text className="text-error text-xs">{item.sentAt}</Text>
                            </View>
                        </View>
                        <View className="me-1 rounded-md">
                            <Image source={IMAGES.CarMercedes} style={{ width: 60, height: 70, borderRadius: 6 }} contentFit="cover" />
                        </View>
                    </Pressable>
                </Link>
            </Swipeable>
        );
    };

    return (
        <Container>
            <View className="py-2 px-4" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <View className="my-4 mx-2 flex-row items-center justify-between" >
                    <ProfileDrawer />
                    <View className="flex-row items-center ps-2 flex-1 h-12 overflow-hidden text-[#333] text-base border rounded-lg border-primary-500 me-1">
                        <Ionicons name="search-outline" size={24} color={dark ? "white" : "black"} />
                        <TextInput
                            placeholder={`${t("search")}...`}
                            className="flex-1"
                            autoCapitalize="none"
                        />
                    </View>
                    <MaterialCommunityIcons name="bell-ring-outline" size={24} color={dark ? "white" : "black"} className="me-1" />
                    <View className="rounded-full h-10 w-10">
                        <Image
                            source={user?.avatar
                                ? { uri: user?.avatar.original_url }
                                : IMAGES.DefaultAvatar}
                            style={{ width: "100%", height: "100%" }}
                            contentFit="fill"
                        />
                    </View>
                </View>
                <View className="my-4 mx-4 flex-row items-center justify-between">
                    <Text className="font-inter-semibold text-xl text-black dark:text-gray-200">{t("communication.recentChats")}</Text>
                </View>
                <View className="w-dvw h-[1px] bg-primary-500 px-0 mx-0" />

                <FlatList
                    style={{ direction: "ltr" }}
                    data={listings}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 200 }}
                />
            </View>
            <ConfirmDeleteDialog
                show={show}
                setShow={setShow}
                title="deleteMessage"
                description="confirmDeleteConversation"
            />
        </Container>
    )
}