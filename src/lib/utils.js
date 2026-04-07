import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStageLabel(score) {
  if (score >= 90) return "Fully expressed";
  if (score >= 61) return "Getting stronger";
  if (score >= 26) return "Growing";
  return "Beginning";
}

export function formatDuration(secondsValue) {
  const totalSeconds = Number(secondsValue);
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0m";
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function getInitials(name, fallback = "L") {
  const trimmed = String(name ?? "").trim();
  if (!trimmed) return fallback;
  const letters = trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  return letters ? letters.toUpperCase() : fallback;
}
