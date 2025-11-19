import { IMAGES } from '@/core/constants/images';
import React, { useRef } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';

const { width } = Dimensions.get('window');
const TEMP_SIZE = width;

interface WatermarkerConfig {
    logoAsset?: ImageSourcePropType;
    bottom?: number;
    right?: number;
    logoSize?: number;
    opacity?: number;
}

export const useWatermarker = () => {
    const viewShotRef = useRef<ViewShot | null>(null);
    const generateWatermarkedUri = async (baseImageUri: string): Promise<string | null> => {
        if (!baseImageUri || !viewShotRef.current) {
            console.error("Missing base URI or viewShot ref.");
            return null;
        }

        try {
            const uri = await captureRef(viewShotRef.current, {
                format: "png",
                quality: 0.9,
                result: "base64",
                width: TEMP_SIZE,
                height: TEMP_SIZE,
            });

            return uri;

        } catch (error) {
            console.error("ViewShot capture failed in hook:", error);
            return null;
        }
    };

    interface WatermarkerCaptureViewProps {
        imageUri: string | null;
        config?: WatermarkerConfig;
    }

    const WatermarkerCaptureView: React.FC<WatermarkerCaptureViewProps> = ({
        imageUri,
        config = {}
    }) => {

        const {
            logoAsset = IMAGES.Logo,
            bottom = 10,
            right = 10,
            logoSize = 60,
            opacity = 0.8
        } = config;

        return (
            <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
                <View style={styles.captureContainer}>
                    <Image source={{ uri: imageUri || undefined }} style={styles.baseImage} />
                    <Image
                        source={logoAsset}
                        style={[
                            styles.watermarkLogo,
                            { bottom, right, width: logoSize, height: logoSize, opacity }
                        ]}
                    />
                </View>
            </ViewShot>
        );
    };

    return {
        generateWatermarkedUri,
        WatermarkerCaptureView
    };
};

const styles = StyleSheet.create({
    captureContainer: {
        position: 'absolute',
        top: -1000,
        left: -1000,
        width: TEMP_SIZE,
        height: TEMP_SIZE,
    },
    baseImage: {
        width: TEMP_SIZE,
        height: TEMP_SIZE,
        resizeMode: 'cover',
    },
    watermarkLogo: {
        position: 'absolute',
        resizeMode: 'contain',
    },
});