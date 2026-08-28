"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { PHOTOS } from "@/lib/wedding-data";

/**
 * Luxury masonry gallery with a cinematic lightbox:
 * keyboard navigation, swipe on mobile, counter, soft fade transitions.
 */
export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ease = [0.22, 1, 0.36, 1] as const;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    []
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length
      ),
    []
  );

  // keyboard navigation
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") next(); // RTL: left = next
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  // touch swipe
  const touchX = useRef<number | null>(null);

  return (
    <section
      id="gallery"
      className="paper-texture relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #FFF8F3 0%, #FDF1F5 100%)" }}
      aria-label="معرض الصور"
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #F8D8E4, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="font-english text-[11px] tracking-[0.5em] text-[#B3924F]"
          >
            MEMORIES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease, delay: 0.08 }}
            className="mt-4 font-display text-4xl font-bold text-[#3B1F2A] md:text-5xl"
          >
            لحظات لا تُنسى
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-3 font-tajawal text-base text-[#6E4256] md:text-lg"
          >
            مجموعة من اللحظات التي نعتز بها — اضغطوا على أي صورة لمشاهدتها عن قرب.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="ornament-divider mt-7"
            aria-hidden="true"
          >
            <span className="ornament-gem" />
          </motion.div>
        </div>

        {/* Masonry */}
        <div className="masonry-gallery columns-2 md:columns-3 xl:columns-4">
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: (i % 4) * 0.08, ease }}
              onClick={() => setOpenIndex(i)}
              className="masonry-item group relative block w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF70]"
              aria-label={`عرض الصورة: ${photo.alt}`}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio:
                    photo.orientation === "landscape" ? "4 / 3.4" : "3 / 4.1",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 48vw, (max-width: 1280px) 32vw, 24vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                {/* hover overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#3B1F2A]/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-2 rounded-xl border border-white/0 transition-all duration-500 group-hover:border-white/45"
                  aria-hidden="true"
                />
                <span className="absolute bottom-3 right-4 translate-y-2 font-tajawal text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </span>
                <span
                  className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <Expand className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`صورة ${openIndex + 1} من ${PHOTOS.length}`}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            style={{ background: "rgba(23, 15, 22, 0.88)", backdropFilter: "blur(14px)" }}
            onClick={close}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (dx < -48) next();
              else if (dx > 48) prev();
              touchX.current = null;
            }}
          >
            {/* close */}
            <button
              onClick={close}
              className="absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF70]/50 bg-white/10 text-white transition-colors hover:bg-white/25 md:left-6 md:top-6"
              aria-label="إغلاق العرض"
              autoFocus
            >
              <X className="h-5 w-5" />
            </button>

            {/* counter */}
            <div className="absolute right-5 top-6 z-10 rounded-full border border-[#D4AF70]/40 bg-white/10 px-4 py-1.5 font-tajawal text-sm font-semibold text-white md:right-8">
              {openIndex + 1} / {PHOTOS.length}
            </div>

            {/* prev / next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF70]/50 bg-white/10 text-white transition-all hover:bg-white/25 md:right-6"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF70]/50 bg-white/10 text-white transition-all hover:bg-white/25 md:left-6"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* image */}
            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.55, ease }}
              className="relative max-h-full w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative mx-auto overflow-hidden rounded-2xl border border-[#D4AF70]/35 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8)]"
                style={{
                  aspectRatio:
                    PHOTOS[openIndex].orientation === "landscape"
                      ? "16 / 10"
                      : "3 / 4",
                  maxHeight: "78vh",
                  maxWidth: PHOTOS[openIndex].orientation === "landscape" ? "90vw" : "min(78vh * 0.75, 90vw)",
                  width: "auto",
                  height: "78vh",
                }}
              >
                <Image
                  src={PHOTOS[openIndex].src}
                  alt={PHOTOS[openIndex].alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 768px"
                  className="object-cover"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-3 rounded-xl border border-white/25"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 text-center font-tajawal text-sm text-white/85 md:text-base">
                {PHOTOS[openIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
