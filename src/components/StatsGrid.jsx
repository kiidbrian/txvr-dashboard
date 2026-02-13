import { Flame, TrendingUp, ThumbsUp, Target, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "./StatCard";
import { Skeleton } from "./Skeleton";

export function StatsGrid({ userData, loading }) {
  if (loading) {
    return (
      <div>
        <CardHeader className="px-0">
          <CardTitle className="text-lg font-bold text-muted-foreground px-0 mb-2">Key Metrics</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-6 w-10" />
                  <Skeleton className="h-3 w-14" />
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle className="text-lg font-bold text-muted-foreground px-0 mb-2">Key Metrics</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Attempts"
          value={userData?.total_attempts || 0}
          subtitle="This week"
          icon={Target}
          iconColor="text-(--brand-primary)"
        />
        <StatCard
          label="Time Practicing"
          value={userData?.time_practicing || 0}
          subtitle="This week"
          icon={TrendingUp}
          iconColor="text-(--brand-primary)"
        />
        <StatCard
          label="Scenarios Played"
          value={userData?.scenarios_played || 0}
          subtitle="Keep going!"
          icon={ThumbsUp}
          iconColor="text-(--brand-primary)"
        />
        <StatCard
          label="Growth Streak"
          value={`${userData?.growth_streak || 0} days 🔥`}
          subtitle="Keep going!"
          icon={Star}
          iconColor="text-(--brand-primary)"
        />
      </div>
    </div>
  );
}
