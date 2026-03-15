import {useEffect, useState} from "react";
import {supabase} from "@/supabase";
import {FOCUS_AREAS} from "@/constants";

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

function pickMetricDetail(metrics, keys) {
  if (!metrics || typeof metrics !== "object") return undefined;

  for (const key of keys) {
    if (typeof metrics[key] === "string") return metrics[key];
    const value = metrics[key];
    if (value && typeof value === "object") {
      const detail =
        value.detail ??
        value.details ??
        value.description ??
        value.tooltip ??
        value.label;
      if (typeof detail === "string") return detail;
    }
    const direct =
      metrics[`${key}_detail`] ??
      metrics[`${key}_details`] ??
      metrics[`${key}_description`] ??
      metrics[`${key}_tooltip`];
    if (typeof direct === "string") return direct;
  }

  return undefined;
}

function normalizeGrowthLevel(level) {
  const value = String(level ?? "")
    .trim()
    .toLowerCase();
  if (value === "locked") return 1;
  if (value === "beginning") return 1;
  if (value === "developing") return 2;
  if (value === "improving") return 3;
  if (value === "proficient") return 4;
  if (value === "mastery" || value === "master") return 5;
  return 1;
}

const FOCUS_AREA_GROUPS = {
  "Taking Perspective": [
    "Perspective taking",
    "Perspective-taking",
    "Neutral and Nonjudgemental Language",
    "Neutral and Nonjudgmental Language",
    "Solution Awareness",
    "Contextual Misalignment",
    "Policy",
  ],
  "Recognizing & Regulating Emotion": [
    "Emotional Recognition",
    "Self-regulation of Emotiions",
    "Self-Regulation of Emotions",
  ],
  "Listening with Curiosity": ["Respectful Listening", "Curiosity"],
  "Showing Empathy": ["Empathy"],
};

