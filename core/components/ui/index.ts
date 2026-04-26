import {
  CAR_COLORS,
  CAR_CYLENDERS,
  FUEL_TYPE_OPTIONS,
  MOTORCYCLE_CYCLENDERS,
  PURE_PROVINCES,
  ROOF_OPTIONS,
  TRANSMISSION_OPTIONS,
  UNIT_OPTIONS,
  YEARS,
  YES_NO_OPTIONS,
} from "@/core/constants";
import { SUBSCRIPTION_PLANS } from "@/core/constants/ad";
import {
  GlobalSelectOption,
  SelectOption,
  SubscriptionDetail,
} from "@/core/types";
import { AD_MASTER_SCHEMA_KEY } from "@/core/types/schema/ads";
import { SelectAdapters } from "@/core/utils/select-adapters";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";
import BasicInfo from "../forms/ads/shared/steps/basic-info";
import DetailedInfo from "../forms/ads/shared/steps/detailed-info";
import DetailedInfo2 from "../forms/ads/shared/steps/detailed-info-2";
import AdMedia from "../forms/ads/shared/steps/media";
import PlanSelection from "../forms/ads/shared/steps/plan-selection";
import ShowVideo from "../forms/ads/shared/steps/showVideo";
import AdVideo from "../forms/ads/shared/steps/video";
import GalleryPicker from "../layout/media/gallery-picker";
import ShowVideoPicker from "../layout/media/show-video-picker";
import SoundEffectPicker from "../layout/media/soundEffectPicker";
import VideoPicker from "../layout/media/video-picker";
import AdContactOption from "./input/checkbox/ad-contact-option";
import LocationPicker from "./input/location/location-picker";
import RadioGroup from "./input/radio-group";
import AppSelect from "./input/select/app-select";
import AreaSelector from "./input/select/area-selector";
import ProvinceSelector from "./input/select/province-selector";
import BaseTextInput from "./input/text/base-text-input";
import InputWithSpeech from "./input/text/speech-input";
import TextAreaSpeech from "./input/text/text-area-speech";
import UnitSelector from "./menu/unit-selector";
import PlanSelector from "./plan/plan-selector";

const FIELDS_REGISTRY = {
  plan: {
    type: "plan",
    name: "plan",
    plans: SUBSCRIPTION_PLANS,
  },
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
    fullWidth: true,
    bordered: true,
    borderRadius: 30,
    options: YES_NO_OPTIONS,
    label: "createAd.Hidevehiclelicenseplate",
  },
  fuel_type: {
    name: "fuel_type",
    type: "radio",
    label: "createAd.fuelType",
    fullWidth: true,
    options: FUEL_TYPE_OPTIONS,
  },
  cylinders: {
    name: "cylinders",
    type: "radio",
    label: "createAd.Cylinders",
    square: true,
    borderRadius: 5,
    options: CAR_CYLENDERS,
  },
  transmission: {
    name: "transmission",
    type: "radio",
    label: "transmission",
    fullWidth: true,
    bordered: true,
    borderRadius: 30,
    options: TRANSMISSION_OPTIONS,
  },
  under_warranty: {
    name: "under_warranty",
    type: "radio",
    label: "createAd.underWarranty",
    fullWidth: true,
    bordered: true,
    borderRadius: 30,
    options: YES_NO_OPTIONS,
  },
  roof: {
    name: "roof",
    type: "radio",
    label: "createAd.roof",
    borderRadius: 20,
    options: ROOF_OPTIONS,
  },
  province: {
    required: true,
    name: "province",
    type: "provinceSelect",
    options: PURE_PROVINCES,
    placeholder: "yourProvince",
    adapter: SelectAdapters.fromObject("province"),
  },
  area: {
    name: "area",
    options: [] as any,
    type: "areaselect",
    placeholder: "area",
    adapter: SelectAdapters.fromObject("area"),
  },
  location: {
    name: " location",
    type: "location",
    label: "location",
  },
  price: {
    name: "price",
    type: "text",
    required: true,
    placeholder: "createAd.WriteYourPrice",
    label: "createAd.Price",
    keyboardType: "number-pad",
  },
  title: {
    name: "title",
    maxLength: 30,
    required: true,
    type: "textSpeech",
    label: "createAd.Title",
    placeholder: "createAd.WriteYourAdvertisementTitle",
  },
  description: {
    required: true,
    maxLength: 500,
    name: "description",
    label: "description",
    type: "textareaSpeech",
    placeholder: "createAd.WriteYourAdvertisementDescription",
  },
  additional_number: {
    type: "text",
    keyboardType: "numeric",
    name: "additional_number",
    placeholder: "createAd.AddAdditionalNumber",
  },
  second_additional_number: {
    type: "text",
    keyboardType: "numeric",
    name: "second_additional_number",
    placeholder: "createAd.AddAdditionalNumber",
  },
  contact_whatsapp: {
    type: "contact",
    name: "contact_whatsapp",
    label: "createAd.ContactViaWhatsApp",
  },
  receive_calls: {
    type: "contact",
    name: "receive_calls",
    label: "createAd.ReceiveCalls",
  },
  xcar_calls: {
    type: "contact",
    name: "xcar_calls",
    label: "createAd.ReceiveCallViaXCar",
  },
  xcar_chat: {
    type: "contact",
    name: "xcar_chat",
    label: "createAd.ChatViaXcar",
  },
  media: {
    name: "media",
    type: "media",
    maxImages: 6,
  },
  video: {
    name: "video",
    type: "video",
  },
  show_video: {
    name: "video",
    type: "showVideo",
  },
  sound_effect: {
    name: "sound_effect",
    type: "soundEffect",
  },
} as const;

