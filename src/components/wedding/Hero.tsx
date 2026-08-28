"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Particles } from "./Particles";
import {
  HERO_CTA,
  HERO_EYEBROW,
  HERO_SECONDARY_TITLE,
  SCROLL_SUBTEXT,
  SCROLL_TEXT,
  WEDDING,
} from "@/lib/wedding-data";

/**
 * Cinematic full-screen hero — Ken Burns backdrop, pink gradient overlay,
 * gold dust, petals and bokeh particles, light rays, vignette,
 * mouse parallax on desktop.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  // Desktop mouse parallax (subtle)
  useEffect(() => {
    if (reduce) return;
    const el = layerRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.transform = `translate3d(${x * -12}px, ${y * -8}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="home"
      className="vignette relative flex min-h-[720px] h-[100svh] w-full items-center justify-center overflow-hidden"
      aria-label="بداية الدعوة"
    >
      {/* Cinematic backdrop with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          ref={layerRef}
          className="absolute inset-[-4%] will-change-transform transition-transform duration-300 ease-out"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.4, ease }}
        >
          <Image
            src="/images/wedding/photo-02.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="ken-burns object-cover"
          />
        </motion.div>
      </div>

      {/* Subtle pink gradient overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(59,31,42,0.42) 0%, rgba(139,73,98,0.32) 38%, rgba(244,166,193,0.24) 70%, rgba(59,31,42,0.5) 100%)",
        }}
      />
      {/* Soft light rays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="ray-sway absolute -top-1/4 left-[18%] h-[150%] w-[130px] rotate-[-6deg] opacity-40 blur-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,244,220,0.5), rgba(232,207,154,0.08) 60%, transparent)",
          }}
        />
        <div
          className="ray-sway absolute -top-1/4 left-[52%] h-[150%] w-[70px] rotate-[-10deg] opacity-30 blur-2xl"
          style={{
            animationDelay: "-5s",
            background:
              "linear-gradient(180deg, rgba(255,236,244,0.55), rgba(244,166,193,0.06) 55%, transparent)",
          }}
        />
      </div>

      {/* Particles: gold dust + petals + bokeh */}
      <Particles density={35} kinds={["gold", "petal", "bokeh"]} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 1.1, ease }}
          className="mb-5 rounded-full border border-[#E8CF9A]/50 bg-white/10 px-5 py-1.5 font-tajawal text-[13px] tracking-wide text-[#FFF8F3] backdrop-blur-md md:text-sm"
        >
          {HERO_EYEBROW}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
          animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.55, duration: 1.5, ease }}
          className="font-display text-[clamp(3.2rem,11vw,7.5rem)] font-bold leading-[1.05] text-white"
          style={{ textShadow: "0 6px 44px rgba(59,31,42,0.65), 0 2px 12px rgba(59,31,42,0.5)" }}
        >
          يزيد{" "}
          <span className="text-gold-foil" style={{ filter: "drop-shadow(0 4px 18px rgba(59,31,42,0.55))" }}>
            &amp;
          </span>{" "}
          آلاء
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 1.2, ease }}
          className="mt-4 font-display text-xl text-[#FFF8F3] md:text-2xl"
          style={{ textShadow: "0 2px 18px rgba(59,31,42,0.6)" }}
        >
          {HERO_SECONDARY_TITLE}
        </motion.p>

        {/* Gold ornament divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={ready ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1.05, duration: 1.1, ease }}
          className="ornament-divider my-7"
          aria-hidden="true"
        >
          <span className="ornament-gem" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 1.1, ease }}
          className="flex flex-col items-center gap-1.5"
        >
          <p className="font-display text-lg font-semibold tracking-wide text-white md:text-2xl">
            {WEDDING.dateMain}
          </p>
          <p className="font-tajawal text-sm text-[#FFF8F3]/90 md:text-base">
            {WEDDING.timeArabic}
          </p>
          <p className="mt-1 font-english text-[10px] tracking-[0.5em] text-[#E8CF9A] md:text-[11px]">
            {WEDDING.englishLabel} · {WEDDING.englishDate}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.45, duration: 1, ease }}
          onClick={() => scrollTo("countdown")}
          className="luxury-btn mt-10 text-[15px] md:text-base"
        >
          {HERO_CTA}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1.2 }}
        onClick={() => scrollTo("countdown")}
        className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[#FFF8F3]/95 md:bottom-[5.5rem]"
        aria-label={`${SCROLL_TEXT} — ${SCROLL_SUBTEXT}`}
      >
        <span className="font-tajawal text-xs tracking-wide">{SCROLL_TEXT}</span>
        <span className="text-[10px] opacity-70">{SCROLL_SUBTEXT}</span>
        <span className="mt-1 flex h-9 w-6 items-start justify-center rounded-full border border-[#E8CF9A]/70 p-1">
          <span className="scroll-hint-dot h-1.5 w-1.5 rounded-full bg-[#E8CF9A]" />
        </span>
      </motion.button>
    </section>
  );
}
