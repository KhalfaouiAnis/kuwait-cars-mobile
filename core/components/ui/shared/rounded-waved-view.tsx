import { ReactNode } from "react";
import { View } from "react-native";

const RoundedWavedView = ({ children }: { children: ReactNode }) => {
    return (
        <View className="flex-1 justify-center items-center">
            <View className="relative w-32 h-32 justify-center items-center">
                <View className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#ED1B24] opacity-5" style={{ transform: [{ scale: 2 }] }} />
                <View className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#ED1B24] opacity-10" style={{ transform: [{ scale: 1.9 }] }} />
                <View className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#ED1B24] opacity-15" style={{ transform: [{ scale: 1.8 }] }} />
                <View className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#ED1B24] opacity-20" style={{ transform: [{ scale: 1.7 }] }} />
                <View className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#ED1B24] opacity-30" style={{ transform: [{ scale: 1.6 }] }} />
                <View className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#ED1B24] opacity-40" style={{ transform: [{ scale: 1.4 }] }} />
                <View className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#ED1B24] opacity-60" style={{ transform: [{ scale: 1.3 }] }} />
                <View className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#ED1B24] opacity-70" style={{ transform: [{ scale: 1 }] }} />
                <View className="w-full h-full rounded-full  justify-center items-center">
                    {children}
                </View>
            </View>
        </View>
    );
};

export default RoundedWavedView