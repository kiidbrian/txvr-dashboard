import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Bell, Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b-2 border-(--brand-primary)">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🦋</div>
          <h1 className="text-2xl text-black">
            <span className="font-bold">Transform</span> <span className="font-light">VXR</span>
          </h1>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <Button className="bg-(--brand-button) hover:bg-(--brand-button-hover) text-white border-none rounded-full px-5">
            <span className="text-sm">Level:</span>
            <span className="font-semibold ml-1">Metamorphosis ⚡</span>
          </Button>
          <button type="button" className="text-gray-400 hover:text-gray-600 transition">
            <Settings className="h-5 w-5" />
          </button>
          <button type="button" className="text-gray-400 hover:text-gray-600 transition">
            <Bell className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-gray-600 hover:text-gray-800 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-pink-100 bg-white px-6 py-4 flex flex-col gap-3">
          <Button className="bg-(--brand-button) hover:bg-(--brand-button-hover) text-white border-none rounded-full w-full">
            <span className="text-sm">Level:</span>
            <span className="font-semibold ml-1">Metamorphosis ⚡</span>
          </Button>
          <div className="flex items-center gap-4">
            <button type="button" className="text-gray-400 hover:text-gray-600 transition">
              <Settings className="h-5 w-5" />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-600 transition">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
