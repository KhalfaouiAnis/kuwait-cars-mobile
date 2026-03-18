import { Dimensions } from "react-native";
import { GlobalSelectOption, Language, ProvinceOption } from "../types";
import { generateYears } from "../utils/date";

export const DIMENSIONS = Dimensions.get("window");

export const PLATE_RECOGNIZER_API_URL =
  "https://api.platerecognizer.com/v1/plate-reader/";
export const ADS_PAGE_SIZE = 4;
export const MAX_DRAFTS_COUNT =
  Number(process.env.EXPO_PUBLIC_MAX_DRAFTS_COUNT) || 3;

export const APP_STORAGE_KEY = "KC_APP_STORAGE_KEY";
export const AUTH_STORAGE_KEY = "KC_AUTH_STORAGE";
export const USER_PREFERENCES_STORAGE_KEY = "KC_USER_PREFERENCES_STORAGE";
export const ACC_TOKEN_STORAGE_KEY = "KC_ACC_TOKEN";
export const REFRESH_TOKEN_STORAGE_KEY = "KC_REFRESH_TOKEN";
export const NOTIFICATION_STORAGE = "KC_NOTIFICATION_STORAGE";

export const MAX_VIDEO_SIZE = 1024 * 1024 * 100;
export const MAX_IMAGE_SIZE = 1024 * 1024 * 5;

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "ar", name: "العربية", flag: "🇰🇼" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Española", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ur", name: "أردو", flag: "JO" },
  { code: "hi", name: "भारतीय", flag: "🇮🇳" },
];

export const RTL_LANGUAGES = ["ar", "ur"];

export const COUNTRIES = [
  { name: "Kuwait", cca2: "KW", callingCode: ["965"], flag: "🇰🇼" },
];

export const HIDE_TABBAR_ROUTES: string[] = ["/create", "/search"];
export const APP_SCHEMA = "x-car//create";

export const OVERALL_MIN_PRICE = 0;
export const OVERALL_MAX_PRICE = 99000;

export const OVERALL_MIN_MILEAGE = 0;
export const OVERALL_MAX_MILEAGE = 99000;

export const CAR_COLORS: GlobalSelectOption[] = [
  { id: "None", label: "None", value: "None" },
  { id: "White", label: "White", value: "White" },
  { id: "Black", label: "Black", value: "Black" },
  { id: "Silver", label: "Silver", value: "Silver" },
  { id: "Gray", label: "Gray", value: "Gray" },
  { id: "Red", label: "Red", value: "Red" },
  { id: "Blue", label: "Blue", value: "Blue" },
  { id: "Green", label: "Green", value: "Green" },
  { id: "Brown", label: "Brown", value: "Brown" },
  { id: "Beige", label: "Beige", value: "Beige" },
  { id: "Yellow", label: "Yellow", value: "Yellow" },
  { id: "Orange", label: "Orange", value: "Orange" },
  { id: "Gold", label: "Gold", value: "Gold" },
  { id: "Purple", label: "Purple", value: "Purple" },
  {
    id: "Light Blue / Cyan",
    label: "Light Blue / Cyan",
    value: "Light Blue / Cyan",
  },
  { id: "Navy Blue", label: "Navy Blue", value: "Navy Blue" },
  { id: "Burgundy", label: "Burgundy", value: "Burgundy" },
  { id: "Olive", label: "Olive", value: "Olive" },
  { id: "Copper", label: "Copper", value: "Copper" },
  { id: "Bronze", label: "Bronze", value: "Bronze" },
  { id: "Other", label: "Other", value: "Other" },
];

export const YEARS: GlobalSelectOption[] = generateYears().map((year) => ({
  id: year.toString(),
  label: year.toString(),
  value: year.toString(),
}));

