"use client";

import { Loader } from "@/components/wedding/Loader";
import { Navigation } from "@/components/wedding/Navigation";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { PhotoBook } from "@/components/wedding/PhotoBook";
import { Venue } from "@/components/wedding/Venue";
import { Finale } from "@/components/wedding/Finale";
import { MusicControl } from "@/components/wedding/MusicControl";
import { PersistentCountdown } from "@/components/wedding/PersistentCountdown";

/**
 * Yazid & Alaa — Ultimate Wedding Experience
 * Luxury 3D Arabic (RTL) digital wedding invitation.
 * Streamlined flow: Hero → Countdown → PhotoBook (لحظات لا تُنسى) → Venue (الوكيشن:
 * date/time + both halls stacked — men first, women below) → Finale.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#FFF8F3]">
      <Loader />
      <Navigation />
      <Hero />
      <Countdown />
      <PhotoBook />
      <Venue />
      <Finale />
      <MusicControl />
      <PersistentCountdown />
    </main>
  );
}
