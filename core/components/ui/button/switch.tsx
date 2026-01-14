import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

const Switch = ({ value, onValueChange, isRTL }: { value: boolean, onValueChange: any, isRTL?: boolean }) => {
    const [isEnabled, setIsEnabled] = useState(value || false);
    const translateX = new Animated.Value(isEnabled ? isRTL ? -20 : 20 : 0);

    const toggleSwitch = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        onValueChange?.(newValue);
        Animated.timing(translateX, {
            toValue: newValue ? isRTL ? -20 : 20 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            className={`w-12 h-6 ${isEnabled ? "bg-primary-500" : "bg-gray-200"} rounded-full items-start justify-center p-1 active:opacity-75`}
            onPress={toggleSwitch}
            activeOpacity={0.8}
        >
            <Animated.View
                className={`w-5 h-5 bg-white rounded-full shadow-md ${isEnabled ? 'bg-green-300' : 'bg-white'}`}
                style={{ transform: [{ translateX }] }}
            />
        </TouchableOpacity>
    );
};

export default Switch