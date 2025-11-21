import { Link } from "expo-router";

interface Props {
    label: string;
    href: string
}

export function AuthLink({ href, label }: Props) {
    return (
        <Link className="border border-primary-500 font-bold text-center text-base py-4 w-[300px] rounded-md" href={href as any}>{label}</Link>
    )
}