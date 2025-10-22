import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export default function ArabicFlag({ size = 45 }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 45 45" fill="none">
            <G clipPath="url(#clip0_551_1616)">
                <Path d="M0 0.000732422H45V44.9998H0V0.000732422Z" fill="white" />
                <Path d="M0 0.000732422H45V15.0004H0V0.000732422Z" fill="#6DA544" />
                <Path d="M0 30H45V44.9996H0V30Z" fill="#D80027" />
                <Path d="M14.674 30.0003L0 44.9998V0.000732422L14.674 15.0002V30.0003Z" fill="black" />
            </G>
            <Defs>
                <ClipPath id="clip0_551_1616">
                    <Rect width="45" height="45" rx="22.5" fill="white" />
                </ClipPath>
            </Defs>

        </Svg>
    );
}
