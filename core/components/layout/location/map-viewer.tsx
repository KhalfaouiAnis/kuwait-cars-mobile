import AppModal from "@/core/components/ui/dialog/modal";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

interface MapViewerProps {
    visible: boolean;
    currentLocation?: { latitude: number, longitude: number };
    onClose: () => void;
    handleMapPress: (event: MapPressEvent) => void
}

export default function MapViewer({ visible, currentLocation, onClose, handleMapPress }: MapViewerProps) {
    console.log(currentLocation);
    
    return <AppModal
        onClose={onClose}
        visible={visible}
        header={<View className="w-full py-2">
            <TouchableOpacity onPress={onClose}>
                <Text className="text-center">
                    <Ionicons color="#D80027" name="close-circle" size={40} />
                </Text>
            </TouchableOpacity>
        </View>}
        renderContent={() => (
            <MapView
                onPress={handleMapPress}
                style={{ ...StyleSheet.absoluteFillObject, marginTop: 70 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {
                    currentLocation && (
                        <Marker
                            coordinate={currentLocation}
                        // title="Your Selected Location"
                        // description="This is where you picked"
                        />
                    )
                }
            </MapView>
        )}
    />
}