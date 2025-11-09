import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';

export default function VideoPlayer({ source }: { source?: string }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'readyToPlay' | 'error'>('idle');
    const videoPlayer = useVideoPlayer(
        {
            uri: source || 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        },
        (player) => {
            player.loop = false;
        }
    );

    const { isPlaying: playingState } = useEvent(videoPlayer, 'playingChange', { isPlaying: videoPlayer.playing });
    const { status: playerStatus } = useEvent(videoPlayer, 'statusChange', { status: videoPlayer.status });

    useEffect(() => {
        setStatus(playerStatus);
    }, [playingState, playerStatus]);

    if (status === 'error') {
        return (
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white dark:bg-gray-800 p-4 rounded-lg w-4/5">
                    <Text className="text-error text-center">Error loading video</Text>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 items-center justify-center bg-slate-800 opacity-80 rounded-lg">
            <VideoView
                player={videoPlayer}
                contentFit="contain"
                nativeControls={true}
                style={{ alignSelf: 'center', width: Dimensions.get('window').width - 80, height: 200 }}
                fullscreenOptions={{ enable: true }}
            />
            {status === 'loading' && (
                <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}
        </View>
    );
}