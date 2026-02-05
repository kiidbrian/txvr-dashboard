export function Gauge({ value, max = 100, size = 80 }) {
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half circle
  const offset = circumference * (1 - percentage);

  // Color based on value (low = red, high = green)
  const getColor = (val) => {
    const pct = val / max;
    if (pct < 0.25) return "#ef4444"; // red
    if (pct < 0.5) return "#f97316";  // orange
    if (pct < 0.75) return "#eab308"; // yellow
    return "#22c55e"; // green
  };

  return (
    <div className="relative" style={{ width: size, height: size / 2 + 10 }}>
      <svg width={size} height={size / 2 + strokeWidth} className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Foreground arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease" }}
        />
      </svg>
      {/* Value label */}
      <div
        className="absolute inset-x-0 bottom-0 text-center text-sm font-semibold"
        style={{ color: getColor(value) }}
      >
        {Math.round(value)}%
      </div>
    </div>
  );
}
