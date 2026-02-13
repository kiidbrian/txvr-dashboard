import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "./CircularProgress";
import { Skeleton } from "./Skeleton";
import { FOCUS_AREAS } from "@/constants";

export function FocusAreasGrid({ selectedIndex, onSelect, loading, focusAreaValues = [] }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <Skeleton className="h-12 w-20 rounded-t-full" />
              <Skeleton className="h-3 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="mt5 mb-10">
      <CardHeader className="px-0">
        <CardTitle className="text-lg font-bold text-muted-foreground px-0 mb-2">Focus Areas</CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-center items-center">
      {FOCUS_AREAS.map((item, i) => {
        const isLocked = i === 4;
        return (
          <button
            key={item}
            type="button"
            onClick={() => !isLocked && onSelect(i)}
            className={`rounded-xl p-3 transition ${
              selectedIndex === i ? "bg-pink-50 ring-2 ring-(--brand-primary)" : ""
            } ${isLocked ? "cursor-default opacity-80" : "cursor-pointer hover:bg-gray-50"}`}
          >
            <CircularProgress
              percentage={focusAreaValues[i] ?? 0}
              label={item}
              ringIndex={i}
              isLocked={isLocked}
            />
          </button>
        );
      })}
      </div>
    </div>
  );
}
