import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export const StaticMapPreview = ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
    const zoom = 15;
    const size = '600x300';
    const mapUrl = `https://maps.googleapis.com{latitude},${longitude}&zoom=${zoom}&size=${size}&markers=color:red%7C${latitude},${longitude}&key=${API_KEY}`;

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
