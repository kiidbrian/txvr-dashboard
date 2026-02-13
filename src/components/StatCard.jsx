import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, subtitle, icon: Icon, iconColor = "text-pink-500" }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
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
