"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CameraOff,
  Clock3,
  MapPin,
  Navigation,
  Sparkles,
  Users,
} from "lucide-react";
import { Particles } from "./Particles";
import {
  FEMALE_VENUE,
  MALE_VENUE,
  PRIVACY_NOTICE,
  WEDDING,
  type Venue as VenueInfo,
} from "@/lib/wedding-data";

/** Elegant hall location card — opens Google Maps in a new tab. */
function HallLocationCard({
  venue,
  variant,
}: {
  venue: VenueInfo;
  variant: "male" | "female";
}) {
  const isMale = variant === "male";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-10 max-w-lg"
    >
      <div
        className="flex flex-col items-center gap-4 rounded-[1.8rem] px-7 py-7 text-center shadow-[0_22px_55px_-25px_rgba(59,31,42,0.45)] sm:flex-row sm:text-right"
        style={{
          background: "rgba(255,255,255,0.55)",
          border: `1px solid ${
            isMale ? "rgba(120,189,217,0.65)" : "rgba(216,139,168,0.6)"
          }`,
          backdropFilter: "blur(14px)",
        }}
      >
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border"
          style={{
            borderColor: isMale ? "rgba(120,189,217,0.7)" : "rgba(212,175,112,0.7)",
            background: "rgba(255,255,255,0.7)",
            color: isMale ? "#173746" : "#8B4962",
          }}
          aria-hidden="true"
        >
          <MapPin className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <div className="flex-1">
          <p
            className="font-tajawal text-xs font-bold tracking-wide"
            style={{ color: isMale ? "#78BDD9" : "#B3924F" }}
          >
            {isMale ? "مقر الحفل — للرجال" : "مقر الحفل — للسيدات"}
          </p>
          <h3
            className="mt-0.5 font-display text-2xl font-bold md:text-3xl"
            style={{ color: isMale ? "#173746" : "#3B1F2A" }}
          >
            {venue.name}
          </h3>
          <p
            className="mt-1 font-tajawal text-sm"
            style={{ color: isMale ? "#173746/80" : "#3B1F2A/80" }}
          >
            {venue.address}
          </p>
        </div>
        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="luxury-btn !px-6 !py-3 text-sm"
          style={{ color: isMale ? "#173746" : "#3B1F2A" }}
          aria-label={`فتح موقع ${venue.name} على خرائط جوجل`}
        >
          <Navigation className="h-4 w-4" aria-hidden="true" />
          عرض الموقع
        </a>
      </div>
    </motion.div>
  );
}

/**
 * Dual portals → Men's hall (sky blue) → Women's hall (pink)
 * The photography notice appears ONLY at the bottom of the women's hall.
 */
