import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStageLabel(score) {
  if (score >= 90) return "Fully expressed";
  if (score >= 61) return "Getting stronger";
  if (score >= 26) return "Growing";
  return "Beginning";
}
