import { Ionicons } from '@expo/vector-icons';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import AudioTrackProgress from './audio-track-progress';

const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function VideoPlayer({ source }: { source?: string }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'readyToPlay' | 'error'>('idle');
    const [isControlsVisible, setIsControlsVisible] = useState(true);

    const videoPlayer = useVideoPlayer(
        {
            uri: source || 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        },
        (player) => {
            player.loop = false;
            // player.play();
        }
    );

    const duration = videoPlayer.duration || 0;
    const position = videoPlayer.currentTime || 0;
    const progress = duration > 0 ? (position / duration) * 100 : 0;

    const { isPlaying } = useEvent(videoPlayer, 'playingChange', { isPlaying: videoPlayer.playing });
    const { status: playerStatus } = useEvent(videoPlayer, 'statusChange', { status: videoPlayer.status });

    const togglePlayPause = () => {
        if (isPlaying) {
            videoPlayer.pause();
        } else {
            if (videoPlayer.currentTime >= duration) {
                videoPlayer.replay()
            }
            videoPlayer.play();
        }
        setTimeout(() => {
            if (isControlsVisible) {
                setIsControlsVisible(false);
            }
        }, 2000);
    };

    useEffect(() => {
        setStatus(playerStatus);
    }, [isPlaying, playerStatus]);

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
        <View
            className="bg-slate-900 overflow-hidden relative w-full aspect-video rounded-lg"        >
            <VideoView
                player={videoPlayer}
                nativeControls={false}
                style={{ flex: 1 }}
                fullscreenOptions={{ enable: false }}
                onTouchStart={() => setIsControlsVisible(!isControlsVisible)}
            />
            {isControlsVisible && (
                <View className="absolute inset-0 flex justify-center items-center">
                    {status === 'loading' ? (
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    ) : (
                        <>
                            <Pressable
                                onPress={togglePlayPause}
                                className="p-4 bg-black/60 rounded-full shadow-lg"
                            >
                                <Ionicons name={isPlaying ? "stop" : "play"} size={24} color={"yellow"} />
                            </Pressable>
                            <View className="absolute bottom-0 left-0 right-0 p-3 bg-slate-800 flex-row items-center">
                                {/* <View className="flex-1 h-1 bg-gray-500 rounded-full mx-2">
                                    <View
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </View> */}
                                <AudioTrackProgress progress={progress} />
                                <Text className="text-white text-xs mr-3 w-20 text-right">
                                    {formatTime(position)} / {formatTime(duration)}
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            )}
        </View>
    );
}