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
  return (
    <motion.div
      className="absolute origin-bottom"
      style={{
        left: `${xPct}%`,
        bottom: `${bottomPct}%`,
        width: 66 * scale,
        height: 122 * scale,
        translateX: "-50%",
        filter: "drop-shadow(0 6px 4px rgba(20,40,20,0.25))",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 55, damping: 11 }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 90%" }}
      >
        <svg viewBox="0 0 66 122" className="w-full h-full overflow-visible">
          <rect x="27" y="66" width="12" height="50" rx="3" fill="#4A3524" />
          <circle cx="33" cy="44" r="36" fill="#2E5940" stroke="#1F4530" strokeWidth="1.5" />
          <circle cx="15" cy="57" r="22" fill="#2E5940" stroke="#1F4530" strokeWidth="1.5" />
          <circle cx="51" cy="57" r="22" fill="#2E5940" stroke="#1F4530" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}