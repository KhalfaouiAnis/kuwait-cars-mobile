import { Ionicons } from '@expo/vector-icons';
import {
    DndProvider,
    Draggable,
    DraggableGrid,
    DraggableGridProps,
} from '@mgcrea/react-native-dnd';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';

const IMAGE_WIDTH = 92;
const IMAGE_HEIGHT = 92;

interface ImagesGridProps {
    data: any[];
    handleImagesReorder: (newOrder: string[]) => void;
    removePhoto: (uri: string, isThumbnail: boolean) => void
}

export default function DraggableImageGrid({ data, handleImagesReorder, removePhoto }: ImagesGridProps) {
    const onGridOrderChange: DraggableGridProps['onOrderChange'] = value => {
        console.log('onGridOrderChange', value);
        handleImagesReorder(value as string[])
    };

    return (
        <DndProvider>
            <DraggableGrid
                direction="row"
                size={3}
                style={styles.grid}
                onOrderChange={onGridOrderChange}>
                {data?.map(item => (
                    <Draggable key={item.id} id={item.id} style={styles.draggable}>
                        <Image
                            source={{ uri: item.uri }}
                            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT, borderRadius: 8 }}
                            contentFit='cover'
                        />
                        <TouchableOpacity
                            className="absolute z-20 -top-4 -right-2 bg-red-500 rounded-full w-7 h-7 justify-center items-center"
                            onPress={() => removePhoto(item.uri, item.type === "THUMBNAIL")}
                        >
                            <Ionicons name="close" size={20} color="white" className='border rounded-full border-white' />
                        </TouchableOpacity>
                    </Draggable>
                ))}
            </DraggableGrid>
        </DndProvider>
    );
};

const styles = StyleSheet.create({
    grid: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        rowGap: 22,
    },
    draggable: {
        position: "relative",
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
});