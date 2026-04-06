import { storage } from "@/core/store/storage";
import { useEffect, useRef } from "react";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const useViewTracker = (
  adId: string,
  isVisible: boolean,
  recordView: (adId: string) => void,
) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isVisible) {
      const lastViewTime = storage.getNumber(`view_ts_${adId}`);
      const isExpired = !lastViewTime || Date.now() - lastViewTime > ONE_DAY_MS;

      if (isExpired) {
        timerRef.current = setTimeout(async () => {
          try {
            recordView(adId);
            storage.set(`view_ts_${adId}`, Date.now());
          } catch (e) {
            console.error(e);
          }
        }, 3000);
      }
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, adId, recordView]);
};

export const useViewTrackerCleanup = () => {
  useEffect(() => {
    storage.getAllKeys().forEach((key) => {
      if (key.startsWith("view_ts_")) {
        const timestamp = storage.getNumber(key);
        if (timestamp && Date.now() - timestamp > ONE_DAY_MS * 2) {
          storage.remove(key);
        }
      }
    });
  }, []);
};
