export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[200%_100%] rounded ${className}`}
      style={{
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
}
