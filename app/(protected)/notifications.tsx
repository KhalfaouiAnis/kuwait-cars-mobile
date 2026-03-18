import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import NotificationItem from "@/core/components/ui/notification/notification-item";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";

const NOTIFICATIONS = [
    { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }
]

export default function NotificationsScreen() {
    const { t } = useTranslation("common");
    const { dark } = useTheme()

    return (
        <Container
            backgroundColor={dark ? "black" : "white"}
            header={<ProfileHeader title={t("notifications")} />}
        >
            <View className="flex-1 mt-2 bg-white dark:bg-black px-4 py-2 items-center">
                <FlatList
                    data={NOTIFICATIONS}
                    keyExtractor={item => item.id}
                    renderItem={() => <NotificationItem />}
                    contentContainerClassName="p-2 gap-6"
                />
            </View>
        </Container>
    );
}
