import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("dashboard-root");
if (!container) {
  throw new Error("Dashboard root element not found");
}
container.classList.add("my-dashboard");

function resolveInitialUserId(mountNode) {
  const fromContainer = mountNode.dataset.userId;
  const fromGlobalConfig = window.tvxrDashboardConfig?.userId;
  const fromGlobal = window.TVXR_DASHBOARD_USER_ID;
  const fromQuery = new URLSearchParams(window.location.search).get("userId");

  return fromContainer || fromGlobalConfig || fromGlobal || fromQuery || "user1";
}

function DashboardRoot() {
  const [userId, setUserId] = useState(() => resolveInitialUserId(container));

  useEffect(() => {
    function handleUserChange(event) {
      const nextUserId = event?.detail?.userId;
      if (nextUserId) {
        setUserId(nextUserId);
      }
    }

    window.addEventListener("tvxr-dashboard:set-user", handleUserChange);
    return () =>
      window.removeEventListener("tvxr-dashboard:set-user", handleUserChange);
  }, []);

  return <App userId={userId} />;
}

createRoot(container).render(
  <StrictMode>
    <DashboardRoot />
  </StrictMode>,
);
