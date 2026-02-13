import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreProgressBar } from "./ScoreProgressBar";
import { Skeleton } from "./Skeleton";
import { STATUS_LABELS } from "@/constants";

function ScoreLegend() {
  return (
    <div className="flex items-center gap-3 text-xs font-normal">
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-full bg-red-500" />Needs Work
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-full bg-orange-500" />Developing
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-full bg-yellow-500" />Improving
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-full bg-green-500" />Proficient
      </span>
    </div>
  );
}

export function ConversationMoves({ moves, loading }) {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center justify-start">
          <ScoreLegend />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-3 w-full" />
            </div>
          ))
        ) : moves.length === 0 ? (
          <p className="text-sm text-muted-foreground">No moves yet.</p>
        ) : (
          moves.map((move) => {
            // Mock scores for demo — replace with real score history
            const mockScores = Array.from({ length: 4 }, () =>
              Math.floor(Math.random() * 4)
            );
            const latestScore = mockScores[mockScores.length - 1];
            return (
              <div key={move}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{move}</span>
                  <span className="text-muted-foreground">
                    {STATUS_LABELS[latestScore]}
                  </span>
                </div>
                <ScoreProgressBar scores={mockScores} />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
