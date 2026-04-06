import { boxShadow } from "@/core/utils/cn";
import { View } from "react-native";

export default function RedDot() {
    return (
        <View style={{
            width: 4,
            height: 4,
            borderRadius: 100,
            backgroundColor: "#FF0000",
            boxShadow: boxShadow(0, 4, 4).button.boxShadow,
        }} />
    )
}