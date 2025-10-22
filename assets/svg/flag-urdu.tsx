import Svg, { Circle, Text } from 'react-native-svg';

export default function UrduFlag({ size = 45, circleColor = 'white', textColor = 'black' }) {
    const radius = size / 2;
    const fontSize = size * 0.4;
    
    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Circle
                cx={radius}
                cy={radius}
                r={radius}
                fill={circleColor}
                stroke="none"
            />
            <Text
                x={radius}
                y={radius + fontSize / 4}
                fontSize={fontSize - 4}
                fontWeight="bold"
                fill={textColor}
                textAnchor="middle"
            >
                Urdu
            </Text>
        </Svg>
    );
}
