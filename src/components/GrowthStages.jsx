import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GROWTH_STAGES } from "@/constants";

export function GrowthStages({ currentStageIndex = 0 }) {
  return (
    <Card className="bg-linear-to-br from-emerald-50 via-background to-sky-50">
      <CardHeader>
        <CardTitle>Overall Relational Growth</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {GROWTH_STAGES.map((stage, index) => (
            <div
              key={stage.label}
              className={`relative p-3 text-center transition ${
                index === currentStageIndex
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span
                  className={
                    index === currentStageIndex
                      ? "text-4xl"
                      : "text-4xl opacity-50"
                  }
                >
                  {stage.emoji}
                </span>
                {index < GROWTH_STAGES.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          <span className="text-base font-semibold text-foreground">
            {GROWTH_STAGES[currentStageIndex]?.label ?? "Growing"}
          </span>{" "}
          Great progress! You're integrating skills across all focus areas.
        </p>
      </CardContent>
    </Card>
  );
}
