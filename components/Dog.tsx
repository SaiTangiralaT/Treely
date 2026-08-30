"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Dog() {
  const [xPct, setXPct] = useState(35);
  const [bottomPct, setBottomPct] = useState(3);
  const [facingLeft, setFacingLeft] = useState(false);
  const [moving, setMoving] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function wander() {
      while (!cancelled) {
        await new Promise((res) => setTimeout(res, 6000 + Math.random() * 5000));
        if (cancelled) return;
        setXPct((prevX) => {
          const target = 8 + Math.random() * 70;
          setFacingLeft(target < prevX);
          return target;
        });
        setBottomPct(1 + Math.random() * 8);
        setMoving(true);
      }
    }
    wander();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      className="absolute w-10 h-8 z-[850]"
      style={{ scaleX: facingLeft ? -1 : 1 }}
      initial={{ left: `${xPct}%`, bottom: `${bottomPct}%` }}
      animate={{ left: `${xPct}%`, bottom: `${bottomPct}%` }}
      transition={{ type: "tween", duration: 5, ease: "linear" }}
      onAnimationComplete={() => setMoving(false)}
    >
      <motion.div
        animate={moving ? { y: [0, -1, 0] } : {}}
        transition={moving ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <svg viewBox="0 0 40 26" className="w-full h-full overflow-visible">
          {/* tail */}
          <motion.g
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "6px 10px" }}
          >
            <path d="M6 10 Q-3 8 -2 0 Q2 5 6 6 Z" fill="#B5764A" />
          </motion.g>

          {/* legs — rotate from a hip joint, diagonal-pair walking gait */}
          <motion.rect x="9" y="9" width="3.4" height="16" rx="1.6" fill="#A8703F"
            style={{ transformOrigin: "10.7px 12px" }}
            animate={moving ? { rotate: [-16, 16, -16] } : { rotate: 0 }}
            transition={moving ? { duration: 0.65, repeat: Infinity, ease: "easeInOut" } : {}} />
          <motion.rect x="27" y="9" width="3.4" height="16" rx="1.6" fill="#A8703F"
            style={{ transformOrigin: "28.7px 12px" }}
            animate={moving ? { rotate: [16, -16, 16] } : { rotate: 0 }}
            transition={moving ? { duration: 0.65, repeat: Infinity, ease: "easeInOut" } : {}} />
          <motion.rect x="14" y="9" width="3.4" height="16" rx="1.6" fill="#C08A52"
            style={{ transformOrigin: "15.7px 12px" }}
            animate={moving ? { rotate: [16, -16, 16] } : { rotate: 0 }}
            transition={moving ? { duration: 0.65, repeat: Infinity, ease: "easeInOut" } : {}} />
          <motion.rect x="21" y="9" width="3.4" height="16" rx="1.6" fill="#C08A52"
            style={{ transformOrigin: "22.7px 12px" }}
            animate={moving ? { rotate: [-16, 16, -16] } : { rotate: 0 }}
            transition={moving ? { duration: 0.65, repeat: Infinity, ease: "easeInOut" } : {}} />

          {/* body */}
          <ellipse cx="19" cy="11" rx="14" ry="7.5" fill="#D9A75E" />

          {/* patches */}
          <ellipse cx="12" cy="7" rx="4" ry="3" fill="#A8703F" opacity="0.85" />
          <ellipse cx="24" cy="15" rx="3.5" ry="2.6" fill="#A8703F" opacity="0.85" />

          {/* head */}
          <circle cx="32" cy="6" r="7.5" fill="#D9A75E" />
          <ellipse cx="38" cy="9" rx="4" ry="3.2" fill="#EAD2A8" />

          {/* ears */}
          <path d="M27 -1 L24 -8 L30 -3 Z" fill="#A8703F" />
          <path d="M35 -1 L38 -8 L32 -3 Z" fill="#A8703F" />

          {/* eye patch */}
          <ellipse cx="28" cy="3" rx="3" ry="3.4" fill="#A8703F" opacity="0.9" />

          {/* eyes, nose, mouth */}
          <circle cx="29" cy="4" r="1.1" fill="#2E2118" />
          <circle cx="35" cy="5" r="1.1" fill="#2E2118" />
          <ellipse cx="41.5" cy="9" rx="1.6" ry="1.3" fill="#3F2B0E" />
          <path d="M38 12 Q40 13.5 42 12" fill="none" stroke="#3F2B0E" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}