import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FocusAreaCard } from "./FocusAreaCard";
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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {FOCUS_AREAS.map((item, i) => (
        <FocusAreaCard
          key={item}
          title={item}
          value={focusAreaValues[i] ?? 0}
          isSelected={selectedIndex === i}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
