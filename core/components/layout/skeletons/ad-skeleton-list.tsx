import { View } from "react-native";
import { AdCardSkeleton } from "./ad-skeleton-card";

export const AdSkeletonList = ({ count = 3, horizontal }: { count?: number, horizontal?: boolean }) => {
    return (
        <View style={{ flexDirection: horizontal ? "row" : "column" }}>
            {Array.from({ length: count }).map((_, i) => (
                <AdCardSkeleton key={i} height={horizontal ? 100 : undefined} />
            ))}
        </View>
    );
};