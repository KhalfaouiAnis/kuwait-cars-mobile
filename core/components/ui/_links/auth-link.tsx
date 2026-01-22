import { DIMENSIONS } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  href: string;
}

export function AuthLink({ href, label }: Props) {
  return (
    <Link asChild href={href as any}>
      <TouchableOpacity
        style={{
          boxShadow: boxShadow(4, 6, 20).button.boxShadow,
          width: DIMENSIONS.width - 60,
        }}
        className="py-5 rounded-full border border-grayish"
      >
        <Text className="font-inter-semibold text-center text-xl dark:text-white">
          {label}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
