import { boxShadow } from '@/core/utils/cn';
import React from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    onPress: any;
    isPending: boolean,
    progress: number,
    title: string
}

export const ProgressButton = ({ onPress, isPending, progress, title }: Props) => {
    const progressWidth = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(progressWidth, {
            toValue: progress,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [progress, progressWidth]);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isPending}
            style={styles.button}
            className="py-3 rounded-lg bg-primary-500 disabled:bg-yellow-200"
        >
            <Text className='text-center text-lg font-inter-semibold'>{isPending ? <ActivityIndicator size="small" color="black" /> : title}</Text>
            {/* {
                progress > 0 && progress < 100 ? (
                    <ActivityIndicator size="small" color="black" />
                ) : (
                    <Text className='text-center text-lg font-inter-semibold'>{isPending ? `${progress}%` : title}</Text>
                )
            } */}

            {/* {progress > 0 && (
                <View style={styles.progressContainer}>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                                width: progressWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%'],
                                })
                            }
                        ]}
                    />
                </View>
            )} */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 45,
        width: 200,
        alignItems: "center",
        borderRadius: 15,
        justifyContent: "center",
        ...boxShadow(4, 6, 20).button
    },
    progressContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#E67E22',
    },
});
