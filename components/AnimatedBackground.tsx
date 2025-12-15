"use client";

import { useEffect, useMemo, useRef } from "react";

type Floater = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rot: number;
  rotSpeed: number;
  opacity: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const floaters = useMemo(() => {
    const arr: Floater[] = [];
    for (let i = 0; i < 16; i++) {
      arr.push({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        size: 80 + Math.random() * 220,
        speed: 0.25 + Math.random() * 0.9,
        drift: (Math.random() - 0.5) * 0.6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        opacity: 0.06 + Math.random() * 0.1,
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawSilhouette = (x: number, y: number, s: number, r: number, a: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(r);
      ctx.globalAlpha = a;

      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, s * 0.7);
      grad.addColorStop(0, "rgba(185,133,255,0.9)");
      grad.addColorStop(1, "rgba(40,10,70,0)");

      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(-s * 0.35, -s * 0.05);
      ctx.bezierCurveTo(-s * 0.45, -s * 0.35, -s * 0.1, -s * 0.55, 0, -s * 0.4);
      ctx.bezierCurveTo(s * 0.15, -s * 0.65, s * 0.55, -s * 0.3, s * 0.32, -s * 0.02);
      ctx.bezierCurveTo(s * 0.6, s * 0.1, s * 0.15, s * 0.55, -s * 0.1, s * 0.35);
      ctx.bezierCurveTo(-s * 0.55, s * 0.55, -s * 0.55, s * 0.1, -s * 0.35, -s * 0.05);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#2a0d45");
      bg.addColorStop(0.5, "#12061f");
      bg.addColorStop(1, "#2a0d45");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const vign = ctx.createRadialGradient(w * 0.2, h * 0.1, 40, w * 0.5, h * 0.5, Math.max(w, h));
      vign.addColorStop(0, "rgba(139,92,246,0.10)");
      vign.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, w, h);

      for (const f of floaters) {
        f.y += f.speed;
        f.x += f.drift;
        f.rot += f.rotSpeed;

        if (f.y - f.size > h + 50) f.y = -f.size - 50;
        if (f.x < -200) f.x = w + 200;
        if (f.x > w + 200) f.x = -200;

        drawSilhouette(f.x, f.y, f.size, f.rot, f.opacity);
      }

      raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [floaters]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      {/* Soft overlay (noise-like) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0 1px, transparent 1px 100%)",
          backgroundSize: "24px 24px",
        }}
      />
    </>
  );
}
