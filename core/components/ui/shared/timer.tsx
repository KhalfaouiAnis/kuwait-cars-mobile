import { useTimer } from '@/core/hooks/shared/use-timer';
import React from 'react';
import { Text } from 'react-native';

type TimerProps = {
    duration?: number;
    mode?: 'countdown' | 'elapsed';
    label?: string;
    showLabel?: boolean;
    className?: string;
    onComplete?: () => void;
};

export default function Timer({
    duration = 60,
    mode = 'countdown',
    label = 'Resend in',
    onComplete,
    showLabel = false,
    className = '',
}: TimerProps) {
    const { seconds, start, stop, isRunning } = useTimer({
        duration,
        mode,
        autoStart: true,
        onComplete,
    });

    const formatTime = (s: number) => {
        if (mode === 'elapsed') {
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            const sec = s % 60;
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        }
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <Text className={className}>
            {formatTime(seconds)}
        </Text>
    );
}