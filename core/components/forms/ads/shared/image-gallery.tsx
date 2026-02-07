import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 94;

interface ImageGalleryProps {
    data: any[];
    mainImageLabel: string
    removePhoto: (id: number) => void
    setAsThumbnail: (id: number) => void
}

export default function ImageGallery({ data, mainImageLabel, removePhoto, setAsThumbnail }: ImageGalleryProps) {
    
    return (
        <View className='flex-row flex-wrap gap-3.5'>
            {
                data.map((item, index) => (
                    <Animated.View key={item.id} layout={LinearTransition.springify().damping(70).stiffness(500)}>
                        <TouchableOpacity
                            className="items-center justify-center relative rounded-lg my-1"
                            onPress={() => setAsThumbnail(index)}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={{ uri: item.uri || item.remoteUrl }}
                                style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT, borderRadius: 8 }}
                                contentFit='fill'
                            />
                            {
                                index === 0 && (
                                    <View className='absolute -top-4 me-4 z-30'>
                                        <Text className='text-xs text-grayish font-inter-medium'>{mainImageLabel}</Text>
                                    </View>
                                )
                            }
                            {
                                index === 0 && (
                                    <View
                                        style={{
                                            ...StyleSheet.absoluteFillObject,
                                            borderWidth: 1,
                                            borderColor: '#25D366',
                                            borderRadius: 8,
                                        }}
                                    />
                                )
                            }
                            <TouchableOpacity
                                className="absolute -top-4 -right-1 bg-red-500 rounded-full w-7 h-7 justify-center items-center border border-white"
                                onPress={() => removePhoto(index)}
                            >
                                <Ionicons name="close" size={20} color="white" className='border rounded-full border-white' />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Animated.View>
                ))
            }
        </View>

    )
};