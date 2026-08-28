"use client";

import { useEffect, useRef } from "react";

type ParticleKind = "gold" | "petal" | "bokeh";

type Particle = {
  kind: ParticleKind;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  sway: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  hue: number;
};

type ParticlesProps = {
  /** average particles on screen (desktop) */
  density?: number;
  kinds?: ParticleKind[];
  className?: string;
  /** reduce count on small screens automatically */
  adaptive?: boolean;
  ariaHidden?: boolean;
};

/**
 * Luxury cinematic particle field:
 * gold dust sparkles, soft bokeh orbs and drifting rose petals.
 * GPU-light canvas implementation with DPR capping.
 */
export function Particles({
  density = 35,
  kinds = ["gold", "petal", "bokeh"],
  className = "",
  adaptive = true,
  ariaHidden = true,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let particles: Particle[] = [];
    let running = true;

    const spawn = (initial: boolean): Particle => {
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      const base = {
        kind,
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 30,
        sway: 8 + Math.random() * 22,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        opacity: 0.25 + Math.random() * 0.55,
        hue: Math.random(),
      };
      if (kind === "gold") {
        return {
          ...base,
          size: 0.8 + Math.random() * 2.2,
          speedY: -(6 + Math.random() * 14),
          speedX: (Math.random() - 0.5) * 6,
        };
      }
      if (kind === "petal") {
        return {
          ...base,
          size: 5 + Math.random() * 8,
          speedY: -(8 + Math.random() * 16),
          speedX: (Math.random() - 0.5) * 10,
          opacity: 0.18 + Math.random() * 0.3,
        };
      }
      return {
        ...base,
        size: 14 + Math.random() * 34,
        speedY: -(3 + Math.random() * 7),
        speedX: (Math.random() - 0.5) * 5,
        opacity: 0.05 + Math.random() * 0.1,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isSmall = width < 768;
      const factor = adaptive && isSmall ? 0.45 : 1;
      const target = Math.round(density * factor);
      particles = Array.from({ length: target }, () => spawn(true));
    };

    let t = 0;
    const draw = () => {
      if (!running) return;
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.swayPhase += 0.01;
        const swayX = Math.sin(p.swayPhase) * p.sway * 0.4;
        p.x += (p.speedX + swayX) * 0.35;
        p.y += p.speedY * 0.35;
        p.rotation += p.rotationSpeed;

        // gentle twinkle for gold
        const twinkle =
          p.kind === "gold" ? 0.65 + 0.35 * Math.sin(t * 3 + p.swayPhase * 4) : 1;
        const alpha = p.opacity * twinkle;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.translate(p.x, p.y);

        if (p.kind === "gold") {
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3.2);
          g.addColorStop(0, "rgba(244, 224, 170, 0.95)");
          g.addColorStop(0.45, "rgba(212, 175, 112, 0.55)");
          g.addColorStop(1, "rgba(212, 175, 112, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === "petal") {
          ctx.rotate(p.rotation + Math.sin(p.swayPhase) * 0.6);
          const petal = p.hue > 0.5 ? "244, 166, 193" : "216, 139, 168";
          const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
          grad.addColorStop(0, `rgba(${petal}, 0.9)`);
          grad.addColorStop(1, `rgba(248, 216, 228, 0.65)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.62, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const bokeh = p.hue > 0.35 ? "244, 166, 193" : "232, 207, 154";
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          g.addColorStop(0, `rgba(${bokeh}, 0.55)`);
          g.addColorStop(0.7, `rgba(${bokeh}, 0.18)`);
          g.addColorStop(1, `rgba(${bokeh}, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // recycle
        if (p.y < -40 || p.x < -60 || p.x > width + 60) {
          Object.assign(p, spawn(false));
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafRef.current);
      } else if (!running) {
        running = true;
        draw();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, kinds]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden={ariaHidden}
    />
  );
}

/** Celebration burst mode — used when the countdown reaches the wedding day. */
export function CelebrationBurst({ className = "" }: { className?: string }) {
  return (
    <Particles
      density={80}
      kinds={["gold", "petal"]}
      className={className}
      adaptive
    />
  );
}