export type AdStepKey =
  | "basic_info"
  | "media"
  | "video"
  | "show_video"
  | "detailed_info"
  | "detailed_info_2"
  | "choose_plan";

interface BaseInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  customIcon?: ReactNode;
  translatedLabel?: string;
  translatedPlaceholder?: string;
  omitValidationError?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  endIcon?: keyof typeof Ionicons.glyphMap;
}

export interface BaseTextInputProps<T extends FieldValues>
  extends TextInputProps, BaseInputProps<T> {
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

export interface VideoSelectorProps {
  name: string;
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
  radio: RadioGroup,
  select: AppSelect,
  provinceSelect: ProvinceSelector,
  areaselect: AreaSelector,
  video: VideoPicker,
  showVideo: ShowVideoPicker,
  soundEffect: SoundEffectPicker,
  plan: PlanSelector,
  text: BaseTextInput,
  location: LocationPicker,
  media: GalleryPicker,
  contact: AdContactOption,
  unitSelector: UnitSelector,
  textSpeech: InputWithSpeech,
  textareaSpeech: TextAreaSpeech,
} as const;

type Blueprint<P> = Omit<P, "control">;

export type TFieldConfig<T extends FieldValues> =
  | ({ type: "media" } & MediaSelectorProps)
  | ({ type: "video" | "showVideo" | "soundEffect" } & VideoSelectorProps)
  | ({ type: "plan" } & PlanSelectorProps<T>)
  | ({ type: "radio" } & BaseRadioInputProps<T>)
  | ({ type: "select" } & BaseSelectInputProps<T, any>)
  | ({ type: "provinceSelect" | "areaselect" } & BaseSelectInputProps<T, any>)
  | ({ type: "unitSelector" } & BaseUnitSelectorInputProps<T>)
  | ({
      type: "text" | "textSpeech" | "textareaSpeech" | "contact" | "location";
    } & BaseTextInputProps<T>);

export type FieldBlueprint<T extends FieldValues> =
  | ({
      type: "text" | "textSpeech" | "textareaSpeech" | "contact" | "location";
    } & Blueprint<BaseTextInputProps<T>>)
  | ({ type: "select" } & Blueprint<BaseSelectInputProps<T>>)
  | ({ type: "provinceSelect" | "areaselect" } & Blueprint<
      BaseSelectInputProps<T>
    >)
  | ({ type: "radio" } & Blueprint<BaseRadioInputProps<T>>)
  | ({ type: "plan" } & Blueprint<PlanSelectorProps<T>>)
  | ({ type: "media" } & Blueprint<MediaSelectorProps>)
  | ({ type: "video" | "showVideo" | "soundEffect" } & VideoSelectorProps)
  | ({ type: "unitSelector" } & Blueprint<BaseUnitSelectorInputProps<T>>);

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
  show: [
    "choose_plan",
    "detailed_info",
    "media",
    "show_video",
    "detailed_info_2",
  ],
  common: ["choose_plan", "detailed_info", "media", "video", "detailed_info_2"],
} as const;

