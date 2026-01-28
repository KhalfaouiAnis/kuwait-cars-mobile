import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { NOTIFICATION_STORAGE } from "../constants";
import { zustandStorage } from "./storage";

interface NotificationState {
  unreadCount: number;
  recentNotifications: any[];
  incrementUnread: () => void;
  clearUnread: () => void;
  addNotification: (notif: any) => void;
}

const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      unreadCount: 0,
      recentNotifications: [],
      incrementUnread: () =>
        set((state) => ({ unreadCount: state.unreadCount + 1 })),
      clearUnread: () => set({ unreadCount: 0 }),
      addNotification: (notif) =>
        set((state) => ({
          recentNotifications: [notif, ...state.recentNotifications].slice(
            0,
            20,
          ),
        })),
    }),
    {
      name: NOTIFICATION_STORAGE,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export const authStore = useNotificationStore;

export default useNotificationStore;
