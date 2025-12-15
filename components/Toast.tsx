"use client";

import { useEffect, useState } from "react";

export default function Toast({ show }: { show: boolean }) {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
    if (show) {
      const t = setTimeout(() => setOpen(false), 3500);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md shadow-glow">
        <p className="text-sm font-semibold">Dziękujemy! ✨</p>
        <p className="text-xs text-white/60">Twoja wiadomość została wysłana.</p>
      </div>
    </div>
  );
}
