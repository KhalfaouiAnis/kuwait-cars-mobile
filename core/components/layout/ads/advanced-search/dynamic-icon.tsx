import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

interface Props {
    family: "AntDesign" | "Ionicons" | "MaterialCommunityIcons" | "Octicons" | "FontAwesome";
    color: string
    icon: any
}

export default function DynamicIcon({ family, icon, color }: Props) {
    switch (family) {
        case 'Ionicons': return <Ionicons name={icon} size={20} color={color} />;
        case 'Octicons': return <Octicons name={icon} size={20} color={color} />;
        case 'AntDesign': return <AntDesign name={icon} size={20} color={color} />;
        case 'FontAwesome': return <FontAwesome name={icon} size={20} color={color} />;
        case 'MaterialCommunityIcons': return <MaterialCommunityIcons name={icon} size={20} color={color} />;
        default: return null
    }
};