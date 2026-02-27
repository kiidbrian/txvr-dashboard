import { useState } from "react";
import "@/App.css";

import { useDashboardData, useRiqs, useGrowthProgress } from "@/hooks";
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

export default function App({ userId }) {
  const [selectedFocusArea, setSelectedFocusArea] = useState(0);
  const [isMoveHovering, setIsMoveHovering] = useState(false);

  const { userData, loading: loadingDashboard } = useDashboardData(userId);
  const { getMovesForFocusArea, loading: loadingRiqs } = useRiqs();
  const { wingsUnlocked, butterflyState, allUnlocked } =
    useGrowthProgress(userData?.focus_area, userData?.practice_all_unlocked);

  const movesForSelectedArea = getMovesForFocusArea(selectedFocusArea);
  const selectedFocusAreaName = FOCUS_AREAS[selectedFocusArea] ?? null;

  const handleStartPractice = () => {
    const detail = {
      userId: userData?.userid ?? userId ?? null,
      selectedFocusArea: selectedFocusAreaName,
      nextStep: userData?.next_steps ?? null,
    };

    window.dispatchEvent(
      new CustomEvent("tvxr-dashboard:start-practice", { detail })
    );
  };

  return (
    <div className="min-h-screen relative">
      {isMoveHovering && (
        <div className="fixed inset-0 bg-[#0A0A0A1F] pointer-events-none z-30" />
      )}
      <Header />
      <div className="w-full max-w-6xl mx-auto grid gap-6 p-6">
        {/* Welcome */}
        <WelcomeBanner name={userData?.name ?? "Jonas"} />
        {/* Overall Growth */}
        <GrowthStages
          loading={loadingDashboard}
          wingsUnlocked={wingsUnlocked}
          butterflyState={butterflyState}
          avgPerformance={userData?.avg_performance}
        />

        {/* Focus Areas */}
        <FocusAreasGrid
          selectedIndex={selectedFocusArea}
          onSelect={setSelectedFocusArea}
          loading={loadingDashboard}
          focusAreaValues={userData?.focus_area}
          growthLevels={userData?.growth_level}
          allUnlocked={allUnlocked}
        />

        {/* Conversation Moves + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <ConversationMoves
            moves={movesForSelectedArea}
            loading={loadingRiqs}
            moveColors={userData?.conversation_moves_color}
            onMoveHoverChange={setIsMoveHovering}
          />
          <PracticeCard
            loading={loadingDashboard}
            nextSteps={userData?.next_steps}
            onStartPractice={handleStartPractice}
          />
        </div>

        {/* Stats */}
        <StatsGrid userData={userData} loading={loadingDashboard} />
      </div>
    </div>
  );
}
