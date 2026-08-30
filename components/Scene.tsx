"use client";

import { useState } from "react";
import { Tree } from "./Tree";
import { Sky } from "./Sky";
import { Grass } from "./Grass";
import { Woodcutter } from "./woodcutter";
import { Homestead } from "./Homestead";
import { Dog } from "./Dog";

type TreeSpot = { xPct: number; bottomPct: number; scale: number };

const MIN_GAP_PCT = 4; // minimum horizontal gap between trees at similar depth
const HOMESTEAD_X = 88;
const HOMESTEAD_EXCLUSION_PCT = 20;
const HOMESTEAD_FRONT_DEPTH_LIMIT = 15; // only block trees closer to viewer than this

export function Scene() {
  const [trees, setTrees] = useState<TreeSpot[]>([]);
  const [woodcutterX, setWoodcutterX] = useState(50);
  const [chopping, setChopping] = useState(false);

  function addTree() {
    let spot: TreeSpot | null = null;
    let attempts = 0;

    while (!spot && attempts < 15) {
      attempts++;
      const candidate: TreeSpot = {
        xPct: 4 + Math.random() * 92,
        bottomPct: Math.random() * 40,
        scale: 0.55 + Math.random() * 0.6,
      };

      const nearHomesteadX = Math.abs(candidate.xPct - HOMESTEAD_X) < HOMESTEAD_EXCLUSION_PCT;
      const inFrontOfHomestead = candidate.bottomPct < HOMESTEAD_FRONT_DEPTH_LIMIT;
      const blockedByHomestead = nearHomesteadX && inFrontOfHomestead;

      const tooCloseToTree = trees.some((t) => {
        const depthCloseness = Math.abs(t.bottomPct - candidate.bottomPct);
        const horizontalGap = Math.abs(t.xPct - candidate.xPct);
        return depthCloseness < 6 && horizontalGap < MIN_GAP_PCT;
      });

      if (!blockedByHomestead && !tooCloseToTree) spot = candidate;
    }

    if (!spot) {
      spot = {
        xPct: 4 + Math.random() * 70,
        bottomPct: Math.random() * 40,
        scale: 0.55 + Math.random() * 0.6,
      };
    }

    setTrees((prev) => [...prev, spot as TreeSpot]);
  }

  function walkToRandomSpot() {
    const target = 5 + Math.random() * 90;
    setWoodcutterX(target);
  }

  function testChop() {
    setChopping(true);
    setTimeout(() => setChopping(false), 1800);
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

        <Homestead xPct={HOMESTEAD_X} />

        <Dog />

        <Woodcutter xPct={woodcutterX} chopping={chopping} />

        <button
          onClick={addTree}
          className="absolute top-4 left-4 z-50 bg-white/90 px-4 py-2 rounded-lg text-sm text-gray-900"
        >
          + Add tree (test)
        </button>

        <button
          onClick={walkToRandomSpot}
          className="absolute top-4 left-44 z-50 bg-white/90 px-4 py-2 rounded-lg text-sm text-gray-900"
        >
          Walk (test)
        </button>

        <button
          onClick={testChop}
          className="absolute top-4 left-[21rem] z-50 bg-white/90 px-4 py-2 rounded-lg text-sm text-gray-900"
        >
          Chop (test)
        </button>
      </div>
    </div>
  );
}