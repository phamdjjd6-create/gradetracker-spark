import React from "react";
import { cn } from "@/lib/utils";
import { GpaScale } from "@/types/gpa";

interface ScaleToggleProps {
  scale: GpaScale;
  onScaleChange: (scale: GpaScale) => void;
  disabled?: boolean;
}

export const ScaleToggle: React.FC<ScaleToggleProps> = ({
  scale,
  onScaleChange,
  disabled = false,
}) => {
  return (
    <div className="inline-flex bg-secondary/50 p-0.5 rounded-lg text-xs">
      <button
        onClick={() => onScaleChange(10)}
        disabled={disabled}
        className={cn(
          "px-3 py-1 rounded-md font-medium transition-all",
          scale === 10
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        Hệ 10
      </button>
      <button
        onClick={() => onScaleChange(4)}
        disabled={disabled}
        className={cn(
          "px-3 py-1 rounded-md font-medium transition-all",
          scale === 4
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        Hệ 4
      </button>
    </div>
  );
};
