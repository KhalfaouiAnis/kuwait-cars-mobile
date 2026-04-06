import { httpClient } from "@/core/api/httpClient";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export function configureNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () =>
      ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }) as Notifications.NotificationBehavior,
  });
}

async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync("default", {
    name: "Default",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
    sound: "default",
  });
}

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.warn(
      "[Notifications] Must use a physical device for push notifications",
    );
    return null;
  }

  await ensureAndroidChannel();

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("[Notifications] Permission not granted");
    return null;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) throw new Error("EAS projectId not found in app.json");

  const { data: token } = await Notifications.getExpoPushTokenAsync({
    projectId,
  });
  return token;
}

export async function syncPushToken(): Promise<void> {
  try {
    const token = await registerForPushNotifications();
    if (!token) return;

    await httpClient.put("/notifications/token", { token });
    console.log("[Notifications] Push token synced ✓");
  } catch (err) {
    console.error("[Notifications] Failed to sync push token:", err);
  }
}
