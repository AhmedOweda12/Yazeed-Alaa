"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Particles } from "./Particles";
import { PHOTOS } from "@/lib/wedding-data";

const CHAPTERS = [
  {
    id: "story_01",
    title: "البداية",
    eyebrow: "الفصل الأول",
    text: "كل حكاية جميلة تبدأ بلقاءٍ يغيّر كل شيء. بدأت حكايتنا بلحظة بسيطة صارت أجمل ذكرى في حياتنا.",
    photo: PHOTOS[0],
  },
  {
    id: "story_02",
    title: "ذكريات",
    eyebrow: "الفصل الثاني",
    text: "جمعتنا أيامٌ لا تُنسى، وضحكاتٌ بقيت محفورة في القلب. كل صورة هنا تحمل ذكرى نعتز بها.",
    photo: PHOTOS[2],
  },
  {
    id: "story_03",
    title: "لحظات",
    eyebrow: "الفصل الثالث",
    text: "لحظات صغيرة بنَت حكاية كبيرة؛ نظرة، كلمة، ووعدٌ بالبقاء. هكذا كتبنا فصولنا واحدة تلو الأخرى.",
    photo: PHOTOS[4],
  },
  {
    id: "story_04",
    title: "ليلة العمر",
    eyebrow: "الفصل الأخير",
    text: "وفي الثامن من سبتمبر نكتب أجمل الفصول، ليلة نجمعكم فيها معنا لنحتفل ببداية العمر كله.",
    photo: PHOTOS[6],
  },
];

/**
 * Intro + cinematic story chapters — centered editorial intro on cream,
 * then alternating photo chapters with scroll reveals.
 */
export function StoryIntro() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="story"
      className="paper-texture relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF8F3 0%, #FDF1F5 50%, #FFF8F3 100%)",
      }}
      aria-label="حكاية يزيد وآلاء"
    >
      <Particles density={14} kinds={["gold", "bokeh"]} />

      {/* soft blush blooms */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #F8D8E4, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-40 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #F4A6C1, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ---- Editorial intro ---- */}
      <div className="relative mx-auto max-w-3xl px-6 pb-10 pt-24 text-center md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="font-english text-[11px] tracking-[0.5em] text-[#B3924F]"
        >
          OUR STORY
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="mt-4 font-display text-4xl font-bold leading-snug text-[#3B1F2A] md:text-5xl"
        >
          ومن هنا تبدأ الحكاية
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease, delay: 0.25 }}
          className="ornament-divider my-8"
          aria-hidden="true"
        >
          <span className="ornament-gem" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="mx-auto max-w-xl font-tajawal text-lg leading-[1.9] text-[#6E4256] md:text-xl"
        >
          في ليلة استثنائية نجتمع لنحتفل ببداية فصل جديد من حكاية يزيد وآلاء.
          ليلة نسجناها من الفرح والحب، وننتظر أن تشاركونا تفاصيلها لحظةً تلو الأخرى.
        </motion.p>
      </div>

      {/* ---- Chapters ---- */}
      <div className="relative mx-auto max-w-6xl px-6 pb-24">
        {CHAPTERS.map((ch, i) => {
          const flip = i % 2 === 1;
          return (
            <motion.article
              key={ch.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease }}
              className={`mb-16 grid items-center gap-8 md:mb-24 md:gap-14 ${
                flip ? "md:[&>*:first-child]:order-2" : ""
              } md:grid-cols-2`}
            >
              {/* Photo */}
              <div className="group relative mx-auto w-full max-w-md">
                <div
                  className="absolute -inset-3 -rotate-2 rounded-[2rem] border border-[#D4AF70]/40 bg-white/60 shadow-[0_24px_60px_-24px_rgba(139,73,98,0.4)] transition-transform duration-700 group-hover:rotate-0"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] shadow-[0_30px_70px_-30px_rgba(59,31,42,0.5)]">
                  <Image
                    src={ch.photo.src}
                    alt={ch.photo.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B1F2A]/25 via-transparent to-transparent" />
                  <div className="absolute inset-2.5 rounded-[1.25rem] border border-white/40" />
                </div>
              </div>

              {/* Text */}
              <div className={`text-center md:text-start ${flip ? "md:pr-4" : "md:pl-4"}`}>
                <p className="font-english text-[10px] tracking-[0.45em] text-[#B3924F]">
                  CHAPTER {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold text-[#3B1F2A] md:text-4xl">
                  {ch.title}
                </h3>
                <div
                  className={`my-5 h-px w-16 bg-gradient-to-l from-[#D4AF70] to-transparent ${
                    flip ? "mx-auto md:mr-0" : "mx-auto md:ml-0"
                  }`}
                  aria-hidden="true"
                />
                <p className="mx-auto max-w-md font-tajawal text-base leading-[1.95] text-[#6E4256] md:mx-0 md:text-lg">
                  {ch.text}
                </p>
                <p className="mt-4 text-sm font-semibold tracking-wide text-[#B3924F]">
                  {ch.eyebrow}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
