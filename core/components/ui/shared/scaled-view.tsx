import { scaleHeight, scaleWidth } from '@/core/utils/scaling';
import React from 'react';
import { View, ViewProps } from 'react-native';

interface ScaledViewProps extends ViewProps {
    figmaWidth?: number; // Optional Figma width in px
    figmaHeight?: number; // Optional Figma height in px
    className?: string; // NativeWind classes for everything else (layout, colors, etc.)
}

export default function ScaledView({
    figmaWidth,
    figmaHeight,
    className,
    style,
    children,
    ...props
}: ScaledViewProps) {
    const scaledStyle = {
        ...(figmaWidth && { width: scaleWidth(figmaWidth) }),
        ...(figmaHeight && { height: scaleHeight(figmaHeight) }),
    };

    return (
        <View className={className} style={[scaledStyle, style]} {...props}>
            {children}
        </View>
    );
}