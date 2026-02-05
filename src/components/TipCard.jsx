import { Card, CardContent } from "@/components/ui/card";

export function TipCard({ children }) {
  return (
    <Card>
      <CardContent className="px-4 py-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Tip:</span> {children}
        </p>
      </CardContent>
    </Card>
  );
}
