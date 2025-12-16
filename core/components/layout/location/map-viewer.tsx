import AppModal from "@/core/components/ui/dialog/modal";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentPositionAsync, LocationObjectCoords, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

interface MapViewerProps {
    visible: boolean;
    currentLocation?: { latitude: number, longitude: number };
    onClose: () => void;
    handleMapPress: (event: MapPressEvent) => void
}

export default function MapViewer({ visible, currentLocation, onClose, handleMapPress }: MapViewerProps) {
    const [userLocation, setUserLocation] = useState<LocationObjectCoords | null>(null);
    const mapRef = useRef<null | any>(null);

    useEffect(() => {
        (async () => {
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                Alert.alert("Location permission is required!")
                return;
            }

            const current = await getCurrentPositionAsync({});
            setUserLocation(current.coords);
        })();
    }, []);

    useEffect(() => {
        if (userLocation && mapRef.current) {
            const newRegion = {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };

            mapRef.current.animateToRegion(newRegion, 2000);
        }
    }, [userLocation]);

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
                ref={mapRef}
                onPress={handleMapPress}
                style={{ ...StyleSheet.absoluteFillObject, marginTop: 70, marginBottom: 50 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {
                    currentLocation && (
                        <Marker coordinate={currentLocation} />
                    )
                }
            </MapView>
        )}
    />
}