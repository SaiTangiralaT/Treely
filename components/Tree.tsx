"use client";

import { motion } from "framer-motion";

export function Tree({
  xPct,
  bottomPct,
  scale,
}: {
  xPct: number;
  bottomPct: number;
  scale: number;
}) {
  // depth 0 = front/close, depth 1 = back/far
  const depth = Math.min(bottomPct / 30, 1);

  // atmospheric perspective: far trees fade toward the misty sky color
  const canopyColor = mixColor("#1F4530", "#B9C9AE", depth * 0.65);
  const trunkColor = mixColor("#3A2A1C", "#8A9482", depth * 0.65);

  return (
    <motion.div
      className="absolute origin-bottom"
      style={{
        left: `${xPct}%`,
        bottom: `${bottomPct}%`,
        width: 40 * scale,
        height: 130 * scale,
        translateX: "-50%",
        filter: `blur(${depth * 1.2}px) drop-shadow(0 4px 3px rgba(20,40,20,${0.25 - depth * 0.15}))`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 - depth * 0.15 }}
      transition={{ type: "spring", stiffness: 60, damping: 12 }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 4.5 + depth * 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 96%" }}
      >
        <svg viewBox="0 0 40 130" className="w-full h-full overflow-visible">
          <rect x="17" y="112" width="6" height="18" fill={trunkColor} />
          <polygon points="20,0 4,42 12,42 0,80 10,80 -3,118 43,118 30,80 40,80 28,42 36,42" fill={canopyColor} />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// blends two hex colors together; t=0 returns colorA, t=1 returns colorB
function mixColor(colorA: string, colorB: string, t: number): string {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r},${g},${bl})`;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}