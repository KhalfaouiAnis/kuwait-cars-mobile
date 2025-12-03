import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import AudioTrackProgress from './audio-track-progress';

function formatTime(duration: number) {
    const m = Math.floor(duration / 60);
    const sec = duration % 60;
    return `${m.toString().padStart(1, '0')}:${sec.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ source }: { source?: string }) {
    const audioPlayer = useAudioPlayer(source);
    const status = useAudioPlayerStatus(audioPlayer);
    const progress = Math.round(((status.currentTime || 0) * 100) / status.duration);

    useEffect(() => {
        audioPlayer.play();
    }, [audioPlayer]);

    const handleControl = () => {
        if (status.playing) {
            audioPlayer.pause()
        } else if (!status.playing && status.currentTime >= status.duration) {
            audioPlayer.seekTo(0)
            audioPlayer.play()
        } else {
            audioPlayer.play()
        }
    }

    return (
        <View className="flex-1 items-center p-2 justify-center bg-slate-200 opacity-80 rounded-full">
            {!status.isLoaded ? (
                <ActivityIndicator size="small" color="yellow" />
            ) : (
                <View className='bg-transparent flex-1 gap-2 flex-row items-center'>
                    <TouchableOpacity className='p-1' onPress={handleControl}>
                        <Ionicons name={status.playing ? "stop" : "play"} size={24} color={"yellow"} />
                    </TouchableOpacity>
                    <AudioTrackProgress progress={progress || 0} />
                    <Text className='text-gray-600'>({formatTime(Math.round(status.duration))})</Text>
                </View>
            )}
        </View>
    );
}