"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, WEDDING } from "@/lib/wedding-data";

/**
 * Minimal floating navigation — transparent over the hero,
 * frosted cream once scrolled. Full-screen luxury drawer on mobile.
 */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: rect.top };
      });
      const current = offsets.reduce(
        (acc, cur) => (cur.top <= 140 && cur.top > -600 ? cur : acc),
        offsets[0]
      );
      if (current) setActive(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        open ? 250 : 0
      );
    }
  };

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[110] focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:text-sm focus:text-[#3B1F2A] focus:shadow-lg"
      >
        تخطَّ إلى المحتوى
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-3 md:px-6 md:pt-4"
      >
        <nav
          aria-label="التنقل الرئيسي"
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-700 md:px-6 ${
            scrolled
              ? "border-[#D4AF70]/45 bg-[#FFF8F3]/88 shadow-[0_14px_40px_-16px_rgba(139,73,98,0.45)] backdrop-blur-xl"
              : "border-white/25 bg-white/10 backdrop-blur-md"
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => goTo("home")}
            className="group flex items-center gap-2.5"
            aria-label="العودة إلى البداية"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF70]/60 bg-gradient-to-br from-[#F8D8E4] to-[#F4A6C1] text-[#8B4962] shadow-inner">
              ♥
            </span>
            <span
              className={`font-display text-lg font-bold transition-colors ${
                scrolled ? "text-[#3B1F2A]" : "text-white drop-shadow-[0_2px_8px_rgba(59,31,42,0.6)]"
              }`}
            >
              {WEDDING.combinedArabic}
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => goTo(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors duration-300 xl:px-4 ${
                    active === item.id
                      ? "text-[#8B4962]"
                      : scrolled
                        ? "text-[#3B1F2A]/80 hover:text-[#8B4962]"
                        : "text-white/90 hover:text-white drop-shadow-[0_1px_6px_rgba(59,31,42,0.55)]"
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-l from-[#B3924F] via-[#D4AF70] to-[#B3924F]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF70]/50 bg-white/20 text-[#3B1F2A] backdrop-blur-sm lg:hidden"
            aria-label="فتح القائمة"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile luxury drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="fixed inset-0 z-[95] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="absolute inset-0 bg-[#211820]/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="قائمة التنقل"
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, #FFF8F3 0%, #F8D8E4 70%, #F4A6C1 100%)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-[#D4AF70]/30 px-6 py-5">
                <span className="font-display text-xl font-bold text-[#3B1F2A]">
                  {WEDDING.combinedArabic}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF70]/50 text-[#8B4962]"
                  aria-label="إغلاق القائمة"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => goTo(item.id)}
                      className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 text-right text-lg font-semibold transition-colors ${
                        active === item.id
                          ? "bg-white/70 text-[#8B4962] shadow-[inset_0_0_0_1px_rgba(212,175,112,0.5)]"
                          : "text-[#3B1F2A]/85 hover:bg-white/45"
                      }`}
                    >
                      {item.label}
                      <span className="font-english text-[10px] tracking-[0.3em] text-[#D4AF70]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="border-t border-[#D4AF70]/30 px-6 py-5 text-center">
                <p className="font-english text-[10px] tracking-[0.45em] text-[#8B4962]/70">
                  {WEDDING.englishDate}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
