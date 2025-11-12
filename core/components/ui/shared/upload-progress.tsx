import { useEffect } from 'react';
import Reanimated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function UploadProgress({ uploadProgress }: { uploadProgress: number }) {

    const progressSharedValue = useSharedValue(0);

    useEffect(() => {
        progressSharedValue.value = withTiming(uploadProgress / 100, { duration: 300 });
    }, [uploadProgress, progressSharedValue]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progressSharedValue.value * 100}%`,
    }));

    return (
        <Reanimated.View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <Reanimated.View
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={animatedStyle}
            />
        </Reanimated.View>
    )
}