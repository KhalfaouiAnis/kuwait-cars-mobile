import { CAR_COLORS } from "@/core/constants";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function useColors() {
  const { t } = useTranslation("common");
  const COLORS = useMemo(() => {
    return CAR_COLORS.map((color) => ({
      ...color,
      label: t(`colors.${color.label}`),
    }));
  }, [t]);

  return COLORS;
}
