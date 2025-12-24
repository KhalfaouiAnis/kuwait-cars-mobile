import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export const StaticMapPreview = ({ lat, lng }: { lat: number, lng: number }) => {
    const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_STREET_STATIC_API_KEY || ""

    const params = new URLSearchParams({
        center: `${lat},${lng}`,
        zoom: '15',
        size: '600x300',
        markers: `color:red|${lat},${lng}`,
        key: API_KEY
    });

    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: mapUrl }}
                style={styles.mapImage}
                contentFit="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    mapImage: {
        width: '100%',
        height: 120,
    },
});
