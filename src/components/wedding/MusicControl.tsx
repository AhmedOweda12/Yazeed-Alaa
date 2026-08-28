"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

/**
 * Minimal floating music control (bottom-left).
 * No audio file was uploaded, so we generate a soft romantic
 * ambient piece with the Web Audio API: warm pads + gentle
 * music-box plucks in a pentatonic scale. Autoplay is disabled —
 * the user decides.
 */

type Voice = {
  osc: OscillatorNode;
  gain: GainNode;
};

export function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number>(0);
  const stopRef = useRef<(() => void) | null>(null);

  // chord progression (semitone offsets from A3 = 220Hz): Am – F – C – G feel
  const CHORDS: number[][] = [
    [220.0, 261.63, 329.63], // A minor
    [174.61, 220.0, 261.63], // F major
    [196.0, 261.63, 329.63], // C(ish)
    [196.0, 246.94, 293.66], // G major
  ];
  const PLUCK_SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C5 pentatonic-ish

  const buildGraph = useCallback(() => {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;

    const ctx = new Ctx();

    // master gain (fade in/out)
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // gentle reverb
    const convolver = ctx.createConvolver();
    const seconds = 2.8;
    const rate = ctx.sampleRate;
    const impulse = ctx.createBuffer(2, rate * seconds, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.6);
      }
    }
    convolver.buffer = impulse;

    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    convolver.connect(wet);
    wet.connect(master);

    // warm lowpass bus
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 1800;
    lowpass.Q.value = 0.4;
    lowpass.connect(master);
    lowpass.connect(convolver);

    return { ctx, master, bus: lowpass };
  }, []);

  const busRef = useRef<AudioNode | null>(null);

  const pluck = useCallback((freq: number, when: number, vol: number) => {
    const ctx = ctxRef.current;
    const bus = busRef.current;
    if (!ctx || !bus) return;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 2.4);
    osc.connect(g);
    g.connect(bus);
    osc.start(when);
    osc.stop(when + 2.6);
  }, []);

  const startInternal = useCallback(async () => {
    if (ctxRef.current) {
      ctxRef.current.resume().catch(() => {});
      const t = ctxRef.current.currentTime;
      if (masterRef.current) {
        masterRef.current.gain.cancelScheduledValues(t);
        masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, t);
        masterRef.current.gain.linearRampToValueAtTime(0.5, t + 1.8);
      }
      setPlaying(true);
      return;
    }

    const graph = buildGraph();
    if (!graph) return;
    const { ctx, master, bus } = graph;
    ctxRef.current = ctx;
    masterRef.current = master;
    busRef.current = bus;

    // resume is best-effort: browsers only allow it after a real user
    // gesture, which is exactly when this handler runs.
    ctx.resume().catch(() => {});
    const t0 = ctx.currentTime + 0.1;
    master.gain.linearRampToValueAtTime(0.5, t0 + 2.2);

    // ── pad voices with slow chord changes ──
    const voices: Voice[] = [];
    let chordIndex = 0;

    const playChord = (when: number) => {
      const chord = CHORDS[chordIndex % CHORDS.length];
      chordIndex++;
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "triangle" : "sine";
        osc.frequency.value = freq;
        osc.detune.value = (Math.random() - 0.5) * 7;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, when);
        g.gain.exponentialRampToValueAtTime(0.05 + 0.012 * i, when + 2.6);
        g.gain.exponentialRampToValueAtTime(0.028, when + 7.4);
        g.gain.exponentialRampToValueAtTime(0.0001, when + 8.6);
        osc.connect(g);
        g.connect(bus);
        osc.start(when);
        osc.stop(when + 9);
      });
    };

    // schedule first chord immediately then every 8 seconds
    playChord(t0);
    const padTimer = window.setInterval(() => {
      if (ctxRef.current) playChord(ctxRef.current.currentTime + 0.05);
    }, 8000);

    // ── sparse music-box plucks ──
    const pluckTimer = window.setInterval(() => {
      if (!ctxRef.current || Math.random() < 0.28) return;
      const now = ctxRef.current.currentTime;
      const note =
        PLUCK_SCALE[Math.floor(Math.random() * PLUCK_SCALE.length)];
      pluck(note, now + 0.05, 0.045 + Math.random() * 0.03);
      if (Math.random() < 0.3) {
        pluck(
          PLUCK_SCALE[Math.floor(Math.random() * PLUCK_SCALE.length)],
          now + 0.45,
          0.03
        );
      }
    }, 2100);

    stopRef.current = () => {
      window.clearInterval(padTimer);
      window.clearInterval(pluckTimer);
    };

    setPlaying(true);
  }, [buildGraph, pluck]);

  const start = useCallback(() => {
    void startInternal();
  }, [startInternal]);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    setPlaying(false);
    stopRef.current?.();
    stopRef.current = null;
    ctxRef.current = null;
    masterRef.current = null;
    busRef.current = null;
    if (ctx && master) {
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + 1.1);
    }
    if (ctx) {
      window.setTimeout(() => ctx.close().catch(() => {}), 1300);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopRef.current?.();
      ctxRef.current?.close();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 1 }}
      className="fixed bottom-24 left-4 z-[85] md:bottom-7 md:left-7"
    >
      <button
        onClick={() => (playing ? stop() : start())}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full border border-[#D4AF70]/60 bg-[#FFF8F3]/85 text-[#8B4962] shadow-[0_14px_36px_-12px_rgba(59,31,42,0.5)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_44px_-12px_rgba(212,175,112,0.6)] focus-visible:outline-2 focus-visible:outline-[#D4AF70]"
        style={{ height: 52, width: 52 }}
        aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
        aria-pressed={playing}
      >
        {/* pulsing ring when playing */}
        <AnimatePresence>
          {playing && (
            <motion.span
              key="ring"
              className="absolute inset-0 rounded-full border border-[#D4AF70]/70"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.9, 0], scale: [1, 1.55] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={playing ? "on" : "off"}
            initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35 }}
            className="flex items-center justify-center"
          >
            {playing ? (
              <Music className="h-5 w-5" strokeWidth={1.6} />
            ) : (
              <VolumeX className="h-5 w-5" strokeWidth={1.6} />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
