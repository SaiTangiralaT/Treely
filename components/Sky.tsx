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

      <Cloud top="12%" left="6%" width={140} height={40} duration={130} />
      <Cloud top="20%" left="34%" width={100} height={32} duration={160} />
      <Cloud top="8%" left="58%" width={90} height={28} duration={110} />

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
  width,
  height,
  duration,
}: {
  top: string;
  left: string;
  width: number;
  height: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ top, left, width, height, opacity: 0.5, filter: "blur(2.5px)" }}
      animate={{ x: [0, 50, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}