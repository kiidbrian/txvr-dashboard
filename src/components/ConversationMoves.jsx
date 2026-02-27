import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreProgressBar } from "./ScoreProgressBar";
import { Skeleton } from "./Skeleton";
import { MOVE_DESCRIPTIONS } from "@/constants";

export function ConversationMoves({
  moves,
  loading,
  moveColors = [],
  onMoveHoverChange,
}) {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Conversation Moves</CardTitle>
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
          moves.map((move, i) => {
            const description = MOVE_DESCRIPTIONS[move];
            return (
              <div key={move}>
                <div className="text-sm mb-1">
                  <div
                    className="relative group inline-block"
                    onMouseEnter={() => onMoveHoverChange?.(true)}
                    onMouseLeave={() => onMoveHoverChange?.(false)}
                  >
                    <span className="cursor-pointer underline decoration-dotted underline-offset-2">
                      {move}
                    </span>
                    {description && (
                      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-50 mt-1 w-64 rounded-lg bg-white p-3 shadow-lg border">
                        <p className="font-bold text-sm text-gray-900">{move}</p>
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                      </div>
                    )}
                  </div>
                </div>
                <ScoreProgressBar colors={moveColors[i] ?? []} />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
