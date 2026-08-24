"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Woodcutter({
  xPct,
  facingLeft,
}: {
  xPct: number;
  facingLeft: boolean;
}) {
  const [isWalking, setIsWalking] = useState(false);
  const prevXRef = useRef(xPct);

  useEffect(() => {
    if (xPct !== prevXRef.current) {
      setIsWalking(true);
      prevXRef.current = xPct;
    }
  }, [xPct]);

  return (
    <motion.div
      className="absolute bottom-[2%] z-[900]"
      style={{
        width: 44,
        height: 80,
        translateX: "-50%",
        scaleX: facingLeft ? -1 : 1,
      }}
      initial={{ left: `${xPct}%` }}
      animate={{ left: `${xPct}%` }}
      transition={{ type: "tween", duration: 3.5, ease: "linear" }}
      onAnimationComplete={() => setIsWalking(false)}
    >
      <motion.div
        animate={isWalking ? { y: [0, -2, 0, -2, 0] } : { y: [0, -1.5, 0] }}
        transition={
          isWalking
            ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <svg viewBox="0 0 44 80" className="w-full h-full overflow-visible">
          <ellipse cx="22" cy="76" rx="13" ry="3" fill="rgba(20,30,15,0.16)" />

          {/* legs — swing alternately while walking, stay still when idle */}
          <motion.path
            d="M12 74 L10 50 L20 50 L20 74 Z"
            fill="#3E2F22"
            style={{ transformOrigin: "15px 50px" }}
            animate={isWalking ? { rotate: [-18, 18, -18] } : { rotate: 0 }}
            transition={isWalking ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" } : {}}
          />
          <motion.path
            d="M32 74 L34 50 L24 50 L24 74 Z"
            fill="#3E2F22"
            style={{ transformOrigin: "29px 50px" }}
            animate={isWalking ? { rotate: [18, -18, 18] } : { rotate: 0 }}
            transition={isWalking ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" } : {}}
          />

          <rect x="8" y="28" width="27" height="25" rx="4" fill="#6B8F5A" />
          <rect x="8" y="28" width="27" height="7" fill="#57764A" />
          <g style={{ transformOrigin: "29px 33px" }}>
            <rect x="26" y="28" width="7" height="19" rx="3" fill="#E8C9A0" />
            <g transform="translate(30,18) rotate(20)">
              <rect x="-2" y="-15" width="4" height="28" rx="2" fill="#7A5335" />
              <path d="M-3 -15 L-13 -10 L-13 -3 L-3 -6 Z" fill="#9AA5AC" />
              <path d="M3 -15 L3 -6 L13 -3 L13 -10 Z" fill="#8B969D" />
            </g>
          </g>
          <rect x="9" y="28" width="7" height="19" rx="3" fill="#E8C9A0" />
          <circle cx="22" cy="17" r="10.5" fill="#E8C9A0" />
          <path d="M11 14 Q22 -2 33 14 L33 11 Q22 4 11 11 Z" fill="#8B5E34" />
          <path d="M9 10 Q22 -4 35 10 L35 7 Q22 -6 9 7 Z" fill="#A9743F" />
          <rect x="15" y="23" width="14" height="3" rx="1.4" fill="#7A5335" />
        </svg>
      </motion.div>
    </motion.div>
  );
}