const SCORE_GRADIENTS = [
  "bg-gradient-to-r from-red-700 to-red-300",       // 0 = Needs Work
  "bg-gradient-to-r from-orange-600 to-orange-300", // 1 = Developing
  "bg-gradient-to-r from-yellow-600 to-yellow-300", // 2 = Improving
  "bg-gradient-to-r from-green-600 to-green-300",   // 3 = Proficient
];

export function ScoreProgressBar({ scores }) {
  return (
    <div className="flex h-3 w-full rounded overflow-hidden gap-0.5">
      {scores.map((score, i) => (
        <div
          key={i}
          className={`flex-1 ${SCORE_GRADIENTS[score] ?? "bg-gray-300"}`}
        />
      ))}
    </div>
  );
}
