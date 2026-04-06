import { handleNotificationTap } from "@/core/lib/notifications/notificationHandler";
import {
    configureNotificationHandler,
    syncPushToken,
} from "@/core/lib/notifications/notificationSetup";
import { notificationKeys } from "@/core/services/notification/notification.queries";
import useNotificationStore from "@/core/store/notification.store";
import type { AppNotification } from "@/core/types";
import { useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

export function useNotificationSetup() {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const incrementUnread = useNotificationStore((s) => s.incrementUnread);
  const notificationListener =
    useRef<Notifications.EventSubscription>(undefined);
  const responseListener = useRef<Notifications.EventSubscription>(undefined);
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    configureNotificationHandler();
    syncPushToken();

    // Foreground: notification received while app is open
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const content = notification.request.content;

        const incoming: AppNotification = {
          id: notification.request.identifier,
          title: content.title ?? "",
          body: content.body ?? "",
          data: (content.data as Record<string, unknown>) ?? null,
          is_read: false,
          status: "DELIVERED",
          created_at: new Date().toISOString(),
        };

        incrementUnread(incoming);

        queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
      });

    // Foreground + Background: user tapped a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotificationTap(response);
      });

    // Killed state: app opened from a notification
    const response = Notifications.getLastNotificationResponse();
    if (response) handleNotificationTap(response);

    // ── Refetch count when app returns to foreground ────────────────────────
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (
          appStateRef.current.match(/inactive|background/) &&
          nextState === "active"
        ) {
          queryClient.invalidateQueries({
            queryKey: notificationKeys.unreadCount(),
          });
        }
        appStateRef.current = nextState;
      },
    );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
      subscription.remove();
    };
  }, [navigation, incrementUnread, queryClient]);
}
