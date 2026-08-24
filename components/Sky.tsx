"use client";

import { motion } from "framer-motion";

export function Sky() {
  return (
    <>
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "10%",
          right: "16%",
          width: 110,
          height: 110,
          background:
            "radial-gradient(circle, rgba(255,214,170,0.95) 0%, rgba(255,180,140,0.7) 40%, rgba(255,150,120,0.3) 65%, rgba(255,150,120,0) 80%)",
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <Cloud top="12%" left="4%" size={70} duration={130} />
      <Cloud top="20%" left="30%" size={50} duration={160} />
      <Cloud top="7%" left="56%" size={45} duration={110} />

      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "42%",
          height: "20%",
          background:
            "linear-gradient(180deg, rgba(220,225,220,0) 0%, rgba(220,225,220,0.5) 55%, rgba(200,212,200,0.7) 100%)",
          filter: "blur(7px)",
        }}
      />
    </>
  );
}

function Cloud({
  top,
  left,
  size,
  duration,
}: {
  top: string;
  left: string;
  size: number;
  duration: number;
}) {
  // a cloud is built from several overlapping soft circles of varying size,
  // instead of one stretched oval — that's what makes it read as "fluffy"
  const puffs = [
    { dx: 0, dy: 0, r: size * 0.5 },
    { dx: size * 0.45, dy: size * 0.08, r: size * 0.38 },
    { dx: -size * 0.42, dy: size * 0.1, r: size * 0.34 },
    { dx: size * 0.18, dy: -size * 0.22, r: size * 0.32 },
    { dx: -size * 0.15, dy: -size * 0.18, r: size * 0.28 },
  ];

  return (
    <motion.div
      className="absolute"
      style={{ top, left, width: size * 2, height: size * 1.2 }}
      animate={{ x: [0, 50, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {puffs.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: p.r * 2,
            height: p.r * 2,
            left: size + p.dx - p.r,
            top: size * 0.6 + p.dy - p.r,
            opacity: 0.75,
            filter: "blur(3px)",
          }}
        />
      ))}
    </motion.div>
  );
}