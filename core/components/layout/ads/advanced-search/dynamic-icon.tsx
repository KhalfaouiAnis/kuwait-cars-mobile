import { AntDesign, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

interface Props {
    family: "AntDesign" | "Ionicons" | "MaterialCommunityIcons" | "Octicons";
    color: string
    icon: any
}

export default function DynamicIcon({ family, icon, color }: Props) {
    switch (family) {
        case 'AntDesign': return <AntDesign name={icon} size={20} color={color} />;
        case 'Ionicons': return <Ionicons name={icon} size={20} color={color} />;
        case 'Octicons': return <Octicons name={icon} size={20} color={color} />;
        case 'MaterialCommunityIcons': return <MaterialCommunityIcons name={icon} size={20} color={color} />;
        default: return null
    }
};