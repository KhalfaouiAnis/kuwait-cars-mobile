import { httpClient } from "@/core/api/httpClient";
import useNotificationStore from "@/core/store/notification.store";
import { AppNotification } from "@/core/types";
import {
    InfiniteData,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};

interface NotificationsPage {
  data: AppNotification[];
  total: number;
  page: number;
  hasMore: boolean;
}

export function useSyncUnreadCount() {
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: async () => {
      const res = await httpClient.get<{ count: number }>(
        "/notifications/unread-count",
      );
      setUnreadCount(res.data.count);
      return res.data.count;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}

// ─── Infinite paginated notifications list ────────────────────────────────────
export function useNotificationsList() {
  return useInfiniteQuery<NotificationsPage>({
    queryKey: notificationKeys.lists(),
    queryFn: ({ pageParam = 1 }) =>
      httpClient
        .get<NotificationsPage>("/notifications", {
          params: { page: pageParam, limit: 20 },
        })
        .then((r) => r.data),
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
    initialPageParam: 1,
    staleTime: 30_000,
  });
}

// ─── Mark single notification as read ─────────────────────────────────────────
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => httpClient.put(`/notifications/${id}/read`),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.lists() });

      const previous = queryClient.getQueryData<
        InfiniteData<NotificationsPage>
      >(notificationKeys.lists());

      queryClient.setQueryData<InfiniteData<NotificationsPage>>(
        notificationKeys.lists(),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((n) =>
                n.id === id ? { ...n, is_read: true } : n,
              ),
            })),
          };
        },
      );

      useNotificationStore.getState().decrementUnread();
      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationKeys.lists(), context.previous);
      }
      useNotificationStore.getState().incrementUnread();
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}

// ─── Mark all as read ─────────────────────────────────────────────────────────
export function useMarkAllRead() {
  const queryClient = useQueryClient();
  const clearUnread = useNotificationStore((s) => s.clearUnread);

  return useMutation({
    mutationFn: () => httpClient.put("/notifications/read-all"),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.lists() });
      const previous = queryClient.getQueryData(notificationKeys.lists());

      queryClient.setQueryData<InfiniteData<NotificationsPage>>(
        notificationKeys.lists(),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((n) => ({ ...n, is_read: true })),
            })),
          };
        },
      );

      clearUnread();
      return { previous };
    },

    onError: (_err, _v, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationKeys.lists(), context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}
