import { LanguageCode } from "@/core/types";
import ArabicFlag from "./flag-arabic";
import EnglishFlag from "./flag-english";
import FrenshFlag from "./flag-frensh";
import IndianFlag from "./flag-indian";
import SpanishFlag from "./flag-spanish";
import UrduFlag from "./flag-urdu";

export default function Flag({ name, size }: { name: LanguageCode, size?: number }) {
    switch (name) {
        case "ar":
            return <ArabicFlag size={size} />
        case "en":
            return <EnglishFlag size={size} />
        case "es":
            return <SpanishFlag size={size} />
        case "fr":
            return <FrenshFlag size={size} />
        case "jo":
            return <UrduFlag size={size} />
        case "in":
            return <IndianFlag size={size} />
        default:
            return <ArabicFlag size={size} />
    }
}