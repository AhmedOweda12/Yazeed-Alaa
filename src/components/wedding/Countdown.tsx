"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock3, Hourglass, Sparkles } from "lucide-react";
import { Particles } from "./Particles";
import { computeTimeLeft, isWeddingDay, type TimeLeft } from "@/lib/countdown";
import { COUNTDOWN_LABELS, WEDDING } from "@/lib/wedding-data";

/** Arabic-Indic-free western numerals with RTL-safe display */
function toArabicPlural(value: number, labels: { plural: string; singular: string }) {
  return value === 1 ? labels.singular : labels.plural;
}

function FlipUnit({
  value,
  label,
  icon,
  delay,
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass-pink group relative flex flex-col items-center rounded-[1.6rem] px-2 py-6 md:rounded-[2rem] md:py-9"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* gold top ornament */}
      <span
        className="absolute -top-[1px] left-1/2 h-[3px] w-2/5 -translate-x-1/2 rounded-full bg-gradient-to-l from-transparent via-[#D4AF70] to-transparent"
        aria-hidden="true"
      />
      <span className="mb-2 text-[#B3924F]">{icon}</span>

      <div className="relative h-[1.25em] w-full overflow-hidden text-center font-display font-bold leading-none text-[#3B1F2A]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "88%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-88%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="block"
            style={{
              fontSize: "clamp(2.4rem, 8vw, 6.9rem)",
              textShadow: "0 10px 34px rgba(139,73,98,0.28)",
            }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="mt-3 font-tajawal text-sm font-semibold tracking-wide text-[#8B4962] md:text-base">
        {label}
      </span>
    </motion.div>
  );
}

/**
 * Countdown — the visual heart of the invitation.
 * Large Arabic-labelled glass cards with flip number animation.
 */
export function Countdown() {
  const [left, setLeft] = useState<TimeLeft | null>(null);
  const [weddingDay, setWeddingDay] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const initial = computeTimeLeft();
      setLeft(initial);
      setWeddingDay(isWeddingDay(initial));
    });
    const id = window.setInterval(() => {
      const next = computeTimeLeft();
      setLeft(next);
      setWeddingDay(isWeddingDay(next));
    }, 1000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="countdown"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(165deg, #F4A6C1 0%, #F8D8E4 45%, #F6C3D6 75%, #F4A6C1 100%)",
      }}
      aria-label="العد التنازلي ليوم الزفاف"
    >
      <Particles density={26} kinds={["gold", "bokeh", "petal"]} />

      {/* soft radial light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 8%, rgba(255,255,255,0.55), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="font-english text-[11px] tracking-[0.5em] text-[#8B4962]/85"
        >
          COUNTING DOWN
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease, delay: 0.08 }}
          className="mt-4 font-display text-4xl font-bold text-[#3B1F2A] md:text-6xl"
        >
          باقي على أجمل ليلة
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.25 }}
          className="mt-3 font-tajawal text-base text-[#6E4256] md:text-lg"
        >
          {WEDDING.dateFull} — الساعة {WEDDING.timeArabic}
        </motion.p>

        {weddingDay ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="relative mx-auto mt-14 max-w-2xl"
          >
            <Particles density={70} kinds={["gold", "petal"]} />
            <div className="glass-pink relative rounded-[2rem] px-8 py-16">
              <span className="mb-4 inline-block text-4xl" aria-hidden="true">
                ♥
              </span>
              <h3 className="font-display text-4xl font-bold text-[#3B1F2A] md:text-5xl">
                اليوم هو يومنا الكبير ❤️
              </h3>
              <p className="mt-4 font-tajawal text-lg text-[#6E4256]">
                بانتظاركم لنحتفل معاً بأجمل ليلة
              </p>
            </div>
          </motion.div>
        ) : (
          <div
            className="mt-14 grid grid-cols-2 gap-3.5 md:mt-16 md:grid-cols-4 md:gap-5"
            role="timer"
            aria-live="off"
            aria-label="الوقت المتبقي لحفل الزفاف"
          >
            <FlipUnit
              value={left?.days ?? 0}
              label={left ? toArabicPlural(left.days, { plural: COUNTDOWN_LABELS.days, singular: COUNTDOWN_LABELS.daySingular }) : COUNTDOWN_LABELS.days}
              icon={<CalendarDays className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.4} />}
              delay={0.05}
            />
            <FlipUnit
              value={left?.hours ?? 0}
              label={left ? toArabicPlural(left.hours, { plural: COUNTDOWN_LABELS.hours, singular: COUNTDOWN_LABELS.hourSingular }) : COUNTDOWN_LABELS.hours}
              icon={<Clock3 className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.4} />}
              delay={0.15}
            />
            <FlipUnit
              value={left?.minutes ?? 0}
              label={left ? toArabicPlural(left.minutes, { plural: COUNTDOWN_LABELS.minutes, singular: COUNTDOWN_LABELS.minuteSingular }) : COUNTDOWN_LABELS.minutes}
              icon={<Hourglass className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.4} />}
              delay={0.25}
            />
            <FlipUnit
              value={left?.seconds ?? 0}
              label={left ? toArabicPlural(left.seconds, { plural: COUNTDOWN_LABELS.seconds, singular: COUNTDOWN_LABELS.secondSingular }) : COUNTDOWN_LABELS.seconds}
              icon={<Sparkles className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.4} />}
              delay={0.35}
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="ornament-divider mt-16"
          aria-hidden="true"
        >
          <span className="ornament-gem" />
        </motion.div>
      </div>
    </section>
  );
}
