import NotificationHeader from "@/core/components/layout/header/notification-header";
import Container from "@/core/components/ui/container";
import NotificationItem from "@/core/components/ui/notification/notification-item";
import { useMarkAllRead, useNotificationsList, useSyncUnreadCount } from "@/core/services/notification/notification.queries";
import useNotificationStore from "@/core/store/notification.store";
import type { AppNotification } from "@/core/types";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotificationsScreen() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useNotificationsList();
    const unreadCount = useNotificationStore((state) => state.unreadCount);
    const { t } = useTranslation("common");
    const markAllRead = useMarkAllRead();
    const { dark } = useTheme();

    const notifications = data?.pages.flatMap((p) => p.data) ?? [];

    useSyncUnreadCount();

    const renderItem = ({ item }: { item: AppNotification }) => <NotificationItem item={item} />;

    if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;

    return (
        <Container
            backgroundColor={dark ? "black" : "white"}
            header={<NotificationHeader title={t("notifications")} unreadCount={unreadCount} />}
        >
            <View className="flex-1 mt-2 bg-white dark:bg-black px-4 py-2 items-center">

                {notifications.some((n) => !n.is_read) && (
                    <TouchableOpacity
                        style={styles.markAllBtn}
                        onPress={() => markAllRead.mutate()}
                    >
                        <Text style={styles.markAllText}>Mark all as read</Text>
                    </TouchableOpacity>
                )}

                <FlatList
                    data={notifications}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.3}
                    keyExtractor={item => item.id}
                    contentContainerClassName="p-2 gap-6"
                    onEndReached={() => hasNextPage && fetchNextPage()}
                    ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    markAllText: { color: '#3182CE', fontWeight: '600' },
    markAllBtn: { padding: 12, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
});