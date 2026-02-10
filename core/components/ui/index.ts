import { CAR_COLORS, PROVINCES, UNIT_OPTIONS, YEARS } from "@/core/constants";
import { SUBSCRIPTION_PLANS } from "@/core/constants/ad";
import {
  GlobalSelectOption,
  SelectOption,
  SubscriptionDetail,
} from "@/core/types";
import { AD_MASTER_SCHEMA_KEY } from "@/core/types/schema/ads";
import { SelectAdapters } from "@/core/utils/select-adapters";
import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";
import BasicInfo from "../forms/ads/shared/steps/basic-info";
import GalleryPicker from "../forms/ads/shared/steps/gallery-picker";
import AdMedia from "../forms/ads/shared/steps/media";
import PlanSelection from "../forms/ads/shared/steps/plan-selection";
import RadioGroup from "./input/radio-group";
import AppSelect from "./input/select/app-select";
import AreaSelect from "./input/select/area-select";
import BaseTextInput from "./input/text/base-text-input";
import InputWithSpeech from "./input/text/speech-input";
import TextAreaSpeech from "./input/text/text-area-speech";
import MediaUploader from "./media/media-uploader";
import UnitSelector from "./menu/unit-selector";
import PlanSelector from "./plan/plan-selector";

export type AdStepKey =
  | "basic_info"
  | "media"
  | "video"
  | "detailed_info"
  | "detailed_info_2"
  | "choose_plan";

interface BaseInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface BaseTextInputProps<T extends FieldValues>
  extends TextInputProps, BaseInputProps<T> {
  icon?: ReactNode;
  fullWidth?: boolean;
}

export interface PlanSelectorProps<T extends FieldValues> {
  plans: SubscriptionDetail[];
  name: Path<T>;
}

export interface MediaSelectorProps {
  name: string;
  maxImages?: number;
}

export interface BaseRadioInputProps<T extends FieldValues>
  extends TextInputProps, BaseInputProps<T> {
  options: SelectOption[];
  fullWidth?: boolean;
  bordered?: boolean;
  borderRadius?: number;
  square?: boolean;
}

export interface BaseSelectInputProps<T extends FieldValues, O = any>
  extends TextInputProps, BaseInputProps<T> {
  options: O[];
  adapter: {
    map: (item: O) => GlobalSelectOption;
    isSelected: (currentValue: any, itemValue: any) => boolean;
    getLabel: (currentValue: any) => string | undefined;
  };
  translatedValue?: boolean;
}

export interface BaseUnitSelectorInputProps<
  T extends FieldValues,
  O = any,
> extends BaseInputProps<T> {
  options: O[];
  adapter: {
    map: (item: O) => GlobalSelectOption;
    isSelected: (currentValue: any, itemValue: any) => boolean;
    getLabel: (currentValue: any) => string | undefined;
  };
}

export const FIELD_COMPONENTS = {
  areaselect: AreaSelect,
  plan: PlanSelector,
  media: GalleryPicker,
  select: AppSelect,
  radio: RadioGroup,
  text: BaseTextInput,
  textSpeech: InputWithSpeech,
  textareaSpeech: TextAreaSpeech,
  unitSelector: UnitSelector,
} as const;

type Blueprint<P> = Omit<P, "control" | "errors">;

export type TFieldConfig<T extends FieldValues> =
  | ({ type: "text" } & BaseTextInputProps<T>)
  | ({ type: "select" } & BaseSelectInputProps<T, any>)
  | ({ type: "radio" } & BaseRadioInputProps<T>)
  | ({ type: "plan" } & PlanSelectorProps<T>)
  | ({ type: "unitSelector" } & BaseUnitSelectorInputProps<T>)
  | ({ type: "media" } & MediaSelectorProps);

export type FieldBlueprint<T extends FieldValues> =
  | ({ type: "text" } & Blueprint<BaseTextInputProps<T>>)
  | ({ type: "select" } & Blueprint<BaseSelectInputProps<T>>)
  | ({ type: "radio" } & Blueprint<BaseRadioInputProps<T>>)
  | ({ type: "plan" } & Blueprint<PlanSelectorProps<T>>)
  | ({ type: "media" } & Blueprint<MediaSelectorProps>)
  | ({ type: "unitSelector" } & Blueprint<BaseUnitSelectorInputProps<T>>);

