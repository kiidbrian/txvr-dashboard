import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreProgressBar } from "./ScoreProgressBar";
import { Skeleton } from "./Skeleton";
import { MOVE_DESCRIPTIONS } from "@/constants";
import { HoverTooltip } from "./HoverTooltip";

export function ConversationMoves({
  moves,
  loading,
  moveColors = [],
  onMoveHoverChange,
}) {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <HoverTooltip
          title="Conversation Moves"
          description="Observable behaviors in a conversation (what is said, how it is said, or when it is said) that are either relationally supportive (connection-building) or disruptive (connection-eroding)."
        >
          <CardTitle className="cursor-help">Conversation Moves</CardTitle>
        </HoverTooltip>
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
                  <HoverTooltip
                    title={move}
                    description={description}
                    onHoverChange={onMoveHoverChange}
                  >
                    <span className="cursor-pointer underline decoration-dotted underline-offset-2">
                      {move}
                    </span>
                  </HoverTooltip>
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
