import { TimerMode } from "@/core/types";
import { useCallback, useEffect, useRef, useState } from "react";

type UseTimerProps = {
  duration?: number;
  mode?: TimerMode;
  autoStart?: boolean;
  onTick?: (seconds: number) => void;
  onComplete?: () => void;
};

export const useTimer = ({
  duration = 60,
  mode = "countdown",
  autoStart = true,
  onTick,
  onComplete,
}: UseTimerProps) => {
  const [seconds, setSeconds] = useState(mode === "countdown" ? duration : 0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        const next = mode === "countdown" ? prev - 1 : prev + 1;
        onTick?.(next);
        if (mode === "countdown" && next <= 0) {
          stop();
          onComplete?.();
          return 0;
        }
        return next;
      });
    }, 1000);
  }, [mode, onComplete, onTick]);

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const pause = () => {
    stop();
  };

  const reset = (newDuration?: number) => {
    stop();
    setSeconds(mode === "countdown" ? newDuration || duration : 0);
    if (autoStart) start();
  };

  useEffect(() => {
    if (autoStart) start();
    return () => stop();
  }, [autoStart, start]);

  return { seconds, isRunning, start, stop, pause, reset };
};
