import { useState } from "react";
import "@/App.css";

import { useDashboardData, useRiqs } from "@/hooks";
import {
  Header,
  WelcomeBanner,
  GrowthStages,
  FocusAreasGrid,
  ConversationMoves,
  PracticeCard,
  StatsGrid,
} from "@/components";
import { FOCUS_AREAS } from "@/constants";

export default function App() {
  const [selectedFocusArea, setSelectedFocusArea] = useState(0);

  const { userData, loading: loadingDashboard,  } = useDashboardData("user1");
  const { getMovesForFocusArea, loading: loadingRiqs } = useRiqs();

  const movesForSelectedArea = getMovesForFocusArea(selectedFocusArea);

  const handleStartPractice = () => {
    // TODO: Implement practice start logic (e.g., open modal with iframe)
    console.log("Starting practice...");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full max-w-6xl mx-auto grid gap-6 p-6">

        {/* Welcome */}
        <WelcomeBanner name={userData?.name ?? "Jonas"} />
        {/* Overall Growth */}
        <GrowthStages currentStageIndex={3} />

        {/* Focus Areas */}
        <FocusAreasGrid
          selectedIndex={selectedFocusArea}
          onSelect={setSelectedFocusArea}
          loading={loadingDashboard}
          focusAreaValues={userData?.focus_area}
        />

        {/* Conversation Moves + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <ConversationMoves moves={movesForSelectedArea} loading={loadingRiqs} />
          <PracticeCard
            nextSteps={userData?.next_steps}
            onStartPractice={handleStartPractice}
            selectedFocusArea={FOCUS_AREAS[selectedFocusArea]}
          />
        </div>

        {/* Stats */}
        <StatsGrid userData={userData} loading={loadingDashboard} />
      </div>
    </div>
  );
}
