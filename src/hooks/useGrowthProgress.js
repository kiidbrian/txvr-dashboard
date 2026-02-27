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

export function useGrowthProgress(
  focusAreaValues = [],
  practiceAllUnlockedOverride = null
) {
  return useMemo(() => {
    const baseValues = focusAreaValues.slice(0, 4);

    const wingsUnlocked = baseValues.filter((v) => (v ?? 0) >= MASTERY_THRESHOLD).length;
    const computedAllUnlocked = wingsUnlocked === 4;
    const allUnlocked =
      typeof practiceAllUnlockedOverride === "boolean"
        ? practiceAllUnlockedOverride
        : computedAllUnlocked;

    // 0-4 = incremental wings, 5 = full butterfly
    const butterflyState = allUnlocked ? 5 : wingsUnlocked;

    return {
      wingsUnlocked,   // 0–4
      butterflyState,   // 0–5
      allUnlocked,      // boolean – unlocks "Practice All Skills"
    };
  }, [focusAreaValues, practiceAllUnlockedOverride]);
}
