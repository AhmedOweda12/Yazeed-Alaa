"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import {
  computeTimeLeft,
  isWeddingDay,
  type TimeLeft,
} from "@/lib/countdown";
import { COUNTDOWN_LABELS } from "@/lib/wedding-data";

/**
 * ─────────────────────────────────────────────────────────────
 *  THE ALWAYS-VISIBLE CHIC COUNTDOWN DOCK
 *  A floating glass pill pinned to the bottom of the viewport
 *  showing days / hours / minutes / seconds until the wedding.
 *  Swaps to a celebration state once the big day arrives.
 * ─────────────────────────────────────────────────────────────
 */

const UNITS = [
  { key: "days" as const, label: COUNTDOWN_LABELS.days },
  { key: "hours" as const, label: COUNTDOWN_LABELS.hours },
  { key: "minutes" as const, label: COUNTDOWN_LABELS.minutes },
  { key: "seconds" as const, label: COUNTDOWN_LABELS.seconds },
];

function Digit({ value }: { value: number }) {
  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function PersistentCountdown() {
  const [left, setLeft] = useState<TimeLeft | null>(null);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const tick = () => {
      const next = computeTimeLeft();
      setLeft(next);
      setCelebrate(isWeddingDay(next));
    };
    const raf = requestAnimationFrame(tick);
    const id = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 bottom-3 z-[88] flex justify-center px-3 md:bottom-5"
      aria-hidden={false}
    >
      {celebrate ? (
        <div
          className="glass-pink pulse-glow pointer-events-auto flex items-center gap-2.5 rounded-full px-5 py-2.5 md:px-7 md:py-3"
          role="status"
        >
          <Heart
            className="h-4 w-4 fill-[#D88BA8] text-[#D88BA8]"
            aria-hidden="true"
          />
          <span className="font-display text-sm font-bold text-[#3B1F2A] md:text-lg">
            اليوم هو يومنا الكبير ❤️
          </span>
          <Heart
            className="h-4 w-4 fill-[#D88BA8] text-[#D88BA8]"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className="glass-pink pointer-events-auto flex items-center gap-2.5 rounded-full px-4 py-2 md:gap-4 md:px-6 md:py-2.5"
          role="timer"
          aria-label="الوقت المتبقي لحفل الزفاف"
        >
          {/* label */}
          <div className="hidden items-center gap-1.5 sm:flex">
            <Heart
              className="h-3.5 w-3.5 fill-[#D88BA8] text-[#D88BA8]"
              aria-hidden="true"
            />
            <span className="font-tajawal text-xs font-bold text-[#8B4962] md:text-sm">
              باقي على الفرح
            </span>
          </div>
          <span
            className="hidden h-5 w-px bg-[#D4AF70]/50 sm:block"
            aria-hidden="true"
          />

          {/* units — RTL: days appear rightmost */}
          <div className="flex items-center gap-1.5 md:gap-3" dir="rtl">
            {UNITS.map((u, i) => (
              <span key={u.key} className="flex items-center gap-1.5 md:gap-3">
                <span className="flex flex-col items-center leading-none">
                  <span className="font-display text-base font-bold text-[#3B1F2A] md:text-2xl">
                    <Digit value={left ? left[u.key] : 0} />
                  </span>
                  <span className="mt-0.5 font-tajawal text-[8.5px] font-semibold text-[#8B4962] md:text-[10px]">
                    {u.label}
                  </span>
                </span>
                {i < UNITS.length - 1 && (
                  <span
                    className="mb-3 h-1 w-1 rounded-full bg-[#D4AF70]"
                    aria-hidden="true"
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
