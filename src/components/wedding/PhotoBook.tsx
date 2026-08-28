"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { BOOK_PAGES, WEDDING } from "@/lib/wedding-data";

/**
 * ─────────────────────────────────────────────────────────────
 *  THE SIGNATURE 3D PHOTO BOOK
 *  Authentic Arabic (RTL) album: spine on the right, pages turn
 *  from left → right driven purely by scroll progress.
 *  350vh runway, pinned book, one page turn per scroll segment.
 * ─────────────────────────────────────────────────────────────
 */

type Sheet = {
  kind: "cover" | "photo" | "back";
  photo?: (typeof BOOK_PAGES)[number];
};

const SHEETS: Sheet[] = [
  { kind: "cover" },
  ...BOOK_PAGES.map((photo) => ({ kind: "photo" as const, photo })),
  { kind: "back" },
];

const FLIPS = SHEETS.length - 1; // cover + 7 photos flip; back cover stays
const FLIP_ZONE_START = 0.05;
const FLIP_ZONE_SPAN = 0.9;
const SEGMENT = FLIP_ZONE_SPAN / FLIPS;

const smoothstep = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

export function PhotoBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /** angle (deg) of each sheet's flip at current progress */
  const angles = useMemo(() => {
    return SHEETS.map((_, i) => {
      if (i >= FLIPS) return 0; // back cover never flips
      const start = FLIP_ZONE_START + i * SEGMENT;
      const t = (progress - start) / SEGMENT;
      if (reduced) return t >= 0.5 ? 180 : 0;
      return smoothstep(t) * 180;
    });
  }, [progress, reduced]);

  /** current visible sheet index (for counter + background) */
  const currentIndex = useMemo(() => {
    let idx = 0;
    angles.forEach((a, i) => {
      if (a >= 90 && i < FLIPS) idx = i + 1;
    });
    return Math.min(idx, SHEETS.length - 1);
  }, [angles]);

  // scroll runway helpers for manual page controls
  const scrollToProgress = useCallback((p: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const targetY = window.scrollY + rect.top + p * total;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  // sheet k completes its flip at FLIP_ZONE_START + (k+1)*SEGMENT.
  // Landing just past that point shows sheet k+1 flat with the counter advanced.
  const landing = (sheetIndex: number) =>
    FLIP_ZONE_START + sheetIndex * SEGMENT + 0.08 * SEGMENT;

  const goNext = useCallback(() => {
    const next = Math.min(FLIPS, currentIndex + 1);
    scrollToProgress(landing(next));
  }, [currentIndex, scrollToProgress]);

  const goPrev = useCallback(() => {
    const prev = Math.max(0, currentIndex - 1);
    scrollToProgress(landing(prev));
  }, [currentIndex, scrollToProgress]);

  // keyboard support while section pinned
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const pinned = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!pinned) return;
      if (e.key === "ArrowLeft") goNext(); // RTL: left = forward
      if (e.key === "ArrowRight") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const current = SHEETS[currentIndex];
  const pageLabel =
    current.kind === "cover"
      ? "الغلاف"
      : current.kind === "back"
        ? "الغلاف الخلفي"
        : `صفحة ${current.photo?.pageNum} من ${BOOK_PAGES.length}`;

  // background tones crossfade per page
  const bgIndex = currentIndex % 3;
  const backgrounds = [
    "linear-gradient(170deg, #FFF8F3 0%, #F8D8E4 55%, #F4C9DA 100%)",
    "linear-gradient(170deg, #FDF1F5 0%, #FFF8F3 45%, #F8D8E4 100%)",
    "linear-gradient(170deg, #FBEDF2 0%, #FDF4F7 50%, #F6CBD9 100%)",
  ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative"
      style={{ height: "350vh" }}
      aria-label="لحظات لا تُنسى — ألبوم ثلاثي الأبعاد"
    >
      {/* pinned stage — header, book and controls all fit one screen */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center overflow-hidden">
        {/* per-page background crossfade */}
        {backgrounds.map((bg, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1100ms] ease-in-out"
            style={{
              background: bg,
              opacity: bgIndex === i ? 1 : 0,
            }}
            aria-hidden="true"
          />
        ))}
        {/* ambient blooms */}
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, #F4A6C1, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, #E8CF9A, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* section header (always visible above the book) */}
        <header className="relative z-20 flex flex-col items-center px-6 pb-2 pt-20 text-center md:pt-24">
          <p className="font-english text-[10px] tracking-[0.5em] text-[#B3924F] md:text-[11px]">
            MEMORIES
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-bold text-[#3B1F2A] md:mt-2 md:text-4xl">
            لحظات لا تُنسى
          </h2>
          <p className="mt-1 hidden max-w-md font-tajawal text-sm text-[#6E4256] md:mt-2 md:block md:text-base">
            كل صورة هنا تحمل ذكرى، وكل صفحة تحكي جزءاً من أجمل حكاية.
          </p>
          <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-[#B3924F] md:mt-1.5 md:text-sm">
            <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            انزل لتقلّب صفحات ألبومنا
          </p>
        </header>

        {/* ═══════════ THE BOOK ═══════════ */}
        <div className="book-stage relative z-10 flex flex-1 items-center justify-center self-stretch">
          <div
            className="relative"
            style={{
              width: "min(86vw, 26rem, calc((100vh - 23rem) * 0.723))",
              maxWidth: "100%",
              aspectRatio: "3 / 4.15",
            }}
          >
            {/* soft ground shadow */}
            <div
              className="absolute -bottom-8 left-1/2 h-10 w-[86%] -translate-x-1/2 rounded-[50%] blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(59,31,42,0.4), transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* book block: page edges + spine under the sheets */}
            <div
              className="absolute inset-0 rounded-l-[14px] rounded-r-[6px] shadow-[0_38px_80px_-30px_rgba(59,31,42,0.55)]"
              aria-hidden="true"
            >
              <div className="book-page-edge absolute inset-0 rounded-l-[14px] rounded-r-[6px]" />
              <div className="absolute inset-0 rounded-l-[14px] rounded-r-[6px] bg-gradient-to-l from-[#E9D9CD] via-[#FBF3EA] to-[#F3E5DA]" />
              {/* spine on the right */}
              <div
                className="absolute inset-y-0 right-0 w-[10px] rounded-r-[6px]"
                style={{
                  background:
                    "linear-gradient(90deg, #B98A97 0%, #D88BA8 45%, #A9707F 100%)",
                  boxShadow: "inset -2px 0 6px rgba(59,31,42,0.35)",
                }}
              />
              <div className="absolute inset-[7px] rounded-l-[10px] rounded-r-[3px] bg-[#FBF3EA]" />
            </div>

            {/* sheets */}
            {SHEETS.map((sheet, i) => {
              const angle = angles[i];
              const isFlipping = angle > 0.5 && angle < 179.5;
              const flipped = angle >= 179.5;
              // fade out after landing
              const fadeT = Math.min(1, Math.max(0, (angle - 150) / 30));
              const opacity = flipped ? 1 - fadeT : 1;
              // dynamic shading peaks mid-turn
              const mid = Math.sin((angle * Math.PI) / 180);
              const zIndex = isFlipping ? 60 : SHEETS.length - i;

              return (
                <div
                  key={i}
                  className="book-sheet"
                  style={{
                    transform: `rotateY(${angle}deg)`,
                    transformOrigin: "right center",
                    zIndex,
                    opacity,
                    pointerEvents: "none",
                  }}
                  aria-hidden={i !== currentIndex}
                >
                  {/* ══ FRONT FACE ══ */}
                  <div className="book-face rounded-l-[14px] rounded-r-[5px]">
                    {sheet.kind === "cover" ? (
                      <CoverFront />
                    ) : sheet.kind === "back" ? (
                      <BackCover />
                    ) : (
                      <PhotoPage photo={sheet.photo!} />
                    )}
                    {/* turning shadow on front face */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-l-[14px] rounded-r-[5px] bg-gradient-to-l from-[#3B1F2A]/55 via-[#3B1F2A]/10 to-transparent transition-opacity duration-150"
                      style={{ opacity: mid * 0.8 }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* ══ BACK FACE (paper) ══ */}
                  <div
                    className="book-face rounded-l-[5px] rounded-r-[14px]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div className="book-page-edge absolute inset-0 rounded-l-[5px] rounded-r-[14px]" />
                    <div className="absolute inset-0 rounded-l-[5px] rounded-r-[14px] bg-gradient-to-l from-[#FBF3EA] via-[#FDF7F0] to-[#F6EAE0]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3 opacity-60">
                        <span className="ornament-gem" aria-hidden="true" />
                        <span className="font-display text-lg text-[#B3924F]">
                          ذكرياتنا الجميلة
                        </span>
                      </div>
                    </div>
                    {/* turning shadow on back face */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-l-[5px] rounded-r-[14px] bg-gradient-to-r from-[#3B1F2A]/55 via-[#3B1F2A]/10 to-transparent transition-opacity duration-150"
                      style={{ opacity: (1 - mid) * 0.8 }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ controls + counter ══ */}
        <div className="relative z-10 mt-4 mb-5 flex flex-col items-center gap-2.5 md:mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF70]/60 bg-white/60 text-[#8B4962] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_10px_24px_-8px_rgba(212,175,112,0.6)]"
              aria-label="الصفحة السابقة"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="glass-pink min-w-44 rounded-full px-6 py-2 text-center">
              <span className="font-tajawal text-sm font-bold tracking-wide text-[#3B1F2A]">
                {pageLabel}
              </span>
            </div>
            <button
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF70]/60 bg-white/60 text-[#8B4962] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_10px_24px_-8px_rgba(212,175,112,0.6)]"
              aria-label="الصفحة التالية"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p className="font-tajawal text-sm font-semibold tracking-wide text-[#B3924F]">
            ألبوم ذكرياتنا — {WEDDING.combinedArabic}
          </p>
          {/* progress dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {SHEETS.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === currentIndex ? 22 : 6,
                  background:
                    i === currentIndex
                      ? "linear-gradient(90deg, #D88BA8, #D4AF70)"
                      : "rgba(139,73,98,0.22)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function CoverFront() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-l-[14px] rounded-r-[5px]">
      {/* luxury pink cloth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #D88BA8 0%, #C87E9C 40%, #D493AE 70%, #BE7490 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 4px), repeating-linear-gradient(-45deg, rgba(59,31,42,0.04) 0 2px, transparent 2px 4px)",
        }}
      />
      {/* gold embossed double frame */}
      <div className="absolute inset-4 rounded-[10px] border border-[#E8CF9A]/80" />
      <div className="absolute inset-6 rounded-[8px] border border-[#E8CF9A]/50" />
      {/* corner flourishes */}
      {[
        "top-7 right-7",
        "top-7 left-7 rotate-90",
        "bottom-7 left-7 rotate-180",
        "bottom-7 right-7 -rotate-90",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} h-7 w-7 rounded-full border border-[#E8CF9A]/70`}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,248,243,0.35), transparent 60%)",
          }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
        <span className="font-english text-[10px] tracking-[0.5em] text-[#F6E7CB]/90">
          OUR MEMORIES
        </span>
        <div className="ornament-divider" aria-hidden="true">
          <span className="ornament-gem" />
        </div>
        <h3
          className="font-display text-4xl font-bold leading-snug md:text-5xl"
          style={{
            color: "#F9EFDC",
            textShadow:
              "0 1px 0 rgba(120,80,60,0.6), 0 2px 6px rgba(59,31,42,0.45), 0 0px 24px rgba(232,207,154,0.35)",
          }}
        >
          يزيد <span style={{ color: "#E8CF9A" }}>&amp;</span> آلاء
        </h3>
        <p
          className="font-display text-xl text-[#F6E7CB]"
          style={{ textShadow: "0 1px 4px rgba(59,31,42,0.5)" }}
        >
          ذكرياتنا الجميلة
        </p>
        <div className="ornament-divider mt-1" aria-hidden="true">
          <span className="ornament-gem" />
        </div>
      </div>

      {/* spine-side shading (right) */}
      <div
        className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#3B1F2A]/35 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

function BackCover() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-l-[14px] rounded-r-[5px]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #C87E9C 0%, #D88BA8 50%, #BE7490 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 4px)",
        }}
      />
      <div className="absolute inset-5 rounded-[10px] border border-[#E8CF9A]/70" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-10 text-center">
        <span className="text-3xl" style={{ color: "#F6E7CB" }} aria-hidden="true">
          ♥
        </span>
        <h3
          className="font-display text-3xl font-bold leading-relaxed"
          style={{
            color: "#F9EFDC",
            textShadow: "0 2px 8px rgba(59,31,42,0.5)",
          }}
        >
          وتبقى الحكاية…
          <br />
          أجمل ما فيها أنكم جزء منها
        </h3>
        <div className="ornament-divider" aria-hidden="true">
          <span className="ornament-gem" />
        </div>
        <p className="font-tajawal text-sm text-[#F6E7CB]/90">
          شكراً لكل لحظة شاركتمونا إياها
        </p>
      </div>

      <div
        className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#3B1F2A]/35 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

function PhotoPage({
  photo,
}: {
  photo: (typeof BOOK_PAGES)[number];
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-l-[14px] rounded-r-[5px] bg-[#FDF7F0]">
      {/* premium matte paper margin */}
      <div className="absolute inset-0 flex flex-col p-3 pb-2 md:p-4 md:pb-2.5">
        <div className="relative flex-1 overflow-hidden rounded-[8px] shadow-[0_10px_28px_-12px_rgba(59,31,42,0.45)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 86vw, 470px"
            className="object-cover"
          />
          {/* thin gold frame */}
          <div
            className="pointer-events-none absolute inset-[5px] rounded-[5px] border border-[#D4AF70]/75"
            aria-hidden="true"
          />
          {/* inner spine shadow */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#3B1F2A]/22 to-transparent"
            aria-hidden="true"
          />
        </div>
        {/* caption + page number */}
        <div className="flex items-center justify-between px-1 pt-2">
          <span className="font-tajawal text-[12px] font-semibold text-[#8B4962] md:text-[13px]">
            {photo.caption}
          </span>
          <span className="font-english text-[9px] tracking-[0.3em] text-[#B3924F]">
            {String(photo.pageNum).padStart(2, "0")} / {String(BOOK_PAGES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      {/* paper edge shading */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#3B1F2A]/18 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
