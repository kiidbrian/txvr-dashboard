import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PracticeCard({ nextSteps, onStartPractice }) {
  return (
    <Card>
      <CardContent className="flex h-full flex-col justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Focus on{" "}
          <span className="font-bold">{`"${nextSteps ?? "improving your skills"}"`}</span>{" "}
          in a conflict scenario. Give it a try!
        </p>
        <Button
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
          onClick={onStartPractice}
        >
          Start Practice
        </Button>
      </CardContent>
    </Card>
  );
}
