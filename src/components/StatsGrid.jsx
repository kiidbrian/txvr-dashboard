import { Flame, PlayCircle, Timer, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "./StatCard";
import { Skeleton } from "./Skeleton";

export function StatsGrid({ userData, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-10" />
              </div>
              <Skeleton className="h-5 w-5 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Total Attempts"
        value={userData?.total_attempts || 0}
        icon={Target}
      />
      <StatCard
        label="Time Practicing"
        value={userData?.time_practicing || 0}
        icon={Timer}
      />
      <StatCard
        label="Scenarios Played"
        value={userData?.scenarios_played || 0}
        icon={PlayCircle}
      />
      <StatCard
        label="Growth Streak"
        value={userData?.growth_streak || 0}
        icon={Flame}
      />
    </div>
  );
}
