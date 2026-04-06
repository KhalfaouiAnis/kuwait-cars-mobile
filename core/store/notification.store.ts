import * as Notifications from "expo-notifications";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { NOTIFICATION_STORAGE } from "../constants";
import { AppNotification } from "../types";
import { zustandStorage } from "./storage";

interface NotificationState {
  unreadCount: number;
  lastNotification: AppNotification | null;

  // Called after fetching the real count from the backend
  setUnreadCount: (count: number) => void;

  // Called when a push notification arrives in the foreground
  incrementUnread: (notification?: AppNotification) => void;

  // Called after marking one notification as read
  decrementUnread: () => void;

  // Called after mark-all-read
  clearUnread: () => void;

  // Reset last notification (e.g. after showing a toast)
  clearLastNotification: () => void;
}

const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      unreadCount: 0,
      lastNotification: null,
      setUnreadCount: (count) => {
        set({ unreadCount: Math.max(0, count) });
        syncBadge(count);
      },

      incrementUnread: (notification) => {
        const next = get().unreadCount + 1;
        set({
          unreadCount: next,
          lastNotification: notification ?? null,
        });
        syncBadge(next);
      },

      decrementUnread: () => {
        const next = Math.max(0, get().unreadCount - 1);
        set({ unreadCount: next });
        syncBadge(next);
      },

      clearUnread: () => {
        set({ unreadCount: 0 });
        syncBadge(0);
      },

      clearLastNotification: () => set({ lastNotification: null }),
    }),
    {
      name: NOTIFICATION_STORAGE,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ unreadCount: state.unreadCount }),
    },
  ),
);

function syncBadge(count: number) {
  Notifications.setBadgeCountAsync(count).catch(() => {});
}

export const notificationStore = useNotificationStore;

export default useNotificationStore;
