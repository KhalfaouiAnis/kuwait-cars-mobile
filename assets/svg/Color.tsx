import Svg, { Circle, Path } from 'react-native-svg';

export default function ColorIcon({ size = 16 }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
            <Circle cx="8" cy="8" r="7.5" fill="white" stroke="#FFB84E" />
            <Path d="M7.8265 11.75C9.99339 11.75 11.75 10.0711 11.75 8C11.75 5.92893 9.99339 4.25 7.8265 4.25V8L4.25 9.54412C4.86575 10.8449 6.23554 11.75 7.8265 11.75Z" stroke="#FFB84E" />
        </Svg>
    );
}

