"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Luxury wedding loader — pink stage, rotating gold rings,
 * the couple's names in gold foil, and a soft progress shimmer.
 */
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const minDuration = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      // perceived progress: fast to 85%, then wait for real readiness
      const timeProgress = Math.min(1, elapsed / minDuration);
      const eased = 1 - Math.pow(1 - timeProgress, 2.2);
      setProgress(Math.min(100, Math.round(eased * 88)));

      const heroImg = new Image();
      heroImg.src = "/images/wedding/photo-02.jpeg";

      if (timeProgress >= 1 && document.readyState === "complete") {
        setProgress(100);
        window.setTimeout(() => setDone(true), 420);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // safety: never trap the user
  useEffect(() => {
    const safety = window.setTimeout(() => setDone(true), 6000);
    return () => window.clearTimeout(safety);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(150deg, #F4A6C1 0%, #F8D8E4 55%, #F4A6C1 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          aria-label="جارٍ تحضير الدعوة"
          role="status"
        >
          {/* soft radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 50% 42%, rgba(255,255,255,0.5), transparent 70%)",
            }}
          />
          {/* faint ornamental corners */}
          <div className="absolute top-6 right-6 h-16 w-16 border-t border-r border-[#D4AF70]/50 rounded-tr-3xl" />
          <div className="absolute top-6 left-6 h-16 w-16 border-t border-l border-[#D4AF70]/50 rounded-tl-3xl" />
          <div className="absolute bottom-6 right-6 h-16 w-16 border-b border-r border-[#D4AF70]/50 rounded-br-3xl" />
          <div className="absolute bottom-6 left-6 h-16 w-16 border-b border-l border-[#D4AF70]/50 rounded-bl-3xl" />

          <div className="relative flex flex-col items-center gap-7 px-8">
            {/* rotating gold rings */}
            <div className="relative h-28 w-28" aria-hidden="true">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px solid transparent",
                  borderTopColor: "#D4AF70",
                  borderRightColor: "rgba(212,175,112,0.4)",
                  animation: "ring-rotate 1.6s linear infinite",
                }}
              />
              <div
                className="absolute inset-3 rounded-full"
                style={{
                  border: "1px solid transparent",
                  borderBottomColor: "#B3924F",
                  borderLeftColor: "rgba(179,146,79,0.35)",
                  animation: "ring-rotate 2.6s linear infinite reverse",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display text-4xl"
                  style={{ color: "#8B4962" }}
                >
                  ♥
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="font-english text-[11px] tracking-[0.5em] text-[#8B4962]/80 mb-2">
                YAZID &amp; ALAA
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[#3B1F2A]">
                يزيد <span className="text-gold-foil">&amp;</span> آلاء
              </h1>
              <p className="mt-3 text-sm md:text-base text-[#8B4962] font-tajawal">
                نُعدّ لكم أجمل ليلة…
              </p>
            </div>

            {/* progress bar */}
            <div className="w-56 md:w-72">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/40">
                <div
                  className="h-full rounded-full transition-[width] duration-300 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #B3924F, #E8CF9A, #D4AF70)",
                    boxShadow: "0 0 12px rgba(212,175,112,0.8)",
                  }}
                />
              </div>
              <p className="mt-2 text-center text-[11px] tracking-widest text-[#8B4962]/70 font-english">
                {progress}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
