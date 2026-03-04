import { THEMES } from "../constants";
import { useThemeStore } from "../store/useTheamStore";
import { X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const Navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 pt-20 max-w-5xl relative">

      <button
        onClick={() => Navigate("/")}
        className="absolute top-20 right-4 btn btn-ghost btn-circle"
      >
        <X size={24} />
      </button>
      <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Aesthetic Themes</h1>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all border-2
                ${theme === t ? "border-primary bg-base-300 shadow-lg" : "border-transparent hover:bg-base-200"}`}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-10 w-full rounded-lg overflow-hidden border border-base-content/10" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-1 p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage
