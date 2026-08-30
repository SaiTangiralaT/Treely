"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Woodcutter({
  xPct,
  chopping,
}: {
  xPct: number;
  chopping: boolean;
}) {
  const armControls = useAnimationControls();
  const prevChopping = useRef(false);
  const [isWalking, setIsWalking] = useState(false);
  const prevXRef = useRef(xPct);

  useEffect(() => {
    if (xPct !== prevXRef.current) {
      setIsWalking(true);
      prevXRef.current = xPct;
    }
  }, [xPct]);

  useEffect(() => {
    if (chopping && !prevChopping.current) {
      armControls.start({
        y: [0, -14, 6, -14, 6, 0],
        rotate: [0, -4, 6, -4, 6, 0],
        transition: {
          duration: 1.8,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
      });
    } else if (!chopping) {
      armControls.start({ y: 0, rotate: 0, transition: { duration: 0.4 } });
    }
    prevChopping.current = chopping;
  }, [chopping, armControls]);

  return (
    <motion.div
      className="absolute bottom-[2%] z-[900]"
      style={{ width: 44, height: 80, transform: "translateX(-50%)" }}
      initial={{ left: `${xPct}%` }}
      animate={{ left: `${xPct}%` }}
      transition={{ type: "tween", duration: 3.5, ease: "linear" }}
      onAnimationComplete={() => setIsWalking(false)}
    >
      <motion.div
        animate={
          chopping
            ? {}
            : isWalking
            ? { y: [0, -2, 0, -2, 0] }
            : { y: [0, -1.5, 0] }
        }
        transition={
          chopping
            ? undefined
            : isWalking
            ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <svg viewBox="0 0 44 80" className="w-full h-full overflow-visible">
          <ellipse cx="22" cy="76" rx="13" ry="3" fill="rgba(20,30,15,0.16)" />

          {/* legs — swing alternately while walking, freeze mid-chop */}
          <motion.path
            d="M12 74 L10 50 L20 50 L20 74 Z"
            fill="#3E2F22"
            style={{ transformOrigin: "15px 50px" }}
            animate={isWalking && !chopping ? { rotate: [-16, 16, -16] } : { rotate: 0 }}
            transition={isWalking && !chopping ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" } : {}}
          />
          <motion.path
            d="M32 74 L34 50 L24 50 L24 74 Z"
            fill="#3E2F22"
            style={{ transformOrigin: "29px 50px" }}
            animate={isWalking && !chopping ? { rotate: [16, -16, 16] } : { rotate: 0 }}
            transition={isWalking && !chopping ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" } : {}}
          />

          <rect x="8" y="28" width="27" height="25" rx="4" fill="#6B8F5A" />
          <rect x="8" y="28" width="27" height="7" fill="#57764A" />

          <rect x="7" y="29" width="6" height="10" rx="3" fill="#E8C9A0" />
          <rect x="31" y="29" width="6" height="10" rx="3" fill="#E8C9A0" />

          {/* head with face */}
          <circle cx="22" cy="17" r="10.5" fill="#E8C9A0" />
          {/* eyes */}
          <circle cx="18" cy="16" r="1.3" fill="#3F2B0E" />
          <circle cx="26" cy="16" r="1.3" fill="#3F2B0E" />
          {/* eyebrows */}
          <path d="M15.5 12.5 Q18 11 20.5 12.5" fill="none" stroke="#7A5335" strokeWidth="1" strokeLinecap="round" />
          <path d="M23.5 12.5 Q26 11 28.5 12.5" fill="none" stroke="#7A5335" strokeWidth="1" strokeLinecap="round" />
          {/* nose */}
          <path d="M22 17 L21 21 L23 21 Z" fill="#D9B98A" />

          <path d="M11 14 Q22 -2 33 14 L33 11 Q22 4 11 11 Z" fill="#8B5E34" />
          <path d="M9 10 Q22 -4 35 10 L35 7 Q22 -6 9 7 Z" fill="#A9743F" />
          {/* mouth/beard bottom, visible below nose */}
          <path d="M18 22 Q22 26 26 22 Q22 25 18 22 Z" fill="#7A5335" />

          <rect x="15" y="23" width="14" height="3" rx="1.4" fill="#7A5335" />

          <motion.g animate={armControls} style={{ transformOrigin: "22px 40px" }}>
            <path d="M13 32 L18 48 L26 48 L31 32 Z" fill="#E8C9A0" />
            <rect x="16" y="46" width="12" height="8" rx="3" fill="#E8C9A0" />
            <rect x="20" y="52" width="4" height="18" rx="1.5" fill="#7A5335" />
            <path d="M14 68 L20 62 L28 62 L24 68 Z" fill="#9AA5AC" />
            <path d="M14 74 L20 68 L28 68 L24 74 Z" fill="#8B969D" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
}