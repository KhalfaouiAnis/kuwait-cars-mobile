import { CAR_COLORS, PROVINCES, YEARS } from "@/core/constants";
import { SUBSCRIPTION_PLANS } from "@/core/constants/ad";
import {
  AdvertisementInterface,
  GlobalSelectOption,
  SelectOption,
  SubscriptionDetail,
} from "@/core/types";
import { StepKey } from "@/core/types/schema/shared/commun";
import { SelectAdapters } from "@/core/utils/select-adapters";
import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";
import BasicInfo from "../forms/ads/shared/steps/basic-info";
import RadioGroup from "./input/radio-group";
import AppSelect from "./input/select/app-select";
import AreaSelect from "./input/select/area-select";
import BaseTextInput from "./input/text/base-text-input";
import InputWithSpeech from "./input/text/speech-input";
import TextAreaSpeech from "./input/text/text-area-speech";
import MediaUploader from "./media/media-uploader";
import PlanSelector from "./plan/plan-selector";
import { renderOption } from "./shared/render-option";

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

export interface PlanSelectorProps<T extends FieldValues>
  extends TextInputProps, BaseInputProps<T> {
  plans: SubscriptionDetail[];
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

export const FIELD_COMPONENTS = {
  areaselect: AreaSelect,
  plan: PlanSelector,
  select: AppSelect,
  radio: RadioGroup,
  text: BaseTextInput,
  textSpeech: InputWithSpeech,
  textareaSpeech: TextAreaSpeech,
} as const;

type Blueprint<P> = Omit<P, "control" | "errors">;

export type TFieldConfig<T extends FieldValues> =
  | ({ type: "text" } & BaseTextInputProps<T>)
  | ({ type: "select" } & BaseSelectInputProps<T, any>)
  | ({ type: "radio" } & BaseRadioInputProps<T>)
  | ({ type: "plan" } & PlanSelectorProps<T>);

export type FieldBlueprint<T extends FieldValues> =
  | ({ type: "text" } & Blueprint<BaseTextInputProps<T>>)
  | ({ type: "select" } & Blueprint<BaseSelectInputProps<T>>)
  | ({ type: "radio" } & Blueprint<BaseRadioInputProps<T>>)
  | ({ type: "plan" } & Blueprint<PlanSelectorProps<T>>);

type FieldConfig<T extends Record<string, any>> = {
  type: keyof typeof FIELD_COMPONENTS;
  name: Path<T>;
  label?: string;
  plans?: any[];
  props?: any;
  options?: any[];
  adapter?: any;
  renderOption?: (option: GlobalSelectOption, selected?: boolean) => ReactNode;
} & TextInputProps;

export const FLOW_CONFIGS: Record<string, StepKey[]> = {
  used_cars: [
    "media",
    "video",
    "basic_info",
    "choose_plan",
    "detailed_info",
    "detailed_info_2",
  ],
  commun: ["detailed_info", "media", "video", "detailed_info_2", "choose_plan"],
} as const;

export type StepFieldRegistry<T extends FieldValues> = Record<
  StepKey,
  Record<string, FieldBlueprint<T>>
>;

export const STEP_FIELD_REGISTRY: StepFieldRegistry<AdvertisementInterface> = {
  basic_info: {
    year: {
      type: "select",
      name: "year",
      label: "year",
      options: YEARS,
      adapter: SelectAdapters.fromPrimitive,
    },
    exterior_color: {
      type: "select",
      name: "exterior_color",
      label: "color",
      options: CAR_COLORS,
      adapter: SelectAdapters.fromPrimitive,
    },
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
    mileage: {
      name: "mileage",
      type: "text",
      label: "Mileage",
      keyboardType: "numeric",
    },
    fuel_type: {
      name: "fuel_type",
      type: "radio",
      label: "Fuel",
      options: [
        { id: "Petrol", label: "createAd.Petrol", value: "Petrol" },
        { id: "Diesel", label: "createAd.Diesel", value: "Diesel" },
        { id: "Electric", label: "createAd.Electric", value: "Electric" },
        { id: "Hybrid", label: "createAd.Hybrid", value: "Hybrid" },
      ],
    },
  },
  choose_plan: {},
  detailed_info: {},
  detailed_info_2: {},
  media: {},
  video: {},
};

export const STEP_FIELDS: Record<StepKey, FieldConfig<any>[]> = {
  basic_info: [
    {
      name: "year",
      renderOption,
      label: "Year",
      type: "select",
      options: YEARS,
      placeholder: "Year",
      adapter: SelectAdapters.fromPrimitive,
    },
    {
      type: "select",
      label: "Color",
      options: CAR_COLORS,
      placeholder: "Color",
      name: "exterior_color",
      adapter: SelectAdapters.fromPrimitive,
    },
    {
      name: "province",
      type: "select",
      label: "Province",
      placeholder: "Province",
      options: PROVINCES,
      renderOption,
      adapter: SelectAdapters.fromObject("province"),
    },
    {
      name: "area",
      type: "areaselect",
      placeholder: "Area",
      label: "Area",
      renderOption,
      adapter: SelectAdapters.fromObject("area"),
    },
    {
      name: "mileage",
      type: "text",
      label: "Mileage",
      keyboardType: "numeric",
    },
    {
      name: "fuel_type",
      type: "radio",
      label: "Fuel",
      options: [
        { id: "Petrol", label: "createAd.Petrol", value: "Petrol" },
        { id: "Diesel", label: "createAd.Diesel", value: "Diesel" },
        { id: "Electric", label: "createAd.Electric", value: "Electric" },
        { id: "Hybrid", label: "createAd.Hybrid", value: "Hybrid" },
      ],
    },
  ],
  detailed_info: [
    { name: "price", type: "text", label: "Price", keyboardType: "numeric" },
    { name: "title", type: "text", label: "Ad Title" },
  ],
  choose_plan: [{ name: "plan", type: "plan", plans: SUBSCRIPTION_PLANS }],
  detailed_info_2: [],
  media: [{ name: "thumbnail", type: "text" }],
  video: [{ name: "video", type: "text" }],
};

export interface BaseStepViewProps<T extends FieldValues> {
  control: Control<T>;
  fields: {
    [K in keyof T]?: FieldBlueprint<T>;
  };
}

export const STEP_VIEWS: Record<StepKey, React.FC<any>> = {
  basic_info: BasicInfo,
  detailed_info: MediaUploader,
  choose_plan: MediaUploader,
  detailed_info_2: MediaUploader,
  media: MediaUploader,
  video: MediaUploader,
};