export const PROVINCES: ProvinceOption[] = [
  {
    province: "Al Asimah",
    latitude: 29.34142578906314,
    longitude: 47.97161303044713,
    areas: [
      {
        area: "Bened Al-Qar",
        latitude: 29.37314390094317,
        longitude: 48.002581018296624,
      },
      {
        area: "Qibla",
        latitude: 29.372845174073927,
        longitude: 47.96666013417228,
      },
      {
        area: "Grenade",
        latitude: 29.31209569687981,
        longitude: 47.875741082223165,
      },
      {
        area: "Al-Doha",
        latitude: 29.372845174073927,
        longitude: 47.96666013417228,
      },
      {
        area: "Al-Daya",
        latitude: 29.31209569687981,
        longitude: 47.875741082223165,
      },
      {
        area: "Al-Shamiya",
        latitude: 29.352931948658696,
        longitude: 47.965249966186526,
      },
      {
        area: "Al-Qayrawan",
        latitude: 29.30061671749151,
        longitude: 47.800558173756606,
      },
      {
        area: "Al-Rawda",
        latitude: 29.33079709174865,
        longitude: 48.00266351259664,
      },
      {
        area: "Khalidiya",
        latitude: 29.324990156394534,
        longitude: 47.96408405314831,
      },
      {
        area: "Qortuba",
        latitude: 29.311510928401876,
        longitude: 47.9862368457215,
      },
      {
        area: "Al-Yarmouk",
        latitude: 29.331485163385807,
        longitude: 48.01490770351097,
      },
      {
        area: "Failaka",
        latitude: 29.442767251903263,
        longitude: 48.297429480880325,
      },
      {
        area: "Al-Sharq",
        latitude: 29.379018471051484,
        longitude: 47.98276114845392,
      },
      {
        area: "Al-Fayha",
        latitude: 29.33777838288952,
        longitude: 47.98049322193488,
      },
      {
        area: "Al-Sura",
        latitude: 29.312750726436594,
        longitude: 48.00712537420436,
      },
      {
        area: "Al-Nuzha",
        latitude: 29.343135555719375,
        longitude: 47.991085316137294,
      },
      {
        area: " Al-Qadisiya",
        latitude: 29.346846406264568,
        longitude: 48.00177039735997,
      },
      {
        area: "Al-Mansouria",
        latitude: 29.357377434216694,
        longitude: 47.993482428590376,
      },
      {
        area: "Al-Dasma",
        latitude: 29.36626693453409,
        longitude: 48.000509024090924,
      },
      {
        area: "Mirqab",
        latitude: 29.36748369900745,
        longitude: 47.98258955928433,
      },
      {
        area: "Al-Shuwaikh B",
        latitude: 29.317454150964995,
        longitude: 47.92729242147145,
      },
      {
        area: "Abdullah Al-Salem",
        latitude: 29.353887198770323,
        longitude: 47.979738314847886,
      },
      {
        area: "Al-Shuwaikh Industrial",
        latitude: 29.326957178665406,
        longitude: 47.932542036195194,
      },
      {
        area: "Al-Adiliya",
        latitude: 29.327741518222616,
        longitude: 47.98536614485193,
      },
      {
        area: "Kaifan",
        latitude: 29.338490139118164,
        longitude: 47.96225385842288,
      },
      {
        area: "Al-Sulaibikhat",
        latitude: 29.328357003584664,
        longitude: 47.80970549841883,
      },
      {
        area: "Al-Nahda",
        latitude: 29.310164006468508,
        longitude: 47.86390032519825,
      },
    ],
  },
  {
    province: "Hawalli",
    latitude: 29.337562213611356,
    longitude: 48.02463827322325,
    areas: [
      {
        area: "Al-Sadiq",
        latitude: 29.293894038974354,
        longitude: 47.99549472289084,
      },
      {
        area: "Al-Salmiya",
        latitude: 29.32620630491341,
        longitude: 48.0604904317031,
      },
      {
        area: "Al-Shuhada",
        latitude: 29.268787369533378,
        longitude: 48.03078215565221,
      },
      {
        area: "Hateen",
        latitude: 29.282078376071976,
        longitude: 48.02259241171464,
      },
      {
        area: "Salwa",
        latitude: 29.29310335706486,
        longitude: 48.07896565485935,
      },
      {
        area: "Al-Shaab Al-Bahri",
        latitude: 29.351757928186267,
        longitude: 48.028435879524714,
      },
      {
        area: "Al-Salam",
        latitude: 29.300675976149158,
        longitude: 48.02207505175633,
      },
      {
        area: "Al-Bidea",
        latitude: 29.314070446702335,
        longitude: 48.08832558543312,
      },
      {
        area: "Musharraf",
        latitude: 29.375971167152628,
        longitude: 47.9773944665682,
      },
      {
        area: "Mubarak Al-Abdullah",
        latitude: 29.273872144603057,
        longitude: 48.0464096348722,
      },
      {
        area: "Al-Jabriya",
        latitude: 29.318974496810092,
        longitude: 48.02831885448359,
      },
      {
        area: "Al-Zahra",
        latitude: 29.271614818554966,
        longitude: 48.00020551105524,
      },
      {
        area: "Al-Rumaithiya",
        latitude: 29.321549452112514,
        longitude: 48.07472628190947,
      },
      {
        area: "Al-Shaab",
        latitude: 29.350816514693644,
        longitude: 48.028067076447485,
      },
    ],
  },
  {
    province: "Al Ahmadi",
    latitude: 29.08681167762133,
    longitude: 48.07514879647327,
    areas: [
      {
        area: "Wara",
        latitude: 29.375188413838185,
        longitude: 47.98849071259844,
      },
      {
        area: "Sud de Sabah",
        latitude: 29.111590057907645,
        longitude: 48.10650534014105,
      },
      {
        area: "Al-Fintas",
        latitude: 29.168494273281468,
        longitude: 48.10882308500766,
      },
      {
        area: "Abou Halifa",
        latitude: 29.128276415669486,
        longitude: 48.12577323874874,
      },
      {
        area: "Sabah Al-Ahmad Al-Bahriya",
        latitude: 28.788749352059167,
        longitude: 48.06378099760425,
      },
      {
        area: "Hadiya",
        latitude: 29.15012685706825,
        longitude: 48.08633044286658,
      },
      {
        area: "Al-Ahmadi",
        latitude: 29.08621162726297,
        longitude: 48.07583544196893,
      },
      {
        area: "Al-Mahboula",
        latitude: 29.149160568181877,
        longitude: 48.119526206413006,
      },
      {
        area: "Al-Sabahiya",
        latitude: 29.106872940847,
        longitude: 48.106492041423536,
      },
      {
        area: "Jaber Al-Ali",
        latitude: 29.170307842724714,
        longitude: 48.079592744017766,
      },
      {
        area: "Al-Kheiran",
        latitude: 28.668226720422002,
        longitude: 48.36603765282448,
      },
      {
        area: "Al-Dhahr",
        latitude: 29.24529781309768,
        longitude: 48.01407447165153,
      },
      {
        area: "Al-Raqqa",
        latitude: 29.14523905713268,
        longitude: 48.10539694869624,
      },
      {
        area: "Al-Fahaheel Al-Sina'iya",
        latitude: 29.082141149314285,
        longitude: 48.13353453158262,
      },
      {
        area: "Al-Maqou",
        latitude: 29.382889860507596,
        longitude: 47.99353810371792,
      },
      {
        area: "Sabah Al-Ahmad",
        latitude: 28.78859890770638,
        longitude: 48.0703041298129,
      },
      {
        area: "Al-Mangaf",
        latitude: 29.108156717091298,
        longitude: 48.124346076686095,
      },
      {
        area: "Al-Aqila",
        latitude: 29.18078058150702,
        longitude: 48.09992154496431,
      },
      {
        area: "Al-Wafrah",
        latitude: 28.57169258976143,
        longitude: 48.06422599579564,
      },
      {
        area: "Ali Sabah Al-Salem",
        latitude: 28.95679327913784,
        longitude: 48.155302144778005,
      },
      {
        area: "Al-Fahaheel",
        latitude: 29.081697217963455,
        longitude: 48.12641058456187,
      },
    ],
  },
  {
    province: "Farwaniyah",
    latitude: 29.19528929129091,
    longitude: 47.904396497421416,
    areas: [
      {
        area: "Khaitan",
        latitude: 29.28386739487264,
        longitude: 47.97640593423946,
      },
      {
        area: "Al-Omariya",
        latitude: 29.296681514885332,
        longitude: 47.94749077026699,
      },
      {
        area: "Sabah Al-Nasser ",
        latitude: 29.271370378454236,
        longitude: 47.88414555222465,
      },
      {
        area: "Abdullah Al-Mubarak",
        latitude: 29.24248165857817,
        longitude: 47.90451017168917,
      },
      {
        area: "Khaitan Al-Janoubi",
        latitude: 29.269417982522953,
        longitude: 47.97915251622205,
      },
      {
        area: "Al-Shaddadiya ",
        latitude: 29.259409229975645,
        longitude: 47.897449856692376,
      },
      {
        area: "Ashbilia",
        latitude: 29.27492365965774,
        longitude: 47.941940650440856,
      },
      {
        area: "Al-Firdous",
        latitude: 29.28231643365851,
        longitude: 47.87696629169809,
      },
      {
        area: "Jleeb Al-Shuyoukh",
        latitude: 29.25599453216639,
        longitude: 47.93452145346877,
      },
      {
        area: "Al-Andalus ",
        latitude: 29.303219666018954,
        longitude: 47.881253865816284,
      },
      {
        area: "Al-Rahab",
        latitude: 29.284127270834684,
        longitude: 47.932579965440326,
      },
      {
        area: "Al-Raqai ",
        latitude: 29.306186957544803,
        longitude: 47.915868850235526,
      },
      {
        area: "Al-Rai",
        latitude: 29.30816677319911,
        longitude: 47.94477201605714,
      },
      {
        area: "Kabad",
        latitude: 29.09530153772276,
        longitude: 47.71947101793365,
      },
      {
        area: "Al-Ardiya",
        latitude: 29.290191455858547,
        longitude: 47.90872652995817,
      },
    ],
  },
  {
    province: "Al Jahra",
    latitude: 29.33830455189348,
    longitude: 47.67475489016851,
    areas: [
      {
        area: "Am Al-Aish",
        latitude: 29.77588413613554,
        longitude: 47.69593967418677,
      },
      {
        area: "Al-Matal 6",
        latitude: 29.46238508292173,
        longitude: 47.565362364848596,
      },
      {
        area: "Al-Matal 7",
        latitude: 29.46372072287835,
        longitude: 47.59068236650501,
      },
      {
        area: "Al-Matal 5",
        latitude: 29.463938573617078,
        longitude: 47.59076816319495,
      },
      {
        area: "Al-Matal 4",
        latitude: 29.464509467972103,
        longitude: 47.589819634631354,
      },
      {
        area: "Al-Jahra",
        latitude: 29.33950170016748,
        longitude: 47.67647150390763,
      },
      {
        area: "Al-Matal 3",
        latitude: 29.477610278852527,
        longitude: 47.67647150390763,
      },
      {
        area: "Saad Al-Abdullah",
        latitude: 29.311246989991332,
        longitude: 47.7157181385441,
      },
      {
        area: "Al-Matal 2",
        latitude: 29.464408035701595,
        longitude: 47.56509985275697,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 6",
        latitude: 29.30573583897411,
        longitude: 47.68915256173777,
      },
      {
        area: "Tima",
        latitude: 29.329244582972414,
        longitude: 47.68103635116708,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 7",
        latitude: 29.30505824156169,
        longitude: 47.698414755880066,
      },
      {
        area: "Al-Qasr",
        latitude: 30.039671326084573,
        longitude: 47.92349571882797,
      },
      {
        area: "Al-Rawdatain",
        latitude: 29.3436528642626,
        longitude: 47.96003202423841,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 5",
        latitude: 29.310898386259915,
        longitude: 47.696013799345465,
      },
      {
        area: "Al-Abdali",
        latitude: 29.98146381837502,
        longitude: 47.71968688778171,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi Al-Tijari",
        latitude: 29.308246532540494,
        longitude: 47.70568501602509,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 4",
        latitude: 29.302744129532055,
        longitude: 47.71753816425007,
      },
      {
        area: "Al-Matal",
        latitude: 29.4661752958575,
        longitude: 47.59170902656082,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 1",
        latitude: 29.310127065534875,
        longitude: 47.71762240857108,
      },
      {
        area: "Al-Naim",
        latitude: 29.33367292593885,
        longitude: 47.69362583439695,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 3",
        latitude: 29.30358897016322,
        longitude: 47.70814494815189,
      },
      {
        area: "Al-Salmi",
        latitude: 29.100528383181366,
        longitude: 46.68143726196738,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 10",
        latitude: 29.31556291603643,
        longitude: 47.73240724633636,
      },
      {
        area: "Jaber Al-Ahmad",
        latitude: 29.345801410583547,
        longitude: 47.75776844407615,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 11",
        latitude: 29.32441391744194,
        longitude: 47.737209159405566,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 2",
        latitude: 29.3078595525975,
        longitude: 47.746717090336965,
      },
      {
        area: "Boubyan",
        latitude: 29.801751055886704,
        longitude: 48.18306733069847,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 9",
        latitude: 29.304227631015873,
        longitude: 47.72726046777998,
      },
      {
        area: "Al-Mutlaa 12",
        latitude: 29.478183970357502,
        longitude: 48.270827071391196,
      },
      {
        area: "Saad Al-Abdullah Al-Janoubi 8",
        latitude: 29.317068643474983,
        longitude: 47.72168527243462,
      },
      {
        area: "Al-Mutlaa 11",
        latitude: 29.444977081610805,
        longitude: 47.5814926601155,
      },
      {
        area: "Al-Ayoun",
        latitude: 29.330878218028648,
        longitude: 47.65755091665745,
      },
      {
        area: "Al-Mutlaa 10",
        latitude: 29.439124868110923,
        longitude: 47.55598829178642,
      },
      {
        area: "Al-Mutlaa 9",
        latitude: 29.456355523078493,
        longitude: 47.58486126176568,
      },
      {
        area: "Al-Mutlaa 8",
        latitude: 29.460289971739805,
        longitude: 47.57402034645479,
      },
      {
        area: "Al-Waha",
        latitude: 29.34492639906381,
        longitude: 47.65680138151352,
      },
    ],
  },
  {
    province: "Mubarek Al-kabeer",
    latitude: 29.188843552556285,
    longitude: 48.078176597276894,
    areas: [
      {
        area: "Abu Al-Hassania",
        latitude: 29.19180187360238,
        longitude: 48.10161859604945,
      },
      {
        area: "Gurain",
        latitude: 28.777954732686283,
        longitude: 47.98885591636288,
      },
      {
        area: "Sabhan",
        latitude: 29.236440637230523,
        longitude: 48.001945606623245,
      },
      {
        area: "Al-Fanaitis",
        latitude: 29.222643309470982,
        longitude: 48.06901828621611,
      },
      {
        area: "Al-Qusour",
        latitude: 29.21626035805052,
        longitude: 48.0705939565846,
      },
      {
        area: "Abouftira",
        latitude: 29.201079455611715,
        longitude: 48.10108798722281,
      },
      {
        area: "Al-Adan",
        latitude: 29.23063033254194,
        longitude: 48.065829066718855,
      },
      {
        area: "Al-Masayel",
        latitude: 29.241764424167975,
        longitude: 48.091161371335765,
      },
      {
        area: "Sabah Al-Salam A",
        latitude: 29.256885341182233,
        longitude: 48.064930440803245,
      },
    ],
  },
];

