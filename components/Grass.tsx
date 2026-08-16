"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function Grass() {
  const blades = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        left: Math.random() * 100,
        bottom: Math.random() * 46,
        height: 10 + Math.random() * 20,
        rotate: Math.random() * 16 - 8,
        duration: 3 + Math.random() * 3,
        opacity: 0.35 + Math.random() * 0.35,
      })),
    []
  );

  return (
    <>
      {blades.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-t-sm origin-bottom"
          style={{
            left: `${b.left}%`,
            bottom: `${b.bottom}%`,
            width: 2,
            height: b.height,
            background: "linear-gradient(180deg, #8FC46B 0%, #5C8F4A 100%)",
            opacity: b.opacity,
          }}
          animate={{ rotate: [b.rotate, b.rotate + 7, b.rotate] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}