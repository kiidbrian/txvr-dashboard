import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "./Gauge";

export function FocusAreaCard({ title, value, isSelected, onClick }) {
  return (
    <button type="button" onClick={onClick} className="text-left">
      <Card className={isSelected ? "border-primary" : ""}>
        <CardHeader>
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <Gauge value={value} max={100} />
          <span className="text-xs text-muted-foreground">Starter</span>
        </CardContent>
      </Card>
    </button>
  );
}
