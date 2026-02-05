import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

export function useDashboardData(userId = "user1") {
  const [dashboardData, setDashboardData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("dashboard")
        .select("*")
        .order("created_at", { descending: true });

      if (fetchError) {
        console.error("Supabase error:", fetchError);
        setError(fetchError);
        setLoading(false);
        return;
      }

      setDashboardData(data ?? []);
      
      // Find current user data
      const currentUserData = data?.find((row) => row.userid === userId);
      if (currentUserData) {
        setUserData(currentUserData);
      }
      
      setLoading(false);
    }

    fetchDashboardData();
  }, [userId]);

  return { dashboardData, userData, loading, error };
}
