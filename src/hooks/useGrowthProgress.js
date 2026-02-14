import { useMemo } from "react";

/**
 * Computes growth progress from focus area scores.
 *
 * Wing unlock order (matching the 4 base focus areas):
 *   0 – TOP-LEFT
 *   1 – TOP-RIGHT
 *   2 – BOTTOM-LEFT
 *   3 – BOTTOM-RIGHT
 *
 * States:
 *   0 wings  → NEUTRAL body only
 *   1 wing   → body + 1 highlighted wing
 *   2 wings  → body + 2 highlighted wings
 *   3 wings  → body + 3 highlighted wings
 *   4 wings  → body + 4 highlighted wings (all individual wings)
 *   5 (all)  → FINAL WHOLE BUTTERFLY (full metamorphosis) ok
 *
 * "Practice All Skills" unlocks when all 4 base focus areas >= 90.
 */

const MASTERY_THRESHOLD = 90;

// Wing keys in unlock order – indices match FOCUS_AREAS[0..3]
const WING_KEYS = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

export function useGrowthProgress(focusAreaValues = []) {
  return useMemo(() => {
    const baseValues = focusAreaValues.slice(0, 4);

    // Which individual wings are unlocked
    const unlockedWings = WING_KEYS.reduce((acc, key, i) => {
      acc[key] = (baseValues[i] ?? 0) >= MASTERY_THRESHOLD;
      return acc;
    }, {});

    const wingsUnlocked = Object.values(unlockedWings).filter(Boolean).length;
    const allUnlocked = wingsUnlocked === 4;

    // 0-4 = incremental wings, 5 = full butterfly
    const butterflyState = allUnlocked ? 5 : wingsUnlocked;

    return {
      wingsUnlocked,     // 0–4
      butterflyState,     // 0–5
      allUnlocked,        // boolean – unlocks "Practice All Skills"
      unlockedWings,      // { topLeft, topRight, bottomLeft, bottomRight }
    };
  }, [focusAreaValues]);
}
