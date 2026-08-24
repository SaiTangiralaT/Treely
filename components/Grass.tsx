"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Blade = {
  type: "thin" | "tuft";
  left: number;
  bottom: number;
  height: number;
  rotate: number;
  duration: number;
  opacity: number;
};

export function Grass() {
  const [blades, setBlades] = useState<Blade[]>([]);

  useEffect(() => {
    const thinBlades: Blade[] = Array.from({ length: 110 }, () => ({
      type: "thin",
      left: Math.random() * 100,
      bottom: Math.random() * 46,
      height: 10 + Math.random() * 20,
      rotate: Math.random() * 16 - 8,
      duration: 3 + Math.random() * 3,
      opacity: 0.35 + Math.random() * 0.35,
    }));

    const tufts: Blade[] = Array.from({ length: 60 }, () => ({
      type: "tuft",
      left: Math.random() * 100,
      bottom: Math.random() * 46,
      height: 4 + Math.random() * 5, // noticeably shorter
      rotate: Math.random() * 10 - 5,
      duration: 4 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.3,
    }));

    setBlades([...thinBlades, ...tufts]);
  }, []);

  return (
    <>
      {blades.map((b, i) =>
        b.type === "thin" ? (
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
        ) : (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-full origin-bottom"
            style={{
              left: `${b.left}%`,
              bottom: `${b.bottom}%`,
              width: b.height * 1.6,
              height: b.height,
              background: "radial-gradient(ellipse at 50% 100%, #6FA34F 0%, #4C7A3E 80%)",
              opacity: b.opacity,
            }}
            animate={{ rotate: [b.rotate, b.rotate + 5, b.rotate] }}
            transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        )
      )}
    </>
  );
}