export type StepFieldKeysRegistry = Record<
  AD_MASTER_SCHEMA_KEY,
  Partial<Record<AdStepKey, string[]>>
>;

const STEP_FIELD_KEYS: StepFieldKeysRegistry = {
  used_cars: {
    basic_info: [
      "year",
      "exterior_color",
      "mileage",
      "mileage_unit",
      "hide_license_plate",
      "fuel_type",
      "cylinders",
      "transmission",
      "under_warranty",
      "roof",
    ],
    media: ["media"],
    video: ["video"],
    detailed_info: [
      "province",
      "area",
      "location",
      "price",
      "title",
      "description",
    ],
    detailed_info_2: [
      "additional_number",
      "additional_number2",
      "contact_whatsapp",
      "receive_calls",
      "xcar_calls",
      "xcar_chat",
    ],
    choose_plan: ["plan"],
  },
  motorcycles: {
    basic_info: [
      "year",
      "exterior_color",
      "mileage",
      "mileage_unit",
      "hide_license_plate",
      "fuel_type",
      "cylinders",
      "transmission",
      "under_warranty",
      "roof",
    ],
    media: ["media"],
    video: ["video"],
    detailed_info: [
      "province",
      "area",
      "location",
      "price",
      "title",
      "description",
    ],
    detailed_info_2: [
      "additional_number",
      "additional_number2",
      "contact_whatsapp",
      "receive_calls",
      "xcar_calls",
      "xcar_chat",
    ],
    choose_plan: ["plan"],
  },
  part_accessories: {
    detailed_info: [
      "province",
      "area",
      "location",
      "hide_license_plate",
      "price",
      "title",
      "description",
    ],
    media: ["media"],
    video: ["video"],
    detailed_info_2: [
      "additional_number",
      "additional_number2",
      "contact_whatsapp",
      "receive_calls",
      "xcar_calls",
      "xcar_chat",
    ],
    choose_plan: ["plan"],
  },
  show: {
    detailed_info: ["hide_license_plate", "title", "description"],
    media: ["media"],
    video: ["video"],
    detailed_info_2: [
      "additional_number",
      "additional_number2",
      "xcar_calls",
      "xcar_chat",
    ],
    choose_plan: ["plan"],
  },
  common: {
    detailed_info: [
      "province",
      "area",
      "location",
      "hide_license_plate",
      "price",
      "title",
      "description",
    ],
    media: ["media"],
    video: ["video"],
    detailed_info_2: ["additional_number", "contact_whatsapp"],
    choose_plan: ["plan"],
  },
} as const;

export const FLOW_CONFIGS: Record<AD_MASTER_SCHEMA_KEY, AdStepKey[]> = {
  used_cars: [
    "choose_plan",
    "basic_info",
    "media",
    "video",
    "detailed_info",
    "detailed_info_2",
  ],
  motorcycles: [
    "choose_plan",
    "basic_info",
    "media",
    "video",
    "detailed_info",
    "detailed_info_2",
  ],
  part_accessories: [
    "choose_plan",
    "detailed_info",
    "media",
    "video",
    "detailed_info_2",
  ],
  show: ["choose_plan", "detailed_info", "media", "video", "detailed_info_2"],
  common: ["choose_plan", "detailed_info", "media", "video", "detailed_info_2"],
} as const;

export type StepFieldRegistry<T extends FieldValues> = Record<
  AdStepKey,
  Record<string, FieldBlueprint<T>>
>;

