import React from "react";
import { cn } from "@/lib/utils";
import { UniversityMode } from "@/types/gpa";
import { GraduationCap, Building2 } from "lucide-react";

interface ModeSwitcherProps {
  mode: UniversityMode;
  onModeChange: (mode: UniversityMode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  mode,
  onModeChange,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-secondary/50 p-1.5 rounded-2xl gap-1">
        <button
          onClick={() => onModeChange("FPT")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
            mode === "FPT"
              ? "tab-active"
              : "tab-inactive"
          )}
        >
          <GraduationCap className="h-4 w-4" />
          FPT University
        </button>
        <button
          onClick={() => onModeChange("OTHER")}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
            mode === "OTHER"
              ? "tab-active"
              : "tab-inactive"
          )}
        >
          <Building2 className="h-4 w-4" />
          Other University
        </button>
      </div>
    </div>
  );
};
