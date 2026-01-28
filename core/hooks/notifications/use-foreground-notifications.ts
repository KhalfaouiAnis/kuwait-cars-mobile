import useNotificationStore from "@/core/store/notification.store";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export const useForegroundNotifications = () => {
  const { incrementUnread, addNotification } = useNotificationStore();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () =>
        ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }) as Notifications.NotificationBehavior,
    });

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const data = notification.request.content.data;

        incrementUnread();
        addNotification(data);

        console.log("Foreground notification captured:", data);
      },
    );

    return () => subscription.remove();
  }, [addNotification, incrementUnread]);
};
