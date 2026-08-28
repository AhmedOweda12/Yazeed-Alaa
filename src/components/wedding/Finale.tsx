"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Particles } from "./Particles";
import { WEDDING } from "@/lib/wedding-data";

/**
 * Cinematic final section (70vh) + luxury dark footer.
 */
export function Finale() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      {/* ══════════ Final cinematic section ══════════ */}
      <section
        className="vignette relative flex min-h-[70vh] items-center justify-center overflow-hidden"
        aria-label="ختام الدعوة"
      >
        {/* blurred cinematic backdrop */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/wedding/photo-05.jpeg"
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="scale-110 object-cover blur-[6px]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(59,31,42,0.55) 0%, rgba(216,139,168,0.42) 50%, rgba(59,31,42,0.65) 100%)",
            }}
          />
        </div>

        <Particles density={30} kinds={["gold", "petal"]} />

        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease }}
            className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#E8CF9A]/60 bg-white/10 backdrop-blur-md"
          >
            <span className="text-2xl" style={{ color: "#F6E7CB" }} aria-hidden="true">
              ♥
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease }}
            className="font-display text-4xl font-bold leading-snug text-white md:text-6xl"
            style={{ textShadow: "0 6px 40px rgba(59,31,42,0.7)" }}
          >
            إلى أن نلتقي في أجمل ليلة
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="ornament-divider my-8"
            aria-hidden="true"
          >
            <span className="ornament-gem" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="font-display text-3xl font-bold text-white md:text-4xl"
            style={{ textShadow: "0 4px 30px rgba(59,31,42,0.7)" }}
          >
            {WEDDING.combinedArabic}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.55 }}
            className="mt-3 font-tajawal text-lg text-[#FFF8F3]/90 md:text-xl"
          >
            {WEDDING.dateMain} — {WEDDING.timeArabic}
          </motion.p>
        </div>
      </section>

      {/* ══════════ Footer ══════════ */}
      <footer
        className="relative overflow-hidden"
        style={{ background: "#211820" }}
        aria-label="خاتمة الدعوة"
      >
        {/* gold top hairline */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #D4AF70, transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #D88BA8, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 pb-32 pt-16 text-center md:pb-36 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              {WEDDING.combinedArabic}
            </h2>
            <p className="font-tajawal text-base text-white/75 md:text-lg">
              شكراً لمشاركتكم فرحتنا.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="flex items-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-16 bg-gradient-to-l from-[#D4AF70] to-transparent" />
            <span className="ornament-gem" />
            <span className="h-px w-16 bg-gradient-to-r from-[#D4AF70] to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.35 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="font-tajawal text-sm font-semibold tracking-wide text-[#D4AF70]">
              {WEDDING.dateMain}
            </p>
            <p className="font-english text-[10px] tracking-[0.45em] text-white/45">
              {WEDDING.englishLabel} · {WEDDING.englishDate}
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
