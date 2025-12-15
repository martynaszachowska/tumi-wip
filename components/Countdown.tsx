"use client";

import { useEffect, useMemo, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTargetDate(): Date {
  // Prefer env; fallback to 30 days from now
  const env = process.env.NEXT_PUBLIC_LAUNCH_DATE;
  if (env) {
    const d = new Date(env);
    if (!Number.isNaN(d.getTime())) return d;
  }
  const d = new Date();
  d.setDate(d.getDate() + 150);
  return d;
}

export default function Countdown() {
  const target = useMemo(() => getTargetDate(), []);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const done = diff === 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-5 shadow-glow">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-white/70">Premiera / launch</p>
          <p className="mt-1 text-lg font-semibold">
            {done ? "Już jesteśmy!" : "Odliczanie do startu"}
          </p>
          <p className="mt-1 text-xs text-white/45">
            Ustaw datę przez <code className="text-white/70">NEXT_PUBLIC_LAUNCH_DATE</code>
          </p>
        </div>

        <div className="flex gap-2 text-center">
          <TimeBox label="Dni" value={String(days)} />
          <TimeBox label="Godz" value={pad(hours)} />
          <TimeBox label="Min" value={pad(minutes)} />
          <TimeBox label="Sek" value={pad(seconds)} />
        </div>
      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[64px] rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-xl font-bold tracking-tight">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-white/50">{label}</div>
    </div>
  );
}
