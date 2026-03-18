import AppLogo from "@/assets/svg/logo";
import { DIMENSIONS } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function NotificationItem() {
    return <View
        style={{
            gap: 10,
            padding: 6,
            direction: "ltr",
            borderRadius: 20,
            backgroundColor: "white",
            width: DIMENSIONS.width - 60,
            boxShadow: boxShadow().button.boxShadow,
        }}
        className="flex-row items-center"
    >
        <View className="gap-2 flex-row items-center">
            <AppLogo size={40} />
            <Text>Miss Call</Text>
        </View>
        <View>
            <Text className="text-blue">anis nidal</Text>
            <Text>Sent 1h 12m ago</Text>
        </View>
        <Image
            style={{ height: 42, width: 40, borderRadius: 12, marginLeft: "auto", marginRight: 8 }}
            source={IMAGES.CarHyunday}
            contentFit="contain"
        />
    </View>
}