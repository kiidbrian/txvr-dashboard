import eggRing from "@/assets/rings/EGG.svg";
import caterpillarRing from "@/assets/rings/CATERPILLAR.svg";
import preCocoonRing from "@/assets/rings/PRE-COCOON.svg";
import chrysalisRing from "@/assets/rings/CHRYSALIS.svg";
import butterflyRing from "@/assets/rings/BUTTERFLY.svg";
import lockedRing from "@/assets/RING-CATERPILLAR 1.svg";

const RING_IMAGES = [
  eggRing,
  caterpillarRing,
  preCocoonRing,
  chrysalisRing,
  butterflyRing,
];

export function CircularProgress({
  percentage,
  label,
  ringIndex = 0,
  isLocked = false,
}) {
  const ringSrc = isLocked ? lockedRing : RING_IMAGES[ringIndex] ?? eggRing;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Ring + percentage */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <img
          src={ringSrc}
          alt={`${label} ring`}
          className="absolute inset-0 w-full h-full object-contain"
        />
        <div className="relative flex flex-col items-center justify-center text-center">
          {isLocked ? (
            <span className="text-3xl">🔒</span>
          ) : (
            <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
          )}
        </div>
      </div>

      {/* Label below */}
      <span className={`text-xs text-center font-medium max-w-[120px] leading-tight ${isLocked ? "text-gray-400" : "text-gray-600"}`}>
        {isLocked ? (
          <>
            <span className="text-gray-400">🔒 Locked</span>
            <br />
            <span className="font-bold text-gray-700">{label}</span>
          </>
        ) : (
          label
        )}
      </span>
    </div>
  );
}
