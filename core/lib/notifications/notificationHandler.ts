import { httpClient } from "@/core/api/httpClient";
import { NotificationType } from "@/core/types";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

export function handleNotificationTap(
  response: Notifications.NotificationResponse,
) {
  const data = response.notification.request.content.data as {
    type: NotificationType;
    notificationId: string;
    advertiseId?: string;
    paymentId?: string;
    callerId?: string;
  };

  if (data.notificationId) {
    httpClient
      .put(`/notifications/${data.notificationId}/read`)
      .catch(() => {});
  }

  switch (data.type) {
    case NotificationType.ADVERTISE_EXPIRED:
    case NotificationType.ADVERTISE_EXPIRING_SOON:
      router.push({
        pathname: "/categories",
        params: { id: data.advertiseId },
      });
      break;

    case NotificationType.PAYMENT_SUCCESS:
      router.push({ pathname: "/categories", params: { id: data.paymentId } });
      break;

    case NotificationType.MISSED_CALL:
      router.push({ pathname: "/categories", params: { id: data.callerId } });
      break;

    default:
      router.push({ pathname: "/categories" });
  }
}