export const PURE_PROVINCES: Omit<ProvinceOption, "areas">[] = [
  {
    province: "Al Asimah",
    latitude: 29.34142578906314,
    longitude: 47.97161303044713,
  },
  {
    province: "Hawalli",
    latitude: 29.337562213611356,
    longitude: 48.02463827322325,
  },
  {
    province: "Al Ahmadi",
    latitude: 29.08681167762133,
    longitude: 48.07514879647327,
  },
  {
    province: "Farwaniyah",
    latitude: 29.19528929129091,
    longitude: 47.904396497421416,
  },
  {
    province: "Al Jahra",
    latitude: 29.33830455189348,
    longitude: 47.67475489016851,
  },
  {
    province: "Mubarek Al-kabeer",
    latitude: 29.188843552556285,
    longitude: 48.078176597276894,
  },
];

export const UNIT_OPTIONS = [
  { id: "KM", label: "KM", value: "KM" },
  { id: "ML", label: "ML", value: "ML" },
];

export const YES_NO_OPTIONS = [
  { id: "Yes", label: "yes", value: true },
  { id: "No", label: "no", value: false },
];

export const FUEL_TYPE_OPTIONS = [
  { id: "Petrol", label: "createAd.Petrol", value: "Petrol" },
  { id: "Diesel", label: "createAd.Diesel", value: "Diesel" },
  { id: "Electric", label: "createAd.Electric", value: "Electric" },
  { id: "Hybrid", label: "createAd.Hybrid", value: "Hybrid" },
];

