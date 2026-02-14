import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import neutralSvg from "@/assets/NEUTRAL.svg";
import bodyOnly from "@/assets/BODY ONLY.svg";
import topLeft from "@/assets/TOP-LEFT.svg";
import topRight from "@/assets/TOP-RIGHT.svg";
import bottomLeft from "@/assets/BOTTOM-LEFT.svg";
import bottomRight from "@/assets/BOTTOM-RIGHT.svg";
import fullButterfly from "@/assets/FINAL WHOLE BUTTERFLY.svg";

const WING_LAYERS = [
  { src: topLeft, alt: "Top-left wing", key: "topLeft" },
  { src: topRight, alt: "Top-right wing", key: "topRight" },
  { src: bottomLeft, alt: "Bottom-left wing", key: "bottomLeft" },
  { src: bottomRight, alt: "Bottom-right wing", key: "bottomRight" },
];

export function GrowthStages({ wingsUnlocked = 0, butterflyState = 0, unlockedWings = {} }) {
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
                {isFullButterfly ? (
                  <img
                    src={fullButterfly}
                    alt="Full butterfly"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <>
                    {/* Base body — always visible */}
                    <img
                      src={wingsUnlocked === 0 ? neutralSvg : bodyOnly}
                      alt="Butterfly body"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    {/* Individual wing layers */}
                    {WING_LAYERS.map((wing) => (
                      unlockedWings[wing.key] && (
                        <img
                          key={wing.key}
                          src={wing.src}
                          alt={wing.alt}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      )
                    ))}
                  </>
                )}
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
                    <p className="text-sm text-muted-foreground mt-1">Status</p>
                    <div className="text-lg font-bold text-(--brand-primary)">
                      {isFullButterfly ? "Fully expressed" : wingsUnlocked === 0 ? "Beginning" : "Growing"}
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
