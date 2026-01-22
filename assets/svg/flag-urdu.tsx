import Svg, { Circle, Text } from "react-native-svg";

export default function UrduFlag({ size = 45 }) {
  const radius = size / 2;
  const fontSize = size * 0.4;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={radius}
        cy={radius}
        r={radius - 1}
        fill="white"
        stroke="#A8A8A8"
      />
      <Text
        x={radius}
        y={radius + fontSize / 4}
        fontSize={fontSize - 4}
        fontWeight="bold"
        fill="black"
        textAnchor="middle"
      >
        Urdu
      </Text>
    </Svg>
  );
}
