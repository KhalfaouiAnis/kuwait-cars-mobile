import Svg, { Path, Rect } from 'react-native-svg';

export default function TTextIcon() {
    return (
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <Rect x="1" y="1" width="28" height="28" rx="11" fill="white" />
            <Rect x="1" y="1" width="28" height="28" rx="11" stroke="#1F51FF" strokeWidth="2" />
            <Rect x="1" y="1" width="28" height="28" rx="11" stroke="#FF1493" strokeOpacity="0.1" strokeWidth="2" />
            <Path
                fill="#1F51FF"
                d="M20.2849 13.26L18.2329 13.44L17.8729 11.352H16.0189V18.948H17.9269V21H11.8069V18.948H13.6069V11.352H11.7529L11.3929 13.44L9.34089 13.26L9.70089 9.3H19.9249L20.2849 13.26Z"
            />
        </Svg>
    );
}
