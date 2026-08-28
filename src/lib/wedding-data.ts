export const WEDDING = {
  groom: "يزيد",
  bride: "آلاء",
  combined: "يزيد & آلاء",
  combinedArabic: "يزيد و آلاء",
  subtitle: "ليلة العمر",
  weddingTitle: "حفل زفاف يزيد و آلاء",
  // September 8, 2026 (Tuesday) - 9:00 PM Cairo time (Egypt observes DST UTC+3 in September)
  targetISO: "2026-09-08T21:00:00+03:00",
  dateMain: "8 سبتمبر 2026",
  dateFull: "الثلاثاء، 8 سبتمبر 2026",
  dayName: "الثلاثاء",
  timeArabic: "9:00 مساءً",
  englishLabel: "YAZID & ALAA",
  englishDate: "SEPTEMBER 8, 2026",
} as const;

export type WeddingPhoto = {
  src: string;
  alt: string;
  caption: string;
  orientation: "portrait" | "landscape";
};

/** All uploaded couple photos — every one is used across the experience. */
export const PHOTOS: WeddingPhoto[] = [
  {
    src: "/images/wedding/photo-01.jpeg",
    alt: "ذكرى جميلة من حكاية يزيد وآلاء",
    caption: "من ألبوم ذكرياتنا",
    orientation: "portrait",
  },
  {
    src: "/images/wedding/photo-02.jpeg",
    alt: "لحظة خاصة من ليلة يزيد وآلاء",
    caption: "لحظة لا تُنسى",
    orientation: "landscape",
  },
  {
    src: "/images/wedding/photo-03.jpeg",
    alt: "صورة من ذكريات يزيد وآلاء",
    caption: "ذكريات العمر",
    orientation: "portrait",
  },
  {
    src: "/images/wedding/photo-04.jpeg",
    alt: "لحظة فرح من حكايتنا",
    caption: "فرحة تجمعنا",
    orientation: "portrait",
  },
  {
    src: "/images/wedding/photo-05.jpeg",
    alt: "صورة تذكارية من حكاية الحب",
    caption: "حكاية حب",
    orientation: "portrait",
  },
  {
    src: "/images/wedding/photo-06.jpeg",
    alt: "لقطة من أجمل اللحظات",
    caption: "أجمل اللحظات",
    orientation: "portrait",
  },
  {
    src: "/images/wedding/photo-07.jpeg",
    alt: "صورة من ليالي يزيد وآلاء",
    caption: "ليالٍ لا تُنسى",
    orientation: "portrait",
  },
];

export const NAV_ITEMS = [
  { id: "home", label: "الرئيسية" },
  { id: "countdown", label: "العد التنازلي" },
  { id: "gallery", label: "الألبوم" },
  { id: "venue", label: "الموعد والمكان" },
] as const;

export const COUNTDOWN_LABELS = {
  days: "أيام",
  hours: "ساعات",
  minutes: "دقائق",
  seconds: "ثواني",
  daySingular: "يوم",
  hourSingular: "ساعة",
  minuteSingular: "دقيقة",
  secondSingular: "ثانية",
} as const;

export const BOOK_PAGES = PHOTOS.map((p, i) => ({
  ...p,
  pageNum: i + 1,
}));

export const TOTAL_BOOK_PAGES = BOOK_PAGES.length;

export const PRIVACY_NOTICE =
  "يُمنع التصوير في قاعة السيدات منعاً للإحراج.";

export type Venue = {
  name: string;
  label: string;
  address: string;
  mapUrl: string;
  lat: number;
  lng: number;
};

/** Halls — Aswan, Kornish Al Nile (Abu Al Rish Qebli) */
export const MALE_VENUE: Venue = {
  name: "قاعة لامور",
  label: "قاعة الرجال",
  address: "كورنيش النيل، أبو الريش قبلي، أسوان",
  mapUrl: "https://maps.app.goo.gl/daUeojsXhDGr8eBr5",
  lat: 24.113625,
  lng: 32.899128,
};

export const FEMALE_VENUE: Venue = {
  name: "قاعة الفيروز",
  label: "قاعة السيدات",
  address: "كورنيش النيل، أبو الريش قبلي، أسوان",
  mapUrl: "https://maps.app.goo.gl/hd4Pd7qL9WMdYoHg7",
  lat: 24.11405,
  lng: 32.899003,
};

export function venueEmbedUrl(v: Venue, zoom = 16) {
  return `https://www.google.com/maps?q=${v.lat},${v.lng}&z=${zoom}&hl=ar&output=embed`;
}

export const HERO_EYEBROW = "بسم الله نبدأ أجمل حكاية";
export const HERO_SECONDARY_TITLE = "حكاية حب تستحق أن تُروى";
export const HERO_CTA = "ابدأ الحكاية";
export const SCROLL_TEXT = "اسحب للأسفل";
export const SCROLL_SUBTEXT = "لتعيش تفاصيل ليلتنا";
