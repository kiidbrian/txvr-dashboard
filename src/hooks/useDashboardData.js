import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { FOCUS_AREAS } from "@/constants";

const DEFAULT_FUNCTION_NAME = "dashboard-metrics";

function pickFirst(source, keys, fallback = undefined) {
  for (const key of keys) {
    if (source?.[key] !== undefined && source?.[key] !== null) {
      return source[key];
    }
  }
  return fallback;
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

function normalizeGrowthLevel(level) {
  const value = String(level ?? "").trim().toLowerCase();
  if (value === "locked") return 1;
  if (value === "beginning") return 1;
  if (value === "developing") return 2;
  if (value === "improving") return 3;
  if (value === "proficient") return 4;
  if (value === "mastery" || value === "master") return 5;
  return 1;
}

function mapSummaryFocusAreas(summary) {
  const incomingFocusAreas = toArray(summary?.focus_areas);
  const byName = new Map(
    incomingFocusAreas.map((area) => [String(area?.focus_area ?? "").trim(), area])
  );
  const ordered = FOCUS_AREAS.map((name) => byName.get(name) ?? null);

  const focusAreaScores = ordered.map((area) =>
    toNumber(pickFirst(area, ["scaled_score", "raw_score"]), 0)
  );
  const growthLevels = ordered.map((area) =>
    normalizeGrowthLevel(pickFirst(area, ["level"]))
  );
  const practiceAllUnlocked = Boolean(
    pickFirst(ordered[4], ["practice_all_unlocked"], false)
  );

  return { focusAreaScores, growthLevels, practiceAllUnlocked };
}

function pickUserObject(payload, userId) {
  if (!payload) return null;

  const candidates = [];

  if (Array.isArray(payload)) candidates.push(...payload);
  if (Array.isArray(payload?.data)) candidates.push(...payload.data);
  if (Array.isArray(payload?.rows)) candidates.push(...payload.rows);
  if (Array.isArray(payload?.metrics)) candidates.push(...payload.metrics);

  if (candidates.length > 0) {
    return (
      candidates.find((row) => {
        const rowUserId = pickFirst(row, ["userid", "userId", "user_id"]);
        return rowUserId === userId;
      }) ?? candidates[0]
    );
  }

  return payload?.data ?? payload?.metrics ?? payload;
}

function normalizeUserData(rawUser, userId) {
  if (!rawUser || typeof rawUser !== "object") return null;

  const summary = rawUser.summary ?? null;

  if (summary && typeof summary === "object") {
    const { focusAreaScores, growthLevels, practiceAllUnlocked } =
      mapSummaryFocusAreas(summary);

    return {
      userid:
        pickFirst(rawUser, ["userid", "userId", "user_id"], userId) ?? userId,
      name: pickFirst(summary, ["cms", "name", "full_name", "user_name"], "Learner"),
      total_attempts: toNumber(
        pickFirst(summary?.key_metrics, ["total_attempts", "totalAttempts"])
      ),
      time_practicing: toNumber(
        pickFirst(summary?.key_metrics, [
          "time_practicing_days",
          "time_practicing",
          "timePracticing",
        ])
      ),
      scenarios_played: toNumber(
        pickFirst(summary?.key_metrics, [
          "variants_played",
          "scenarios_played",
          "scenariosPlayed",
        ])
      ),
      growth_streak: toNumber(
        pickFirst(summary?.key_metrics, ["growth_streak_days", "growth_streak"])
      ),
      avg_performance: toNumber(
        pickFirst(summary, ["average_score", "avg_performance", "avgPerformance"])
      ),
      focus_area: focusAreaScores,
      growth_level: growthLevels,
      conversation_moves_color: [],
      next_steps: pickFirst(summary, ["next_step", "next_steps"], ""),
      practice_all_unlocked: practiceAllUnlocked,
      raw: rawUser,
    };
  }

  return {
    userid:
      pickFirst(rawUser, ["userid", "userId", "user_id"], userId) ?? userId,
    name: pickFirst(rawUser, ["name", "full_name", "user_name"], "Learner"),
    total_attempts: toNumber(
      pickFirst(rawUser, ["total_attempts", "totalAttempts"])
    ),
    time_practicing: toNumber(
      pickFirst(rawUser, ["time_practicing", "timePracticing"])
    ),
    scenarios_played: toNumber(
      pickFirst(rawUser, ["scenarios_played", "scenariosPlayed"])
    ),
    growth_streak: toNumber(
      pickFirst(rawUser, ["growth_streak", "growthStreak"])
    ),
    avg_performance: toNumber(
      pickFirst(rawUser, ["avg_performance", "avgPerformance"])
    ),
    focus_area: toArray(pickFirst(rawUser, ["focus_area", "focusArea"])),
    growth_level: toArray(pickFirst(rawUser, ["growth_level", "growthLevel"])),
    conversation_moves_color: toArray(
      pickFirst(rawUser, ["conversation_moves_color", "conversationMovesColor"])
    ),
    next_steps: pickFirst(rawUser, ["next_steps", "nextSteps"], ""),
    raw: rawUser,
  };
}

async function callDashboardMetricsFunction(payload) {
  const functionName =
    import.meta.env.VITE_DASHBOARD_METRICS_FUNCTION || DEFAULT_FUNCTION_NAME;
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: payload,
  });

  if (error) {
    throw error;
  }

  return data;
}

export function useDashboardData(userId = "user1") {
  const [dashboardData, setDashboardData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);

      const payload = { userId, user_id: userId, userid: userId };
      try {
        const data = await callDashboardMetricsFunction(payload);
        const rawUserData = pickUserObject(data, userId);
        const normalizedUserData = normalizeUserData(rawUserData, userId);

        setDashboardData(Array.isArray(data) ? data : [data]);
        setUserData(normalizedUserData);
      } catch (fetchError) {
        console.error("Supabase edge function error:", fetchError);
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [userId]);

  return { dashboardData, userData, loading, error };
}
