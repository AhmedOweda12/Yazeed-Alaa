/** Shared countdown logic — target: 2026-09-08 21:00 Cairo (UTC+3, Tuesday) */
export const WEDDING_TARGET_MS = new Date(
  "2026-09-08T21:00:00+03:00"
).getTime();

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function computeTimeLeft(): TimeLeft {
  const diff = Math.max(0, WEDDING_TARGET_MS - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

export function isWeddingDay(t: TimeLeft): boolean {
  return t.days + t.hours + t.minutes + t.seconds === 0;
}
