import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "./Gauge";
import { getStageLabel } from "@/lib/utils";

export function FocusAreaCard({ title, value, isSelected, onClick }) {
  const stageLabel = getStageLabel(value);

  return (
    <button type="button" onClick={onClick} className="text-left">
      <Card className={isSelected ? "border-primary" : ""}>
        <CardHeader>
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <Gauge value={value} max={100} />
          <span className="text-xs text-muted-foreground">{stageLabel}</span>
        </CardContent>
      </Card>
    </button>
  );
}
