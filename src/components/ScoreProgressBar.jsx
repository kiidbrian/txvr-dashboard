const MIN_SEGMENTS = 5;
const EMPTY_COLOR = "#e5e7eb";

export function ScoreProgressBar({ colors = [] }) {
  const segments =
    colors.length >= MIN_SEGMENTS
      ? colors
      : [...colors, ...Array(MIN_SEGMENTS - colors.length).fill(EMPTY_COLOR)];

  return (
    <div className="flex h-3 w-full rounded overflow-hidden gap-0.5">
      {segments.map((color, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