export const STEP_FIELD_REGISTRY: StepFieldRegistry<any> = {
  choose_plan: {
    plan: {
      type: "plan",
      name: "plan",
      plans: SUBSCRIPTION_PLANS,
    },
  },
  basic_info: {
    year: {
      required: true,
      type: "select",
      name: "year",
      placeholder: "year",
      options: YEARS,
      adapter: SelectAdapters.fromPrimitive,
    },
    exterior_color: {
      type: "select",
      required: true,
      name: "exterior_color",
      placeholder: "createAd.exteriorColor",
      label: "color",
      options: CAR_COLORS,
      adapter: SelectAdapters.fromPrimitive,
    },
    mileage: {
      name: "mileage",
      required: true,
      fullWidth: false,
      type: "text",
      keyboardType: "number-pad",
      placeholder: "createAd.Mileage",
    },
    mileage_unit: {
      placeholder: "KM",
      name: "mileage_unit",
      type: "unitSelector",
      options: UNIT_OPTIONS,
      adapter: SelectAdapters.fromPrimitive,
    },
    hide_license_plate: {
      name: "hide_license_plate",
      type: "radio",
      label: "createAd.Hidevehiclelicenseplate",
      fullWidth: true,
      bordered: true,
      borderRadius: 30,
      options: [
        { id: "Yes", label: "yes", value: "Yes" },
        { id: "No", label: "no", value: "No" },
      ],
    },
    fuel_type: {
      name: "fuel_type",
      type: "radio",
      label: "createAd.fuelType",
      fullWidth: true,
      options: [
        { id: "Petrol", label: "createAd.Petrol", value: "Petrol" },
        { id: "Diesel", label: "createAd.Diesel", value: "Diesel" },
        { id: "Electric", label: "createAd.Electric", value: "Electric" },
        { id: "Hybrid", label: "createAd.Hybrid", value: "Hybrid" },
      ],
    },
    cylinders: {
      name: "cylinders",
      type: "radio",
      label: "createAd.Cylinders",
      square: true,
      borderRadius: 5,
      options: [
        { id: "2", label: "2", value: "2" },
        { id: "4", label: "4", value: "4" },
        { id: "5", label: "5", value: "5" },
        { id: "6", label: "6", value: "6" },
        { id: "8", label: "8", value: "8" },
        { id: "10", label: "10", value: "10" },
        { id: "12", label: "12", value: "12" },
      ],
    },
    transmission: {
      name: "transmission",
      type: "radio",
      label: "createAd.transmission",
      fullWidth: true,
      bordered: true,
      borderRadius: 30,
      options: [
        { id: "auto", label: "Auto", value: "Auto" },
        { id: "manual", label: "Manual", value: "Manual" },
      ],
    },
    under_warranty: {
      name: "under_warranty",
      type: "radio",
      label: "createAd.under_warranty",
      fullWidth: true,
      bordered: true,
      borderRadius: 30,
      options: [
        { id: "Yes", label: "yes", value: "Yes" },
        { id: "No", label: "no", value: "No" },
      ],
    },
    roof: {
      name: "roof",
      type: "radio",
      label: "createAd.roof",
      borderRadius: 20,
      options: [
        { id: "Sunroof", label: "createAd.Sunroof", value: "Sunroof" },
        { id: "Panoramic", label: "createAd.Panoramic", value: "Panoramic" },
        {
          id: "Convertible Roof",
          label: "createAd.ConvertibleRoof",
          value: "ConvertibleRoof",
        },
      ],
    },
  },
  detailed_info: {
    province: {
      name: "province",
      type: "select",
      label: "Province",
      placeholder: "Province",
      options: PROVINCES,
      adapter: SelectAdapters.fromObject("province"),
    },
    area: {
      name: "area",
      options: [],
      type: "select",
      placeholder: "Area",
      label: "Area",
      adapter: SelectAdapters.fromObject("area"),
    },
  },
  detailed_info_2: {},
  media: {
    media: {
      name: "media",
      type: "media",
      maxImages: 6,
    },
  },
  video: {},
};

export interface BaseStepViewProps<T extends FieldValues> {
  fields: Record<Partial<keyof T>, FieldBlueprint<T>>;
}

export const STEP_VIEWS: Record<AdStepKey, React.FC<any>> = {
  media: AdMedia,
  choose_plan: PlanSelection,
  basic_info: BasicInfo,
  video: MediaUploader,
  detailed_info: MediaUploader,
  detailed_info_2: MediaUploader,
};
