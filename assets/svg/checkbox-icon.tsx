import Svg, { Path, Rect } from 'react-native-svg';

const CheckboxIcon = ({ checked }: { checked: boolean }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Rect
            x="2" y="2" width="20" height="20" rx="4"
            fill="#D9D9D9"
            stroke="#A8A8A8"
        />
        <Path
            d="M7 12L10 15L17 8"
            stroke={checked ? "#25D366" : "#000000"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default CheckboxIcon