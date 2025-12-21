import useAuthStore from "@/core/store/auth.store";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";

export const ResendOTPTimer = ({ onResend }: { onResend: () => void }) => {
    const { otpTargetTime, setOtpTargetTime } = useAuthStore();
    const [secondsRemaining, setSecondsRemaining] = useState(0);

    useEffect(() => {
        if (!otpTargetTime) {
            setSecondsRemaining(0);
            return;
        }

        const calculateRemaining = () => {
            const remaining = Math.max(0, Math.floor((otpTargetTime - Date.now()) / 1000));
            setSecondsRemaining(remaining);
            return remaining;
        };

        const initial = calculateRemaining();
        if (initial === 0) {
            setOtpTargetTime(null);
            return;
        }

        const timer = setInterval(() => {
            const remaining = calculateRemaining();
            if (remaining <= 0) {
                clearInterval(timer);
                setOtpTargetTime(null);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [otpTargetTime, setOtpTargetTime]);

    const canResend = secondsRemaining === 0;

    return (
        <View>
            <Button
                disabled={!canResend}
                onPress={() => {
                    onResend();
                    setOtpTargetTime(60);
                }}
                title={canResend ? "Resend via WhatsApp" : `Resend in ${secondsRemaining}s`}
            />
        </View>
    )
};