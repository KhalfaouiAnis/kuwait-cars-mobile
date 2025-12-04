import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import ConfirmDeleteDialog from "@/core/components/ui/dialog/confirm-delete-dialog";
import { IMAGES } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    interpolate,
    SharedValue,
    useAnimatedStyle
} from 'react-native-reanimated';

const ReanimatedView = Reanimated.View;

const LeftAction = ({ progress, handleDelete }: { progress: SharedValue<number>, handleDelete: () => void }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const threshold = 0.3;
        const opacity = interpolate(progress.value, [threshold, 1], [0, 1])
        return {
            opacity: progress.value >= threshold ? opacity : 0,
        };
    });

    return (
        <ReanimatedView style={animatedStyle} className="items-center justify-center mx-2 h-full pb-4">
            <Pressable className="bg-[#FFE7E5] px-2 justify-center h-full rounded-xl" onPress={handleDelete}>
                <Ionicons name="trash-outline" size={24} color="#F44336" />
            </Pressable>
        </ReanimatedView>
    );
};

const listings = [
    {
        id: "listing-1",
        status: "active",
        location: "Kuwait",
        date: "21-12-2025",
        description: "Toyota Yaris Cross",
        name: "Toyota Yaris Cross",
        image: IMAGES.Toyota_1,
        price: "2.000 kwd",
    },
    {
        id: "listing-2",
        image: IMAGES.Toyota_2,
        name: "Toyota Yaris Cross",
        price: "1.700 kwd",
        status: "active",
        location: "Kuwait",
        date: "21-12-2025",
        description: "Toyota Yaris Cross",
    },
    {
        id: "listing-3",
        image: IMAGES.Toyota_3,
        name: "Toyota Yaris Cross",
        price: "2.300 kwd",
        status: "active",
        location: "Kuwait",
        date: "21-12-2025",
        description: "Toyota Yaris Cross",
    },
    {
        id: "listing-4",
        image: IMAGES.Toyota_4,
        name: "Toyota Yaris Cross",
        price: "2.000 kwd",
        status: "active",
        location: "Kuwait",
        date: "21-12-2025",
        description: "Toyota Yaris Cross",
    },
]

export default function MyAdsScreen() {
    const swipeableRef = useRef<any>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<"completed" | "active">("completed")

    const renderItem = ({ item }: {
        item: {
            id: string;
            status: string
            location: string
            image: any;
            name: string;
            description: string;
            date: string;
            price: string;
        }
    }) => {
        return (
            <Swipeable
                ref={swipeableRef}
                friction={2}
                leftThreshold={40}
                renderLeftActions={(progress) => <LeftAction progress={progress} handleDelete={() => setShowDeleteDialog(true)} />}
            >
                <View className="rounded-lg p-1 flex-row items-center mb-4 mx-1 border-gray-200 border-2 bg-white dark:bg-darkish">
                    <Image source={item.image} style={{ width: 60, height: 60 }} contentFit="cover" />
                    <View className="gap-y-3 flex-1 mx-4">
                        <Text className="font-inter-semibold text-black dark:text-white">{item.name}</Text>
                        <Text className="font-inter-medium text-sm text-gray-300">{item.description}</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-black dark:text-white">{item.location}</Text>
                            <Text className="font-inter-medium text-gray-300 text-sm">{item.date}</Text>
                        </View>
                    </View>
                    <View className="h-28 justify-between">
                        <View className="flex-row gap-x-1 mt-2">
                            <Text className="font-semibold text-black dark:text-white">{item.price}</Text>
                        </View>
                        <View className="flex-1 justify-evenly">
                            <TouchableOpacity className="bg-primary-500 py-1 px-3 mb-1 rounded-lg">
                                <Text className="text-sm">
                                    Repost
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-success py-1 px-3 mb-1 rounded-lg">
                                <Text className="text-sm">
                                    Edit Ad
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Swipeable>
        )
    }

    return (
        <Container header={<ProfileHeader title="My Ads" />}>
            <View className="flex-1 mx-2">
                <View className="flex-row items-center justify-center gap-6">
                    <TouchableOpacity onPress={() => setActiveTab("completed")}>
                        <Text className={`text-black dark:text-white font-inter-medium text-lg border-b border-${activeTab === "completed" ? "primary-500" : "gray-300"}`}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab("active")}>
                        <Text className={`text-black dark:text-white font-inter-medium text-lg border-b border-${activeTab === "active" ? "primary-500" : "gray-300"}`}>Active</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-1 mt-4">
                    <FlatList
                        data={listings}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        className="my-4"
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={false}
                    />
                </View>
            </View>
            <ConfirmDeleteDialog show={showDeleteDialog} setShow={setShowDeleteDialog} />
        </Container>
    )
}
