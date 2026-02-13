import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";

import eggRing from "@/assets/rings/EGG.svg";
import caterpillarRing from "@/assets/rings/CATERPILLAR.svg";
import preCocoonRing from "@/assets/rings/PRE-COCOON.svg";
import chrysalisRing from "@/assets/rings/CHRYSALIS.svg";
import butterflyRing from "@/assets/rings/BUTTERFLY.svg";

const MINI_RINGS = [eggRing, caterpillarRing, preCocoonRing, chrysalisRing, butterflyRing];

export function PracticeCard({ nextSteps, onStartPractice, selectedFocusArea }) {
  return (
    <Card className="border-pink-100 overflow-hidden bg-pink-50 py-0">
      {/* Mini ring images row — white background */}
      <div className="bg-white px-4 py-3 border-b border-pink-100">
        <div className="flex items-center justify-center gap-1">
          {MINI_RINGS.map((ring, i) => (
            <div key={i} className="flex items-center">
              <img
                src={ring}
                alt={`Stage ${i + 1}`}
                className="w-10 h-10 object-contain"
              />
              {i < MINI_RINGS.length - 1 && (
                <span className="text-gray-300 text-xs mx-1">›</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pink area */}
      <CardContent className="flex h-full flex-col items-center gap-5 py-8 px-2 bg-pink-50 rounded-t-xl">
        {/* Centered pink ring icon */}
        <div className="w-16 h-16 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#f9c4d0" strokeWidth="4" />
            <circle cx="32" cy="32" r="18" fill="none" stroke="#f9c4d0" strokeWidth="4" />
            <line x1="32" y1="4" x2="32" y2="14" stroke="#f9c4d0" strokeWidth="4" strokeLinecap="round" />
            <line x1="32" y1="50" x2="32" y2="60" stroke="#f9c4d0" strokeWidth="4" strokeLinecap="round" />
            <line x1="4" y1="32" x2="14" y2="32" stroke="#f9c4d0" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="32" x2="60" y2="32" stroke="#f9c4d0" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Focus text */}
        <p className="text-xs text-center text-gray-700 px-2 mb-10">
          Focus on{" "}
          <span className="font-bold">{`"${nextSteps ?? selectedFocusArea ?? "Taking Perspective"}"`}</span>{" "}
          in a conflict scenario. Give it a try!
        </p>

        {/* Start Practice button */}
        <Button
          className="w-full bg-(--brand-button) hover:bg-(--brand-button-hover) text-white font-semibold py-5 text-base"
          onClick={onStartPractice}
        >
          Start Practise
        </Button>

        {/* Tip */}
        <div className="flex items-start gap-2 bg-pink-100/70 rounded-lg p-1 w-full">
          <CircleHelp className="h-4 w-4 text-pink-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Tip:</span> Learners reaching "Emerging Butterfly" practiced across at least 3 scenarios per skill.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
