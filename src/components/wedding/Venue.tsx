"use client";

import { motion } from "framer-motion";
import {
  CalendarHeart,
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
  venueEmbedUrl,
  WEDDING,
  type Venue as VenueInfo,
} from "@/lib/wedding-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Compact hall card — colored header strip + embedded map beside the
 * address/button info. Stacked layout: men's hall first, women's hall below.
 */
function HallCard({
  venue,
  variant,
  icon,
  tag,
  index,
}: {
  venue: VenueInfo;
  variant: "male" | "female";
  icon: React.ReactNode;
  tag: string;
  index: number;
}) {
  const isMale = variant === "male";
  return (
    <motion.article
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: index * 0.14, ease: EASE }}
      className="glass-pink mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] text-right shadow-[0_26px_64px_-30px_rgba(59,31,42,0.45)]"
      aria-label={`${tag} — ${venue.name}`}
    >
      {/* header strip */}
      <div
        className="flex items-center gap-4 px-7 py-5 md:px-8 md:py-6"
        style={{
          background: isMale
            ? "linear-gradient(120deg, rgba(169,223,242,0.55), rgba(221,245,252,0.55))"
            : "linear-gradient(120deg, rgba(244,166,193,0.55), rgba(248,216,228,0.55))",
        }}
      >
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-white/60 md:h-16 md:w-16"
          style={{
            borderColor: isMale ? "rgba(120,189,217,0.7)" : "rgba(212,175,112,0.7)",
            color: isMale ? "#173746" : "#8B4962",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <div>
          <p
            className="font-tajawal text-xs font-bold tracking-wide md:text-sm"
            style={{ color: isMale ? "#78BDD9" : "#D88BA8" }}
          >
            {tag}
          </p>
          <h4 className="font-display text-2xl font-bold text-[#3B1F2A] md:text-[2.1rem]">
            {venue.name}
          </h4>
        </div>
      </div>

      {/* body — map beside info (mirrored on desktop for the women's card) */}
      <div
        className={`flex flex-col ${
          isMale ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* embedded map */}
        <div className="relative m-4 mb-0 overflow-hidden rounded-2xl border border-[#D4AF70]/45 shadow-[0_18px_44px_-20px_rgba(59,31,42,0.4)] md:m-5 md:mb-5 md:w-[58%]">
          <iframe
            src={venueEmbedUrl(venue)}
            title={`خريطة موقع ${venue.name}`}
            aria-label={`خريطة موقع ${venue.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-56 w-full md:h-[21rem]"
            style={{ border: 0, filter: "saturate(1.05)" }}
            allowFullScreen
          />
          <span
            className="pointer-events-none absolute inset-2 rounded-xl border border-white/50"
            aria-hidden="true"
          />
        </div>

        {/* address + button */}
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-7 py-8 text-center md:px-8 md:py-10">
          <p className="flex items-center justify-center gap-2.5 font-tajawal text-base text-[#6E4256] md:text-lg">
            <MapPin className="h-5 w-5 shrink-0 text-[#B3924F]" aria-hidden="true" />
            {venue.address}
          </p>
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-btn !px-10 !py-3.5 text-base md:text-lg"
            aria-label={`فتح موقع ${venue.name} على خرائط جوجل`}
          >
            <Navigation className="h-5 w-5" aria-hidden="true" />
            افتح الموقع على الخريطة
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Venue / الوكيشن — date, day, time and the two celebration halls
 * (قاعة لامور للرجال بالأعلى · قاعة الفيروز للسيدات بالأسفل)
 * on one page, with the photography notice at the very bottom.
 */
export function Venue() {
  const ease = EASE;

  return (
    <section
      id="venue"
      className="paper-texture relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #FFF8F3 0%, #FDF1F5 100%)" }}
      aria-label="موعدنا ومكان الحفل"
    >
      <Particles density={14} kinds={["gold", "bokeh"]} />
      <div
        className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #F4A6C1, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="font-english text-[11px] tracking-[0.5em] text-[#B3924F]"
        >
          SAVE THE DATE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease, delay: 0.08 }}
          className="mt-4 font-display text-4xl font-bold text-[#3B1F2A] md:text-5xl"
        >
          موعدنا ومكاننا
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-3 font-tajawal text-base text-[#6E4256] md:text-lg"
        >
          ننتظركم في ليلتنا الكبيرة — في الثامن من سبتمبر 2026 تبدأ ليلة من أجمل ليالينا.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="ornament-divider mt-8"
          aria-hidden="true"
        >
          <span className="ornament-gem" />
        </motion.div>

        {/* Date & time cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {[
            {
              icon: <CalendarHeart className="h-6 w-6" strokeWidth={1.4} />,
              label: "التاريخ",
              value: WEDDING.dateMain,
              sub: WEDDING.dayName,
            },
            {
              icon: <Clock3 className="h-6 w-6" strokeWidth={1.4} />,
              label: "الوقت",
              value: WEDDING.timeArabic,
              sub: "مساءً",
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.95, delay: i * 0.12, ease }}
              className="glass-pink group relative flex flex-col items-center gap-3 rounded-[1.7rem] px-6 py-9 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF70]/60 bg-gradient-to-br from-white/80 to-[#F8D8E4]/70 text-[#8B4962] shadow-inner">
                {card.icon}
              </span>
              <span className="font-tajawal text-sm font-bold tracking-wide text-[#B3924F]">
                {card.label}
              </span>
              <span className="font-display text-2xl font-bold text-[#3B1F2A] md:text-[1.7rem]">
                {card.value}
              </span>
              <span className="font-tajawal text-sm text-[#6E4256]/80">{card.sub}</span>
            </motion.div>
          ))}
        </div>

        {/* ── The two halls — one page: men first, women below ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease }}
          className="ornament-divider mt-20"
          aria-hidden="true"
        >
          <span className="ornament-gem" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease, delay: 0.05 }}
          className="mt-6 font-display text-3xl font-bold text-[#3B1F2A] md:text-4xl"
        >
          قاعتا الحفل
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-2 font-tajawal text-sm text-[#6E4256] md:text-base"
        >
          على كورنيش النيل بأبو الريش قبلي — أسوان
        </motion.p>

        <div className="mt-10 flex flex-col gap-7">
          {/* 1 — Men's hall (top) */}
          <HallCard
            venue={MALE_VENUE}
            variant="male"
            icon={<Users className="h-6 w-6" strokeWidth={1.4} />}
            tag="قاعة الرجال"
            index={0}
          />

          {/* 2 — Women's hall (bottom) */}
          <HallCard
            venue={FEMALE_VENUE}
            variant="female"
            icon={<Sparkles className="h-6 w-6" strokeWidth={1.4} />}
            tag="قاعة السيدات"
            index={1}
          />

          {/* ── Privacy notice — at the very bottom, with the women's hall ── */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mx-auto w-full max-w-xl"
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
              <p
                className="text-right font-tajawal text-[15px] font-semibold leading-[1.9] md:text-base"
                style={{ color: "#8B4962" }}
              >
                {PRIVACY_NOTICE}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mx-auto mt-14 max-w-lg font-display text-lg leading-[1.9] text-[#6E4256] md:text-xl"
        >
          «وفي الثامن من سبتمبر 2026 تبدأ ليلة من أجمل ليالينا» —
          احتفظوا بالموعد، وأرونا من حضوركم أجمل هدية.
        </motion.p>
      </div>
    </section>
  );
}
