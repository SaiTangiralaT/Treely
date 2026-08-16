"use client";

import { useState } from "react";
import { Tree } from "./Tree";

export function Scene() {
  const [trees, setTrees] = useState<
    { xPct: number; bottomPct: number; scale: number }[]
  >([]);

  function addTree() {
    const randomX = 10 + Math.random() * 80;
    const randomBottom = Math.random() * 28;
    const randomScale = 0.65 + Math.random() * 0.55;
    setTrees((prev) => [...prev, { xPct: randomX, bottomPct: randomBottom, scale: randomScale }]);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#1c2418]">
      <div
        className="relative w-full max-w-[1400px] max-h-screen overflow-hidden"
        style={{
          aspectRatio: "20 / 9",
          background:
            "linear-gradient(180deg, #F7ECDB 0%, #F4E5CE 24%, #E7F0DC 42%, #DDEEDD 52%)",
        }}
      >
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "54%",
            background:
              "linear-gradient(180deg, #7FAE6F 0%, #649559 28%, #4E7E51 60%, #3E6C44 100%)",
            clipPath: "polygon(0 10%, 100% 4%, 100% 100%, 0% 100%)",
          }}
        />

        {trees.map((t, i) => (
          <Tree key={i} xPct={t.xPct} bottomPct={t.bottomPct} scale={t.scale} />
        ))}

        <button
          onClick={addTree}
          className="absolute top-4 left-4 z-50 bg-white/90 px-4 py-2 rounded-lg text-sm"
        >
          + Add tree (test)
        </button>
      </div>
    </div>
  );
}