import { Button } from "@/components/ui/button";
import { Settings, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b-2 border-[var(--brand-primary)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🦋</div>
            <h1 className="text-2xl text-[#000000] bg-clip-text">
              <span className="font-bold">Transform</span> <span className="font-light">VXR</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button className="text-right bg-[var(--brand-button)] hover:bg-[var(--brand-button-hover)] text-white border-none">
              <div className="flex flex-row items-end">
                <p className="text-sm text-white-400">Level: </p>
                <p className="font-semibold text-white-700"> Metamorphosis</p>
              </div>
                  </Button>
                  <button type="button" className="text-gray-500 hover:text-gray-700 transition">
              <Settings className="h-5 w-5" />
            </button>
            <button type="button" className="text-gray-500 hover:text-gray-700 transition">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
  );
}