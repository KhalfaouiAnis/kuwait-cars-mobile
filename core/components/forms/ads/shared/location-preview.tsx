import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function LocationPreview({ latitude, longitude }: { latitude: number, longitude: number }) {

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ ...StyleSheet.absoluteFillObject, borderRadius: 8 }}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            }}
        >
            <Marker coordinate={{ latitude, longitude }} />
        </MapView>
    )
}