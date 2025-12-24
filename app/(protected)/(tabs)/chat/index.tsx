import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import Reanimated, {
    interpolate,
    SharedValue,
    useAnimatedStyle
} from 'react-native-reanimated';

import ConfirmDeleteDialog from "@/core/components/ui/dialog/confirm-delete-dialog";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const ReanimatedView = Reanimated.View;

const listings = [
    {
        id: "1",
        avatar: IMAGES.AvatarVideoBoy,
        username: "Michael tony",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
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
        <ReanimatedView style={animatedStyle} className="flex-row items-center gap-x-2 ms-2">
            <RectButton style={{ height: 56, backgroundColor: "#ECEEFF", paddingVertical: 16, paddingHorizontal: 8, borderRadius: 12 }}>
                <AntDesign name="folder-open" size={24} color="#3641B7" />
            </RectButton>
            <RectButton onPress={handleDelete} style={{ height: 56, backgroundColor: "#FFE7E5", paddingVertical: 16, paddingHorizontal: 8, borderRadius: 12 }}>
                <Ionicons name="trash-outline" size={24} color="#F44336" />
            </RectButton>
        </ReanimatedView>
    );
};


export default function ChatScreen() {
    const swipeableRef = useRef<any>(null);
    const [show, setShow] = useState<boolean>(false)

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
                renderRightActions={(progress) => <RightAction progress={progress} handleDelete={() => setShow(true)} />}
            >
                <View className="flex-row border-b py-4 items-center justify-around border-primary-500">
                    <View className="w-2/12 border border-gray-100 rounded-full items-center justify-center p-1 me-1">
                        <Image source={item.avatar} style={{ width: 50, height: 50, borderRadius: 100, objectFit: "contain", marginEnd: 4 }} />
                    </View>
                    <View className="w-8/12">
                        <Text className="font-inter-semibold mb-1">{item.username}</Text>
                        <Text className="text-[#636363]">{item.message}</Text>
                    </View>
                    <View className="items-center justify-between w-2/12">
                        <Text>{item.sentAt}</Text>
                        <Text className="py-1 px-2 bg-primary-500 rounded-md text-center mt-2 font-bold text-sm">{item.unreadCount}</Text>
                    </View>
                </View>
            </Swipeable>
        );
    };

    return (
        <Container>
            <View className="py-2 px-4">
                <View className="my-4 mx-2 flex-row items-center justify-between">
                    <MaterialIcons name="sort" size={24} color="black" className="me-2" />
                    <View className="flex-row items-center ps-2 flex-1 h-12 overflow-hidden text-[#333] text-base border rounded-lg border-primary-500 me-1">
                        <Ionicons name="search-outline" size={24} color="black" />
                        <TextInput
                            placeholder="Search..."
                            className="flex-1"
                            autoCapitalize="none"
                        />
                    </View>
                    <MaterialCommunityIcons name="bell-ring-outline" size={24} color="black" className="me-2" />
                    <Image
                        source={IMAGES.Mohamed}
                        style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 100 }}
                    />
                </View>
                <View className="my-4 mx-4 flex-row items-center justify-between ">
                    <Text className="font-inter-semibold text-xl">Recent chats</Text>
                    <Text className="text-[#3641B7]">8 Requests</Text>
                </View>
                <View className="w-dvw h-[1px] bg-primary-500 px-0 mx-0" />

                <FlatList
                    data={listings}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    renderItem={renderItem}
                />
            </View>
            <ConfirmDeleteDialog show={show} setShow={setShow} />
        </Container>
    )
}