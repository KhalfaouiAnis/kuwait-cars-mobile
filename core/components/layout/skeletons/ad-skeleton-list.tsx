import { View } from "react-native";
import { AdCardSkeleton } from "./ad-skeleton-card";

export const AdSkeletonList = ({ count = 3 }) => {
    return (
        <View>
            {Array.from({ length: count }).map((_, i) => (
                <AdCardSkeleton key={i} />
            ))}
        </View>
    );
};