import { Link } from "expo-router";

interface Props {
    label: string;
    href: string
}

export function AuthLink({ href, label }: Props) {
    return (
        <Link className="border border-[#FAED02] font-bold text-center text-[16px] py-4 w-[300px] rounded-md" href={href as any}>{label}</Link>
    )
}