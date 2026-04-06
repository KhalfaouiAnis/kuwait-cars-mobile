import AppLogo from "@/assets/svg/logo";
import { DIMENSIONS } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { useMarkAsRead } from "@/core/services/notification/notification.queries";
import { AppNotification } from "@/core/types";
import { boxShadow, cn } from "@/core/utils/cn";
import { Image } from "expo-image";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotificationItem({ item }: { item: AppNotification }) {
    const markAsRead = useMarkAsRead();

    const handlePress = useCallback((item: AppNotification) => {
        if (!item.is_read) markAsRead.mutate(item.id);
    }, [markAsRead]);

    return <TouchableOpacity
        style={{
            gap: 10,
            padding: 6,
            direction: "ltr",
            borderRadius: 20,
            width: DIMENSIONS.width - 60,
            boxShadow: boxShadow().button.boxShadow,
        }}
        onPress={() => handlePress(item)}
        className={
            cn("flex-row items-center dark:border-[0.5px] dark:border-gray-500", {
                "dark:bg-[#0F0F0F] bg-[#D9D9D9]": !item.is_read
            })
        }
    >
        <View className="gap-2 flex-row items-center">
            <AppLogo size={40} />
            <Text
                className="text-black dark:text-white text-base font-medium"
                numberOfLines={2}
            >
                {item.title}
            </Text>
        </View>
        <View>
            <Text className="text-blue dark:text-[#00A6DA] text-base font-inter-semibold">{item.body}</Text>
            <Text className="text-black dark:text-white text-xs">{new Date(item.created_at).toLocaleDateString()}</Text>
        </View>
        <Image
            style={{ height: 42, width: 40, borderRadius: 12, marginLeft: "auto", marginRight: 8 }}
            source={IMAGES.CarHyunday}
            contentFit="contain"
        />
    </TouchableOpacity>
}