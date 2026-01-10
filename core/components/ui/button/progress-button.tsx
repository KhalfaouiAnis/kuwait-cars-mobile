import React from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        >
            {
                progress === 100 ? (
                    <ActivityIndicator size="small" color="black" />
                ) : (
                    <Text className='text-center text-lg font-inter-semibold'>{isPending ? `${progress}%` : title}</Text>
                )
            }

            {progress > 0 && (
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
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FAED02',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'transparent',
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