export type StepFieldRegistry<T extends FieldValues> = Record<
  AdStepKey,
  Record<string, FieldBlueprint<T>>
>;

export type StepFieldConfiguration<T extends FieldValues> = Record<
  AD_MASTER_SCHEMA_KEY,
  Partial<Record<AdStepKey, Record<string, FieldBlueprint<T>>>>
>;

export const STEP_FIELD_CONFIGURATION: StepFieldConfiguration<any> = {
  common: {
    choose_plan: {
      plan: FIELDS_REGISTRY.plan,
    },
    detailed_info: {
      province: FIELDS_REGISTRY.province,
      area: FIELDS_REGISTRY.area,
      location: FIELDS_REGISTRY.location,
      hide_license_plate: FIELDS_REGISTRY.hide_license_plate,
      price: FIELDS_REGISTRY.price,
      title: FIELDS_REGISTRY.title,
      description: FIELDS_REGISTRY.description,
    },
    media: {
      media: FIELDS_REGISTRY.media,
    },
    video: {
      video: FIELDS_REGISTRY.video,
    },
    detailed_info_2: {
      additional_number: FIELDS_REGISTRY.additional_number,
      second_additional_number: FIELDS_REGISTRY.second_additional_number,
      contact_whatsapp: FIELDS_REGISTRY.contact_whatsapp,
      receive_calls: FIELDS_REGISTRY.receive_calls,
      xcar_calls: FIELDS_REGISTRY.xcar_calls,
      xcar_chat: FIELDS_REGISTRY.xcar_chat,
    },
  },
  motorcycles: {
    choose_plan: {
      plan: FIELDS_REGISTRY.plan,
    },
    basic_info: {
      year: FIELDS_REGISTRY.year,
      exterior_color: FIELDS_REGISTRY.exterior_color,
      mileage: FIELDS_REGISTRY.mileage,
      mileage_unit: FIELDS_REGISTRY.mileage_unit,
      hide_license_plate: FIELDS_REGISTRY.hide_license_plate,
      fuel_type: FIELDS_REGISTRY.fuel_type,
      cylinders: {
        ...FIELDS_REGISTRY.cylinders,
        options: MOTORCYCLE_CYCLENDERS,
      },
      transmission: FIELDS_REGISTRY.transmission,
      under_warranty: FIELDS_REGISTRY.under_warranty,
    },
    detailed_info: {
      province: FIELDS_REGISTRY.province,
      area: FIELDS_REGISTRY.area,
      location: FIELDS_REGISTRY.location,
      price: FIELDS_REGISTRY.price,
      title: FIELDS_REGISTRY.title,
      description: FIELDS_REGISTRY.description,
    },
    detailed_info_2: {
      additional_number: FIELDS_REGISTRY.additional_number,
      second_additional_number: FIELDS_REGISTRY.second_additional_number,
      contact_whatsapp: FIELDS_REGISTRY.contact_whatsapp,
      receive_calls: FIELDS_REGISTRY.receive_calls,
      xcar_calls: FIELDS_REGISTRY.xcar_calls,
      xcar_chat: FIELDS_REGISTRY.xcar_chat,
    },
    media: {
      media: FIELDS_REGISTRY.media,
    },
    video: {
      video: FIELDS_REGISTRY.video,
    },
  },
  part_accessories: {
    choose_plan: {
      plan: FIELDS_REGISTRY.plan,
    },
    detailed_info: {
      province: FIELDS_REGISTRY.province,
      area: FIELDS_REGISTRY.area,
      location: FIELDS_REGISTRY.location,
      hide_license_plate: FIELDS_REGISTRY.hide_license_plate,
      price: FIELDS_REGISTRY.price,
      title: FIELDS_REGISTRY.title,
      description: FIELDS_REGISTRY.description,
    },
    media: {
      media: FIELDS_REGISTRY.media,
    },
    video: {
      video: FIELDS_REGISTRY.video,
    },
    detailed_info_2: {
      additional_number: FIELDS_REGISTRY.additional_number,
      second_additional_number: FIELDS_REGISTRY.second_additional_number,
      contact_whatsapp: FIELDS_REGISTRY.contact_whatsapp,
      receive_calls: FIELDS_REGISTRY.receive_calls,
      xcar_calls: FIELDS_REGISTRY.xcar_calls,
      xcar_chat: FIELDS_REGISTRY.xcar_chat,
    },
  },
  show: {
    choose_plan: {
      plan: FIELDS_REGISTRY.plan,
    },
    detailed_info: {
      hide_license_plate: FIELDS_REGISTRY.hide_license_plate,
      title: FIELDS_REGISTRY.title,
      description: FIELDS_REGISTRY.description,
    },
    media: {
      media: FIELDS_REGISTRY.media,
    },
    show_video: {
      video: FIELDS_REGISTRY.show_video,
      sound_effect: FIELDS_REGISTRY.sound_effect,
    },
    detailed_info_2: {
      xcar_calls: FIELDS_REGISTRY.xcar_calls,
      xcar_chat: FIELDS_REGISTRY.xcar_chat,
    },
  },
  used_cars: {
    choose_plan: {
      plan: FIELDS_REGISTRY.plan,
    },
    basic_info: {
      year: FIELDS_REGISTRY.year,
      exterior_color: FIELDS_REGISTRY.exterior_color,
      mileage: FIELDS_REGISTRY.mileage,
      mileage_unit: FIELDS_REGISTRY.mileage_unit,
      hide_license_plate: FIELDS_REGISTRY.hide_license_plate,
      fuel_type: FIELDS_REGISTRY.fuel_type,
      cylinders: FIELDS_REGISTRY.cylinders,
      transmission: FIELDS_REGISTRY.transmission,
      under_warranty: FIELDS_REGISTRY.under_warranty,
      roof: FIELDS_REGISTRY.roof,
    },
    detailed_info: {
      province: FIELDS_REGISTRY.province,
      area: FIELDS_REGISTRY.area,
      location: FIELDS_REGISTRY.location,
      price: FIELDS_REGISTRY.price,
      title: FIELDS_REGISTRY.title,
      description: FIELDS_REGISTRY.description,
    },
    detailed_info_2: {
      additional_number: FIELDS_REGISTRY.additional_number,
      second_additional_number: FIELDS_REGISTRY.second_additional_number,
      contact_whatsapp: FIELDS_REGISTRY.contact_whatsapp,
      receive_calls: FIELDS_REGISTRY.receive_calls,
      xcar_calls: FIELDS_REGISTRY.xcar_calls,
      xcar_chat: FIELDS_REGISTRY.xcar_chat,
    },
    media: {
      media: FIELDS_REGISTRY.media,
    },
    video: {
      video: FIELDS_REGISTRY.video,
    },
  },
};

export interface BaseStepViewProps<T extends FieldValues> {
  fields: Record<Partial<keyof T>, FieldBlueprint<T>>;
}

export const STEP_VIEWS: Record<AdStepKey, React.FC<any>> = {
  choose_plan: PlanSelection,
  basic_info: BasicInfo,
  media: AdMedia,
  video: AdVideo,
  show_video: ShowVideo,
  detailed_info: DetailedInfo,
  detailed_info_2: DetailedInfo2,
};
