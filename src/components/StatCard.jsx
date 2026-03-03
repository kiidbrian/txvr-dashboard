import { Card, CardContent } from "@/components/ui/card";
import { HoverTooltip } from "./HoverTooltip";

export function StatCard({
  label,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-pink-500",
  tooltipTitle,
  tooltipDescription,
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          {tooltipTitle || tooltipDescription ? (
            <HoverTooltip title={tooltipTitle ?? label} description={tooltipDescription}>
              <p className="text-sm text-muted-foreground cursor-help">{label}</p>
            </HoverTooltip>
          ) : (
            <p className="text-sm text-muted-foreground">{label}</p>
          )}
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <Icon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
      </CardContent>
    </Card>
  );
}
