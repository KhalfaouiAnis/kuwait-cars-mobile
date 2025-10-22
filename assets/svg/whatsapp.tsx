import { View } from 'react-native';
import Svg, { Defs, Image, Pattern, Rect, Use } from 'react-native-svg';

export default function Whatsapp({ size = 28, classname = "" }) {
    return (
        <View className={classname}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
                <Rect width={size} height={size} fill="url(#pattern0_1277_196)" />
                <Defs>
                    <Pattern id="pattern0_1277_196" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <Use xlinkHref="#image0_1277_196" transform="scale(0.0111111)" />
                    </Pattern>
                    <Image id="image0_1277_196" width="90" height="90" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                </Defs>
            </Svg>
        </View>
    );
}