function normalizeFocusAreaName(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function mapSummaryFocusAreas(summary) {
  const incomingFocusAreas = toArray(summary?.focus_areas);
  const byName = new Map(
    incomingFocusAreas.map((area) => [
      String(area?.focus_area ?? "").trim(),
      area,
    ]),
  );
  const byNormalizedName = new Map(
    incomingFocusAreas.map((area) => [
      normalizeFocusAreaName(area?.focus_area),
      area,
    ]),
  );
  const ordered = FOCUS_AREAS.map((name) => byName.get(name) ?? null);

  const focusAreaScores = FOCUS_AREAS.map((name, index) => {
    const group = FOCUS_AREA_GROUPS[name];
    if (group && group.length > 0) {
      const groupedAreas = group
        .map((label) => byNormalizedName.get(normalizeFocusAreaName(label)))
        .filter(Boolean);
      if (groupedAreas.length === 0) return 0;
      const total = groupedAreas.reduce(
        (sum, area) => sum + toNumber(pickFirst(area, ["scaled_score"]), 0),
        0,
      );
      return Math.round(total / groupedAreas.length);
    }
    if (name === "Practice All Skills") {
      const groupedAreas = Object.values(FOCUS_AREA_GROUPS)
        .flat()
        .map((label) => byNormalizedName.get(normalizeFocusAreaName(label)))
        .filter(Boolean);
      if (groupedAreas.length === 0) return 0;
      const total = groupedAreas.reduce(
        (sum, area) => sum + toNumber(pickFirst(area, ["scaled_score"]), 0),
        0,
      );
      return Math.round(total / groupedAreas.length);
    }
    const area = ordered[index];
    return toNumber(pickFirst(area, ["scaled_score", "raw_score"]), 0);
  });
  const growthLevels = FOCUS_AREAS.map((name, index) => {
    const group = FOCUS_AREA_GROUPS[name];
    if (group && group.length > 0) {
      const groupedAreas = group
        .map((label) => byNormalizedName.get(normalizeFocusAreaName(label)))
        .filter(Boolean);
      if (groupedAreas.length === 0) return 1;
      return Math.max(
        ...groupedAreas.map((area) =>
          normalizeGrowthLevel(pickFirst(area, ["level"])),
        ),
      );
    }
    if (name === "Practice All Skills") {
      const groupedAreas = Object.values(FOCUS_AREA_GROUPS)
        .flat()
        .map((label) => byNormalizedName.get(normalizeFocusAreaName(label)))
        .filter(Boolean);
      if (groupedAreas.length === 0) return 1;
      return Math.max(
        ...groupedAreas.map((area) =>
          normalizeGrowthLevel(pickFirst(area, ["level"])),
        ),
      );
    }
    const area = ordered[index];
    return normalizeGrowthLevel(pickFirst(area, ["level"]));
  });
  const practiceAllUnlocked = Boolean(
    pickFirst(ordered[4], ["practice_all_unlocked"], false),
  );

  return {focusAreaScores, growthLevels, practiceAllUnlocked};
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
    const {focusAreaScores, growthLevels, practiceAllUnlocked} =
      mapSummaryFocusAreas(summary);

    return {
      userid:
        pickFirst(rawUser, ["userid", "userId", "user_id"], userId) ?? userId,
      name: pickFirst(
        summary,
        ["cms", "name", "full_name", "user_name"],
        "Learner",
      ),
      total_attempts: toNumber(
        pickFirst(summary?.key_metrics, ["total_attempts", "totalAttempts"]),
      ),
      time_practicing: toNumber(
        pickFirst(summary?.key_metrics, [
          "time_practicing_days",
          "time_practicing",
          "timePracticing",
        ]),
      ),
      scenarios_played: toNumber(
        pickFirst(summary?.key_metrics ?? summary, [
          "variants_played",
          "scenarios_played",
          "scenariosPlayed",
        ]),
      ),
      growth_streak: toNumber(
        pickFirst(summary?.key_metrics, [
          "growth_streak_days",
          "growth_streak",
        ]),
      ),
      key_metrics_details: {
        total_attempts: pickMetricDetail(summary?.key_metrics, [
          "total_attempts",
          "totalAttempts",
        ]),
        time_practicing: pickMetricDetail(summary?.key_metrics, [
          "time_practicing_days",
          "time_practicing",
          "timePracticing",
        ]),
        scenarios_played: pickMetricDetail(summary?.key_metrics, [
          "variants_played",
          "scenarios_played",
          "scenariosPlayed",
        ]),
        growth_streak: pickMetricDetail(summary?.key_metrics, [
          "growth_streak_days",
          "growth_streak",
        ]),
      },
      avg_performance: toNumber(
        pickFirst(summary, [
          "average_score",
          "avg_performance",
          "avgPerformance",
        ]),
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
      pickFirst(rawUser, ["total_attempts", "totalAttempts"]),
    ),
    time_practicing: toNumber(
      pickFirst(rawUser, ["time_practicing", "timePracticing"]),
    ),
    scenarios_played: toNumber(
      pickFirst(rawUser, ["scenarios_played", "scenariosPlayed"]),
    ),
    growth_streak: toNumber(
      pickFirst(rawUser, ["growth_streak", "growthStreak"]),
    ),
    key_metrics_details: {
      total_attempts: pickMetricDetail(rawUser, [
        "total_attempts",
        "totalAttempts",
      ]),
      time_practicing: pickMetricDetail(rawUser, [
        "time_practicing",
        "timePracticing",
      ]),
      scenarios_played: pickMetricDetail(rawUser, [
        "scenarios_played",
        "scenariosPlayed",
      ]),
      growth_streak: pickMetricDetail(rawUser, [
        "growth_streak",
        "growthStreak",
      ]),
    },
    avg_performance: toNumber(
      pickFirst(rawUser, ["avg_performance", "avgPerformance"]),
    ),
    focus_area: toArray(pickFirst(rawUser, ["focus_area", "focusArea"])),
    growth_level: toArray(pickFirst(rawUser, ["growth_level", "growthLevel"])),
    conversation_moves_color: toArray(
      pickFirst(rawUser, [
        "conversation_moves_color",
        "conversationMovesColor",
      ]),
    ),
    next_steps: pickFirst(rawUser, ["next_steps", "nextSteps"], ""),
    raw: rawUser,
  };
}

async function callDashboardMetricsFunction(payload) {
  const functionName =
    import.meta.env.VITE_DASHBOARD_METRICS_FUNCTION || DEFAULT_FUNCTION_NAME;
  const {data, error} = await supabase.functions.invoke(functionName, {
    body: payload,
  });

  if (error) {
    throw error;
  }

  return data;
}

async function callFeedbackCountFunction(payload) {
  const functionName =
    import.meta.env.VITE_FEEDBACK_COUNT_FUNCTION || "feedback_count";
  const {data, error} = await supabase.functions.invoke(functionName, {
    body: payload,
  });

  if (error) {
    throw error;
  }

  return data;
}

async function callTotalPlaytimeFunction(payload) {
  const functionName =
    import.meta.env.VITE_TOTAL_PLAYTIME_FUNCTION || "total_playtime";
  const {data, error} = await supabase.functions.invoke(functionName, {
    body: payload,
  });

  if (error) {
    throw error;
  }

  return data;
}

async function callStreakCountFunction(payload) {
  const functionName =
    import.meta.env.VITE_STREAK_COUNT_FUNCTION || "streak_count";
  const {data, error} = await supabase.functions.invoke(functionName, {
    body: payload,
  });

  if (error) {
    throw error;
  }

  return data;
}

export function useDashboardData(
  userId = "24eba44c-10c0-47d0-a293-9c02b7c3ec9a",
) {
  const [dashboardData, setDashboardData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);

      const payload = {userId, user_id: userId, userid: userId};
      try {
        const data = await callDashboardMetricsFunction(payload);
        const feedbackCountData = await callFeedbackCountFunction(payload);
        const totalPlaytimeData = await callTotalPlaytimeFunction(payload);
        const streakCountData = await callStreakCountFunction(payload);
        const rawUserData = pickUserObject(data, userId);
        const normalizedUserData = normalizeUserData(rawUserData, userId);
        const feedbackCount = toNumber(
          pickFirst(feedbackCountData, [
            "total_attempts",
            "totalAttempts",
            "count",
            "feedback_count",
            "feedbackCount",
          ]),
          normalizedUserData?.total_attempts ?? 0,
        );
        const totalPlaytime = toNumber(
          pickFirst(totalPlaytimeData, [
            "time_practicing",
            "timePracticing",
            "total_playtime",
            "totalPlaytime",
            "minutes",
            "seconds",
            "total_seconds",
          ]),
          normalizedUserData?.time_practicing ?? 0,
        );
        const streakCount = toNumber(
          pickFirst(streakCountData, [
            "growth_streak_days",
            "growth_streak",
            "streak_count",
            "streakCount",
            "count",
          ]),
          normalizedUserData?.growth_streak ?? 0,
        );
        const mergedUserData = normalizedUserData
          ? {
              ...normalizedUserData,
              total_attempts: feedbackCount,
              time_practicing: totalPlaytime,
              growth_streak: streakCount,
            }
          : normalizedUserData;

        setDashboardData(Array.isArray(data) ? data : [data]);
        setUserData(mergedUserData);
      } catch (fetchError) {
        console.error("Supabase edge function error:", fetchError);
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [userId]);

  return {dashboardData, userData, loading, error};
}