export const TRANSMISSION_OPTIONS = [
  { id: "auto", label: "Auto", value: "Auto" },
  { id: "manual", label: "Manual", value: "Manual" },
];

export const ROOF_OPTIONS = [
  { id: "Sunroof", label: "createAd.Sunroof", value: "Sunroof" },
  { id: "Panoramic", label: "createAd.Panoramic", value: "Panoramic" },
  {
    id: "Convertible Roof",
    label: "createAd.ConvertibleRoof",
    value: "ConvertibleRoof",
  },
];

export const CAR_CYLENDERS = [
  { id: "2", label: "2", value: "2" },
  { id: "4", label: "4", value: "4" },
  { id: "5", label: "5", value: "5" },
  { id: "6", label: "6", value: "6" },
  { id: "8", label: "8", value: "8" },
  { id: "10", label: "10", value: "10" },
  { id: "12", label: "12", value: "12" },
];

export const MOTORCYCLE_CYCLENDERS = [
  { id: "1", label: "1", value: "1" },
  { id: "2", label: "2", value: "2" },
  { id: "3", label: "3", value: "3" },
  { id: "4", label: "4", value: "4" },
  { id: "6", label: "6", value: "6" },
];

export const ERROR_CODES = {
  BAD_CREDENTIALS: "BAD_CREDENTIALS",
  SOCIAL_ERROR: "SOCIAL_ERROR",
  REREQUEST_OTP: "REREQUEST_OTP",
  ID_TOKEN_REQUIRED: "ID_TOKEN_REQUIRED",
  INVALID_TOKEN: "INVALID_TOKEN",
};
