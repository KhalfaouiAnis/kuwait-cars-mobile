import Svg, { Path } from 'react-native-svg';

export default function YearIcon({ size = 15 }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
            <Path d="M12.0639 0.507203L1.95274 0.500046C1.155 0.499481 0.507843 1.14572 0.507278 1.94347L0.500121 12.0546C0.499556 12.8523 1.1458 13.4995 1.94354 13.5L12.0547 13.5072C12.8524 13.5078 13.4996 12.8615 13.5001 12.0638L13.5073 1.95267C13.5078 1.15493 12.8616 0.507768 12.0639 0.507203Z" stroke="#FFB84E" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M5.56169 3.9239L3.39502 3.92236L3.39066 10.0803L5.55733 10.0818L5.56169 3.9239Z" stroke="#FFB84E" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M10.6164 3.92756L8.44971 3.92603L8.44729 7.34708L10.614 7.34861L10.6164 3.92756Z" stroke="#FFB84E" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}
