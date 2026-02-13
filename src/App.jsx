import { useState } from "react";
import "@/App.css";

import { useDashboardData, useRiqs } from "@/hooks";
import {
  Header,
  GrowthStages,
  FocusAreasGrid,
  ConversationMoves,
  PracticeCard,
  StatsGrid,
  TipCard,
} from "@/components";

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid gap-6">
        <Header />

        {/* Welcome */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-white-600 to-pink-600 flex items-center justify-center text-white text-2xl border-2 border-[var(--brand-primary)] border-b-2">
              👨🏾
            </div>
            <div>
              <h2 className="text-lg text-(--brand-primary) font-bold">
                Welcome back, {"Jonas"} 
              </h2>
              <p className="text-gray-600">
                Your transformation journey continues. Keep building your wings!
              </p>
            </div>
          </div>
        </div>
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
          />
        </div>

        {/* Stats */}
        <StatsGrid userData={userData} loading={loadingDashboard} />

        {/* Tip */}
        <TipCard>
          Learners reaching <span className="font-bold">"Emerging Butterfly"</span> practiced across at least 3 scenarios per skill.
        </TipCard>
      </div>
    </div>
  );
}