export function Halls() {
  const ease = [0.22, 1, 0.36, 1] as const;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ══════════ Dual portal ══════════ */}
      <section
        className="relative overflow-hidden py-24 md:py-28"
        style={{
          background: "linear-gradient(180deg, #FDF1F5 0%, #FFF8F3 100%)",
        }}
        aria-label="قاعتا الحفل"
      >
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="mb-12 text-center"
          >
            <p className="font-english text-[11px] tracking-[0.5em] text-[#B3924F]">
              THE CELEBRATION
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-[#3B1F2A] md:text-5xl">
              أهلاً بكم في ليلتنا
            </h2>
            <p className="mt-3 font-tajawal text-base text-[#6E4256] md:text-lg">
              ليلتان بقلبٍ واحد — اخترا قاعتكما وشاركانا الفرح.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* ── Men portal ── */}
            <motion.button
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease }}
              onClick={() => scrollTo("male-hall")}
              className="group relative overflow-hidden rounded-[2rem] border border-[#78BDD9]/45 p-8 text-right shadow-[0_28px_70px_-30px_rgba(23,55,70,0.45)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_90px_-30px_rgba(23,55,70,0.55)] focus-visible:outline-2 focus-visible:outline-[#78BDD9] md:p-10"
              style={{
                background:
                  "linear-gradient(155deg, #DDF5FC 0%, #A9DFF2 60%, #8FD3EA 100%)",
              }}
              aria-label="الانتقال إلى قاعة الرجال"
            >
              <div
                className="absolute inset-3 rounded-[1.6rem] border border-white/55"
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-start gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B3924F]/60 bg-white/55 text-[#173746] shadow-inner">
                  <Users className="h-6 w-6" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="font-display text-3xl font-bold text-[#173746] md:text-4xl">
                    قاعة الرجال
                  </h3>
                  <p className="mt-1 font-tajawal text-sm font-bold tracking-wide text-[#78BDD9]">
                    {MALE_VENUE.name} — أسوان
                  </p>
                  <p className="mt-2 max-w-xs font-tajawal text-[15px] leading-relaxed text-[#173746]/85 md:text-base">
                    أهلاً وسهلاً بكل أحبابنا — ننتظركم لنحتفل معاً ببداية أجمل حكاية.
                  </p>
                </div>
                <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#B3924F]/55 bg-white/45 px-5 py-2 font-tajawal text-sm font-bold text-[#173746] transition-colors duration-500 group-hover:bg-white/85">
                  ادخل القاعة
                  <span aria-hidden="true">←</span>
                </span>
              </div>
              <span
                className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full opacity-50 blur-2xl transition-opacity duration-700 group-hover:opacity-80"
                style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }}
                aria-hidden="true"
              />
            </motion.button>

            {/* ── Women portal ── */}
            <motion.button
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease }}
              onClick={() => scrollTo("female-hall")}
              className="group relative overflow-hidden rounded-[2rem] border border-[#D88BA8]/50 p-8 text-right shadow-[0_28px_70px_-30px_rgba(139,73,98,0.5)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_90px_-30px_rgba(139,73,98,0.6)] focus-visible:outline-2 focus-visible:outline-[#D88BA8] md:p-10"
              style={{
                background:
                  "linear-gradient(155deg, #F8D8E4 0%, #F4A6C1 60%, #EC9BBA 100%)",
              }}
              aria-label="الانتقال إلى قاعة السيدات"
            >
              <div
                className="absolute inset-3 rounded-[1.6rem] border border-white/55"
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-start gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B3924F]/60 bg-white/55 text-[#3B1F2A] shadow-inner">
                  <Sparkles className="h-6 w-6" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="font-display text-3xl font-bold text-[#3B1F2A] md:text-4xl">
                    قاعة السيدات
                  </h3>
                  <p className="mt-1 font-tajawal text-sm font-bold tracking-wide text-[#D88BA8]">
                    {FEMALE_VENUE.name} — أسوان
                  </p>
                  <p className="mt-2 max-w-xs font-tajawal text-[15px] leading-relaxed text-[#3B1F2A]/85 md:text-base">
                    ليلة جميلة تجمعنا على المحبة والفرح — وجودكن يزيد ليلتنا جمالاً.
                  </p>
                </div>
                <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#B3924F]/55 bg-white/45 px-5 py-2 font-tajawal text-sm font-bold text-[#3B1F2A] transition-colors duration-500 group-hover:bg-white/85">
                  ادخلي القاعة
                  <span aria-hidden="true">←</span>
                </span>
              </div>
              <span
                className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full opacity-50 blur-2xl transition-opacity duration-700 group-hover:opacity-80"
                style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }}
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ══════════ Men's hall ══════════ */}
      <section
        id="male-hall"
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          background:
            "linear-gradient(170deg, #DDF5FC 0%, #C9EAF7 35%, #A9DFF2 75%, #8FD3EA 100%)",
        }}
        aria-label="قاعة الرجال"
      >
        <Particles density={20} kinds={["bokeh"]} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.6), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#B3924F]/55 bg-white/50 text-[#173746] shadow-inner">
              <Users className="h-7 w-7" strokeWidth={1.3} />
            </span>
            <p className="font-english text-[11px] tracking-[0.5em] text-[#78BDD9]">
              GENTLEMEN&apos;S HALL
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-[#173746] md:text-5xl">
              قاعة الرجال
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-tajawal text-base leading-[1.9] text-[#173746]/85 md:text-lg">
              يشرفنا حضوركم ومشاركتنا فرحتنا في هذه الليلة المميزة.
              ننتظركم لنحتفل معاً ببداية أجمل حكاية.
            </p>
            <div className="ornament-divider mt-8" aria-hidden="true">
              <span className="ornament-gem" />
            </div>
          </motion.div>

          {/* photo strip */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {[
              { src: "/images/wedding/photo-02.jpeg", alt: "من أجواء احتفالنا", caption: "من أجواء الاحتفال", ratio: "4 / 3" },
              { src: "/images/wedding/photo-04.jpeg", alt: "لحظة من ليلة العمر", caption: "ليلة العمر", ratio: "4 / 3" },
            ].map((p, i) => (
              <motion.figure
                key={p.src}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
                className="group relative overflow-hidden rounded-[1.6rem] border-4 border-white/70 shadow-[0_26px_60px_-26px_rgba(23,55,70,0.5)]"
              >
                <div className="relative w-full" style={{ aspectRatio: p.ratio }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 92vw, 46vw"
                    className="object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.05]"
                  />
                  <figcaption className="absolute bottom-3 right-4 rounded-full bg-[#173746]/55 px-4 py-1 font-tajawal text-xs font-semibold text-white backdrop-blur-md md:text-sm">
                    {p.caption}
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3 rounded-full border border-[#78BDD9]/50 bg-white/45 px-6 py-3.5 backdrop-blur-sm"
          >
            <Clock3 className="h-5 w-5 text-[#173746]" strokeWidth={1.5} />
            <p className="font-tajawal text-sm font-semibold text-[#173746] md:text-base">
              {WEDDING.dateFull} — {WEDDING.timeArabic}
            </p>
          </motion.div>

          <HallLocationCard venue={MALE_VENUE} variant="male" />
        </div>
      </section>

      {/* curtain split divider */}
      <div
        className="relative h-16 md:h-20"
        style={{
          background:
            "linear-gradient(90deg, #A9DFF2 0%, #A9DFF2 46%, #F4A6C1 54%, #F4A6C1 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 46%, rgba(255,255,255,0.85) 50%, transparent 54%)",
          }}
        />
      </div>

      {/* ══════════ Women's hall ══════════ */}
      <section
        id="female-hall"
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          background:
            "linear-gradient(170deg, #F8D8E4 0%, #F6C3D6 40%, #F4A6C1 78%, #EC9BBA 100%)",
        }}
        aria-label="قاعة السيدات"
      >
        <Particles density={22} kinds={["petal", "bokeh"]} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.55), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="text-center"
          >
            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#B3924F]/55 bg-white/50 text-[#3B1F2A] shadow-inner">
              <Sparkles className="h-7 w-7" strokeWidth={1.3} />
            </span>
            <p className="font-english text-[11px] tracking-[0.5em] text-[#D88BA8]">
              LADIES&apos; HALL
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-[#3B1F2A] md:text-5xl">
              قاعة السيدات
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-tajawal text-base leading-[1.9] text-[#3B1F2A]/85 md:text-lg">
              وجودكن معنا يزيد ليلتنا جمالاً وفرحاً —
              ننتظركن لنقضي معاً أجمل ليلة، مليئة بالفرح والذكريات الجميلة.
            </p>
            <div className="ornament-divider mt-8" aria-hidden="true">
              <span className="ornament-gem" />
            </div>
          </motion.div>

          {/* photo strip */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {[
              { src: "/images/wedding/photo-06.jpeg", alt: "لحظة فرح من حكايتنا", caption: "فرحة العمر", ratio: "4 / 3" },
              { src: "/images/wedding/photo-01.jpeg", alt: "ذكرى من أجمل اللحظات", caption: "أجمل اللحظات", ratio: "4 / 3" },
            ].map((p, i) => (
              <motion.figure
                key={p.src}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
                className="group relative overflow-hidden rounded-[1.6rem] border-4 border-white/70 shadow-[0_26px_60px_-26px_rgba(139,73,98,0.55)]"
              >
                <div className="relative w-full" style={{ aspectRatio: p.ratio }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 92vw, 46vw"
                    className="object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.05]"
                  />
                  <figcaption className="absolute bottom-3 right-4 rounded-full bg-[#3B1F2A]/55 px-4 py-1 font-tajawal text-xs font-semibold text-white backdrop-blur-md md:text-sm">
                    {p.caption}
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3 rounded-full border border-[#D88BA8]/50 bg-white/45 px-6 py-3.5 backdrop-blur-sm"
          >
            <Clock3 className="h-5 w-5 text-[#3B1F2A]" strokeWidth={1.5} />
            <p className="font-tajawal text-sm font-semibold text-[#3B1F2A] md:text-base">
              {WEDDING.dateFull} — {WEDDING.timeArabic}
            </p>
          </motion.div>

          <HallLocationCard venue={FEMALE_VENUE} variant="female" />

          {/* ── Privacy notice — ONLY here, at the bottom of the women's hall ── */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease }}
            className="mx-auto mt-14 max-w-xl"
            role="note"
            aria-label="تنبيه خاص بقاعة السيدات"
          >
            <div
              className="flex items-center gap-4 rounded-2xl px-6 py-5 text-center shadow-[0_18px_44px_-20px_rgba(139,73,98,0.45)] md:px-8"
              style={{
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(212,175,112,0.65)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D4AF70]/70 bg-white/70"
                style={{ color: "#8B4962" }}
                aria-hidden="true"
              >
                <CameraOff className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="text-right font-tajawal text-[15px] font-semibold leading-[1.9] md:text-base" style={{ color: "#8B4962" }}>
                {PRIVACY_NOTICE}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
