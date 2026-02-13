import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import neutralSvg from "@/assets/NEUTRAL.svg";

export function GrowthStages({ currentStageIndex = 0 }) {
  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle className="text-lg font-bold text-muted-foreground px-0 mb-2">Overall Relational Growth Progress</CardTitle>
      </CardHeader>

      <Card className="bg-transparent py-10">
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-8 md:gap-5">
          {/* Butterfly */}
          <div className="md:col-span-1 flex flex-col items-center">
            <img src={neutralSvg} alt="Growth butterfly" className="w-60 h-60 relative -mt-10" />
            <p className="text-xs text-center max-w-xs uppercase text-(--brand-primary) font-bold absolute inset-120 md:left-[296px] left-[150px] md:top-[495px]">
              0/5 transformation<br/> unlocked
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
                  <div className="text-lg font-bold text-(--brand-primary)">0/5</div>
                </CardContent>
              </Card>
              <Card className="border-purple-100">
                <CardContent className="py-0 text-left">
                  <p className="text-sm text-muted-foreground mt-1">Avg. Performance</p>
                  <div className="text-lg font-bold text-(--brand-primary)">83%</div>
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
