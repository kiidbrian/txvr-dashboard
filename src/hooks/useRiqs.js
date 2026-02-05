import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { FOCUS_AREAS } from "@/constants";

export function useRiqs() {
  const [riqs, setRiqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRiqs() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("riq")
        .select("focus_area, display_label")
        .order("created_at", { descending: true });

      if (fetchError) {
        console.error("Supabase error:", fetchError);
        setError(fetchError);
        setLoading(false);
        return;
      }

      setRiqs(data ?? []);
      setLoading(false);
    }

    fetchRiqs();
  }, []);

  // Build { focusArea: [display_label, ...] }
  const focusAreaToDisplayLabels = riqs.reduce((acc, riq) => {
    const focusArea = riq.focus_area?.trim?.();
    const displayLabel = riq.display_label?.trim?.();
    if (!focusArea || !displayLabel) return acc;
    if (!acc[focusArea]) acc[focusArea] = [];
    acc[focusArea].push(displayLabel);
    return acc;
  }, {});

  const getMovesForFocusArea = (selectedIndex) => {
    if (selectedIndex === 4) {
      return FOCUS_AREAS.slice(0, 4).flatMap(
        (fa) => focusAreaToDisplayLabels[fa] ?? []
      );
    }
    return focusAreaToDisplayLabels[FOCUS_AREAS[selectedIndex]] ?? [];
  };

  return { riqs, focusAreaToDisplayLabels, getMovesForFocusArea, loading, error };
}
