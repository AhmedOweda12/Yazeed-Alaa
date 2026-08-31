import type { Metadata, Viewport } from "next";
import { Cairo, Amiri, Tajawal, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { WEDDING } from "@/lib/wedding-data";
import { Analytics } from "@vercel/analytics/next";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "حفل زفاف يزيد و آلاء | 8 سبتمبر 2026",
  description:
    "دعوة رقمية فاخرة لحفل زفاف يزيد و آلاء يوم الثلاثاء 8 سبتمبر 2026 في تمام الساعة 9:00 مساءً. ننتظركم لنشاركم أجمل ليلة.",
  keywords: ["دعوة زفاف", "يزيد و آلاء", "حفل زفاف", "دعوة رقمية"],
  openGraph: {
    title: "حفل زفاف يزيد و آلاء | 8 سبتمبر 2026",
    description:
      "دعوة رقمية فاخرة لحفل زفاف يزيد و آلاء يوم الثلاثاء 8 سبتمبر 2026.",
    images: ["/images/wedding/photo-02.jpeg"],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حفل زفاف يزيد و آلاء | 8 سبتمبر 2026",
    description: "دعوة رقمية فاخرة لحفل زفاف يزيد و آلاء.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4A6C1",
  width: "device-width",
  initialScale: 1,
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "حفل زفاف يزيد و آلاء",
  startDate: "2026-09-08T21:00:00+03:00",
  endDate: "2026-09-09T02:00:00+03:00",
  eventStatus: "https://schema.org/EventScheduled",
  description: "ليلة العمر — حفل زفاف يزيد و آلاء",
  image: ["/images/wedding/photo-02.jpeg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${amiri.variable} ${tajawal.variable} ${cormorant.variable} antialiased bg-background text-foreground overflow-x-clip`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
