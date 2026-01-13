import { User } from "@/core/types";

export interface CTAProps {
  label?: string;
  variant?: "icon" | "button";
  user?: User;
  additional_number?: string;
  second_additional_number?: string;
}
