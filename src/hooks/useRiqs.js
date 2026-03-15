import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { FOCUS_AREAS } from "@/constants";

const DEFAULT_FUNCTION_NAME = "get-cm-scores";
const FOCUS_AREA_MOVE_LABELS = {
  "Taking Perspective": {
    "Non-defensive Acknowledgement Violation": "Let It Land",
    "Closure Recognition": "Ending with Care",
    "Acknowledging Alignment": "Name the Alignment",
    "Perspective Differentiation and Acknowledgment":
      "Acknowledge Perspective Differences Respectfully",
    "Judgmentmental Language Violation": "Keep it Open and Safe",
    "Blame Language Violation": "Own it Together",
    "Fix-It Response Suppression": "Resist the Quick Fix",
    "Contextual Misalignment Index": "Connection Attempt Doesn't Match the Moment",
    "Policy Shielding Violation": "Lead with People, Not Policy",
  },
  "Recognizing & Regulating Emotion": {
    "Adaptive Expression Matching": "Match the Moment",
    "Acknowledgment of Emotional Change": "Notice Emotional Change",
    "Recognition of Urgency Signals": "Respond to Urgency",
    "Escalation Frequency": "Turning Up the Heat",
    "Speech Pace instability": "Disrupted Flow in Speaking",
    "Self-Aware Regulation": "Owning Your Emotion",
  },
  "Listening with Curiosity": {
    "Listening without Interruptions": "Listen Fully",
    "Restating or Summarizing Speaker's Key points":
      "Diminishing the Power of Listening",
    "Asks for Confirmation of Understanding": "Invite Space for Clarification",
    "Clarification Prompt Ratio": "Seeking Clarity Before Responding",
    "Open Invitation to Contribute": "Inviting the Other Person's voice",
    "Exploration of Alternative Viewpoints":
      "Exploring a Different Perspective",
  },
  "Showing Empathy": {
    "Incongruence Detection Response": "Sensing More Beneath the Surface",
    "Empathic Language Index": "Pause for Processing",
    "Overload Sensitivity Score": "Lead with Empathy",
  },
};

function normalizeLabel(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeCmScores(payload) {
  if (!payload) return [];

  const entries = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
    ? payload.data
    : typeof payload === "object"
    ? Object.keys(payload)
        .filter((key) => key !== "userid")
        .sort((a, b) => Number(a) - Number(b))
        .map((key) => payload[key])
    : [];

  return entries
    .filter((entry) => entry && entry.cm)
    .map((entry) => ({
      label: String(entry.cm).trim(),
      colors: Array.isArray(entry.colors) ? entry.colors : [],
    }));
}

export function useRiqs(userId = "24eba44c-10c0-47d0-a293-9c02b7c3ec9a") {
  const [riqs, setRiqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRiqs() {
      setLoading(true);
      setError(null);

      const functionName =
        import.meta.env.VITE_CM_SCORES_FUNCTION || DEFAULT_FUNCTION_NAME;
      const payload = { userId, user_id: userId, userid: userId };
      const { data, error: fetchError } = await supabase.functions.invoke(
        functionName,
        { body: payload }
      );
      if (fetchError) {
        console.error("Supabase error:", fetchError);
        setError(fetchError);
        setLoading(false);
        return;
      }

      const normalizedMoves = normalizeCmScores(data);
      setRiqs(normalizedMoves);
      setLoading(false);
    }

    fetchRiqs();
  }, [userId]);

  const getMovesForFocusArea = (selectedIndex) => {
    const focusArea = FOCUS_AREAS[selectedIndex] ?? "";
    const allowedLabels = FOCUS_AREA_MOVE_LABELS[focusArea];
    const isMapping = allowedLabels && !Array.isArray(allowedLabels);
    const mappingByNormalized = isMapping
      ? Object.entries(allowedLabels).reduce((acc, [metric, display]) => {
          acc[normalizeLabel(metric)] = display;
          return acc;
        }, {})
      : {};
    const allowedLabelsNormalized = Array.isArray(allowedLabels)
      ? new Set(allowedLabels.map((label) => normalizeLabel(label)))
      : isMapping
      ? new Set(Object.keys(mappingByNormalized))
      : null;
    const filteredMoves =
      selectedIndex === 4
        ? riqs
        : allowedLabels
        ? riqs.filter((move) =>
            allowedLabelsNormalized?.has(normalizeLabel(move.label))
          )
        : riqs;
    const displayMoves = filteredMoves.map((move) => ({
      label: isMapping
        ? mappingByNormalized[normalizeLabel(move.label)] ?? move.label
        : move.label,
      colors: move.colors,
    }));
    const sortedDisplayMoves = [...displayMoves].sort((a, b) =>
      a.label.localeCompare(b.label)
    );
    return {
      moves: sortedDisplayMoves.map((move) => move.label),
      colors: sortedDisplayMoves.map((move) => move.colors),
    };
  };

  return { riqs, getMovesForFocusArea, loading, error };
}
