import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import templateSvg from "@/assets/wings/NEUTRAL.svg";
import oneWingSvg from "@/assets/Filled-wings/One-wing.svg";
import twoWingsSvg from "@/assets/Filled-wings/Two-Wings.svg";
import threeWingsSvg from "@/assets/Filled-wings/Three-Wings.svg";
import fourWingsSvg from "@/assets/Filled-wings/four-wings.svg";
import wholeBodySvg from "@/assets/Filled-wings/Whole-body.svg";

const BUTTERFLY_IMAGES = [
  templateSvg,    // state 0 – no wings
  oneWingSvg,     // state 1
  twoWingsSvg,    // state 2
  threeWingsSvg,  // state 3
  fourWingsSvg,   // state 4
  wholeBodySvg,   // state 5 – full metamorphosis
];

export function GrowthStages({ wingsUnlocked = 0, butterflyState = 0, avgPerformance }) {
  const isFullButterfly = butterflyState === 5;
  const label = isFullButterfly
    ? "Full metamorphosis!"
    : `${wingsUnlocked}/5 transformation unlocked`;

  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle className="text-lg font-bold text-muted-foreground px-0 mb-2">
          Overall Relational Growth Progress
        </CardTitle>
      </CardHeader>

      <Card className="bg-transparent py-10">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-8 md:gap-5">
            {/* Butterfly */}
            <div className="md:col-span-1 flex md:flex-col flex-row items-center gap-3">
              <div className="relative w-60 h-60 -mt-10">
                <img
                  src={BUTTERFLY_IMAGES[butterflyState]}
                  alt={isFullButterfly ? "Full butterfly" : `Butterfly – ${wingsUnlocked} wings`}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs text-center md:text-center uppercase text-(--brand-primary) font-bold whitespace-nowrap md:whitespace-normal">
                {label}
              </p>
            </div>

            {/* Stats */}
            <div className="md:col-span-3 grid grid-cols-1 gap-4">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-muted-foreground max-w-xs">
                  Your transformation butterfly
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Master each focus area to unlock your butterfly wings. Reach 90% performance in all areas and complete the Master Challenge to achieve full metamorphosis.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-pink-100">
                  <CardContent className="py-0 text-left">
                    <p className="text-sm text-muted-foreground mt-1">Wings unlocked</p>
                    <div className="text-lg font-bold text-(--brand-primary)">
                      {isFullButterfly ? "5/5 ✨" : `${wingsUnlocked}/5`}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-purple-100">
                  <CardContent className="py-0 text-left">
                    <p className="text-sm text-muted-foreground mt-1">Avg. Performance</p>
                    <div className="text-lg font-bold text-(--brand-primary)">
                      {`${avgPerformance ?? "—"}%`}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
