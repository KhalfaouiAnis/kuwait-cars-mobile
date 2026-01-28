import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export const ResendOTPTimer = ({ onResend }: { onResend: () => void }) => {
    const { otpTargetTime, setOtpTargetTime } = useAuthStore();
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const { t } = useTranslation("auth");
    const { isRTL } = useUserPreferencesStore()

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
        <View className="items-center justify-center" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <Pressable
                disabled={!canResend}
                onPress={() => {
                    onResend();
                    setOtpTargetTime(60);
                }}
            >
                <Text className="dark:text-grayish">
                    {canResend ? t("ResendViaWhatsApp") : `${t("ResendIn")} ${secondsRemaining}${t("s")}`}
                </Text>
            </Pressable>
        </View>
    )
};