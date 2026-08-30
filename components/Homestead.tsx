"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Pose = "book" | "mug" | "plant";

export function Homestead({ xPct }: { xPct: number }) {
  const [pose, setPose] = useState<Pose>("book");

  useEffect(() => {
    const poses: Pose[] = ["book", "mug", "plant"];
    let cancelled = false;
    async function cycle() {
      while (!cancelled) {
        await new Promise((res) => setTimeout(res, 9000 + Math.random() * 6000));
        if (cancelled) return;
        setPose(poses[Math.floor(Math.random() * poses.length)]);
      }
    }
    cycle();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="absolute bottom-[4%] z-[1100]"
      style={{ left: `${xPct}%`, width: 210, height: 170, transform: "translateX(-50%)" }}
    >
      <svg viewBox="0 0 210 170" className="w-full h-full overflow-visible">
        <ellipse cx="105" cy="164" rx="85" ry="6" fill="rgba(20,30,15,0.12)" />

        {/* hut body */}
        <rect x="10" y="80" width="95" height="75" fill="#8B6A4A" />
        <rect x="10" y="80" width="95" height="9" fill="#7A5B3E" />
        <polygon points="0,80 57,40 114,80" fill="#6B4A32" />
        <polygon points="0,80 57,40 57,47 8,80" fill="#7C5A3C" />

        {/* chimney with looping smoke */}
        <rect x="66" y="48" width="11" height="20" fill="#5B4636" />
        <motion.circle
          cx="72"
          cy="42"
          r="3.5"
          fill="rgba(230,230,225,0.6)"
          animate={{ y: [0, -22], scale: [1, 1.6], opacity: [0.55, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeIn" }}
        />

        {/* door */}
        <rect x="40" y="108" width="28" height="47" rx="2" fill="#5B4030" />
        <circle cx="62" cy="132" r="1.8" fill="#2E2118" />

        {/* window */}
        <rect x="18" y="95" width="18" height="16" rx="1" fill="#CDE3E8" />
        <rect x="18" y="95" width="18" height="16" rx="1" fill="none" stroke="#5B4030" strokeWidth="1.8" />
        <line x1="27" y1="95" x2="27" y2="111" stroke="#5B4030" strokeWidth="1.3" />
        <line x1="18" y1="103" x2="36" y2="103" stroke="#5B4030" strokeWidth="1.3" />

        {/* desk, beside the hut */}
        <g transform="translate(112, 108)">
          <rect x="0" y="42" width="54" height="4" fill="#7A5B3E" />
          <rect x="4" y="46" width="4" height="18" fill="#6B4A32" />
          <rect x="46" y="46" width="4" height="18" fill="#6B4A32" />

          {/* item on desk, swapped based on pose */}
          <AnimatePresence mode="wait">
            {pose === "book" && (
              <motion.g key="book" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
                <rect x="10" y="35" width="18" height="7" rx="1" fill="#C4552E" />
                <line x1="19" y1="35" x2="19" y2="42" stroke="#8B3A1E" strokeWidth="1" />
              </motion.g>
            )}
            {pose === "mug" && (
              <motion.g key="mug" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
                <rect x="32" y="34" width="7" height="8" rx="1.5" fill="#E8A33D" />
                <path d="M39 36 q4 1 0 4.5" fill="none" stroke="#E8A33D" strokeWidth="1.4" />
              </motion.g>
            )}
            {pose === "plant" && (
              <motion.g key="plant" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
                <rect x="36" y="31" width="9" height="11" rx="1" fill="#B5764A" />
                <path
                  d="M40.5 31 q-5 -9 -9 -5 M40.5 31 q5 -9 9 -5 M40.5 31 q0 -11 0 -7"
                  fill="none"
                  stroke="#4E7E51"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* grandpa, sitting */}
          <path d="M12 37 L12 46 L20 46 L20 39 Z" fill="#4A5A6B" />
          <path d="M30 37 L30 46 L38 46 L38 39 Z" fill="#4A5A6B" />
          <rect x="10" y="44" width="12" height="4" rx="1.5" fill="#3E2F22" />
          <rect x="28" y="44" width="12" height="4" rx="1.5" fill="#3E2F22" />

          <path d="M8 36 Q8 16 25 16 Q42 16 42 36 L42 40 Q25 44 8 40 Z" fill="#7A93A8" />
          <path d="M20 18 L25 26 L30 18" fill="none" stroke="#5F7B90" strokeWidth="1.6" strokeLinecap="round" />

          <rect x="9" y="30" width="6" height="11" rx="3" fill="#7A93A8" />
          <rect x="35" y="30" width="6" height="11" rx="3" fill="#7A93A8" />
          <circle cx="22" cy="39" r="3" fill="#E8C9A0" />
          <circle cx="28" cy="39" r="3" fill="#E8C9A0" />

          <circle cx="25" cy="9" r="9" fill="#E8C9A0" />

          <path d="M15 8 Q14 15 17 17 Q15 12 16 7 Z" fill="#E3E3E3" />
          <path d="M35 8 Q36 15 33 17 Q35 12 34 7 Z" fill="#E3E3E3" />
          <path d="M16 4 Q25 -2 34 4 Q34 1 25 -0.5 Q16 1 16 4 Z" fill="#D8D8D8" />

          <circle cx="21.5" cy="9" r="2.6" fill="none" stroke="#5B4636" strokeWidth="1" />
          <circle cx="28.5" cy="9" r="2.6" fill="none" stroke="#5B4636" strokeWidth="1" />
          <line x1="24" y1="9" x2="26" y2="9" stroke="#5B4636" strokeWidth="1" />

          <path d="M20 8.5 Q21.5 7.3 23 8.5" fill="none" stroke="#3F2B0E" strokeWidth="1" strokeLinecap="round" />
          <path d="M27 8.5 Q28.5 7.3 30 8.5" fill="none" stroke="#3F2B0E" strokeWidth="1" strokeLinecap="round" />

          <circle cx="19" cy="12" r="1.8" fill="#E8A9A0" opacity="0.5" />
          <circle cx="31" cy="12" r="1.8" fill="#E8A9A0" opacity="0.5" />

          <path d="M21 12.5 Q25 11 29 12.5" fill="none" stroke="#D8D8D8" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M21.5 14 Q25 17 28.5 14" fill="none" stroke="#B5764A" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}