import Svg, { Path } from 'react-native-svg';

export default function TransmissionIcon({ size = 15 }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
            <Path d="M11.8258 14.0061C13.0223 14.007 13.993 13.0887 13.9938 11.9551C13.9946 10.8215 13.0252 9.90179 11.8287 9.90095C10.6321 9.9001 9.66146 10.8184 9.66066 11.952C9.65985 13.0856 10.6292 14.0053 11.8258 14.0061Z" stroke="#FFB84E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M3.16463 5.78944C4.36118 5.79028 5.33194 4.71883 5.33288 3.39629C5.33381 2.07374 4.36457 1.00092 3.16802 1.00007C1.97146 0.999222 1.00071 2.07067 0.99977 3.39322C0.998834 4.71577 1.96807 5.78859 3.16463 5.78944Z" stroke="#FFB84E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M8.22168 3.74146L10.3882 3.74299C10.7713 3.74326 11.1386 3.88769 11.4093 4.1445C11.68 4.40132 11.8319 4.74948 11.8316 5.1124L11.8282 9.90177" stroke="#FFB84E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M3.16455 5.78955L3.15874 13.9999" stroke="#FFB84E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}

