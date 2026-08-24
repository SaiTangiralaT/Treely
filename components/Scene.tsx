"use client";

import { useState } from "react";
import { Tree } from "./Tree";
import { Sky } from "./Sky";
import { Grass } from "./Grass";

type TreeSpot = { xPct: number; bottomPct: number; scale: number };

const MIN_GAP_PCT = 4; // minimum horizontal gap between trees at similar depth

export function Scene() {
  const [trees, setTrees] = useState<TreeSpot[]>([]);

  function addTree() {
    let spot: TreeSpot | null = null;
    let attempts = 0;

    while (!spot && attempts < 15) {
      attempts++;
      const candidate: TreeSpot = {
        xPct: 4 + Math.random() * 92,
        bottomPct: Math.random() * 40, // extended range = more depth
        scale: 0.55 + Math.random() * 0.6,
      };

      const tooClose = trees.some((t) => {
        const depthCloseness = Math.abs(t.bottomPct - candidate.bottomPct);
        const horizontalGap = Math.abs(t.xPct - candidate.xPct);
        // only worry about overlap if they're roughly the same depth
        return depthCloseness < 6 && horizontalGap < MIN_GAP_PCT;
      });

      if (!tooClose) spot = candidate;
    }

    // if we couldn't find a clear spot after 15 tries, just place it anyway
    if (!spot) {
      spot = {
        xPct: 4 + Math.random() * 92,
        bottomPct: Math.random() * 40,
        scale: 0.55 + Math.random() * 0.6,
      };
    }

    setTrees((prev) => [...prev, spot as TreeSpot]);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0f1a24]">
      <div
        className="relative w-full max-w-[1400px] max-h-screen overflow-hidden"
        style={{
          aspectRatio: "20 / 9",
          background:
            "linear-gradient(180deg, #4A6B8A 0%, #6B8FAD 22%, #9CB8C9 42%, #C9D9CE 52%)",
        }}
      >
        <Sky />

        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "54%",
            background:
              "linear-gradient(180deg, #7FAE6F 0%, #649559 28%, #4E7E51 60%, #3E6C44 100%)",
            clipPath: "polygon(0 10%, 100% 4%, 100% 100%, 0% 100%)",
          }}
        />

        <Grass />

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