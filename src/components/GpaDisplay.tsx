import React from "react";
import { cn } from "@/lib/utils";
import { formatGpa, getGpaBadgeClass } from "@/lib/gpaCalculations";
import { GpaScale } from "@/types/gpa";

interface GpaDisplayProps {
  value: number;
  scale?: GpaScale;
  label?: string;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
}

export const GpaDisplay: React.FC<GpaDisplayProps> = ({
  value,
  scale = 10,
  label,
  size = "md",
  showProgress = true,
}) => {
  const badgeClass = getGpaBadgeClass(value, scale);
  const maxValue = scale;
  const percentage = (value / maxValue) * 100;

  const sizeClasses = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      )}
      <div
        className={cn(
          "font-bold tabular-nums",
          sizeClasses[size],
          badgeClass,
          "px-4 py-2 rounded-xl"
        )}
      >
        {formatGpa(value)} / {maxValue}
      </div>
      {showProgress && (
        <div className="w-full max-w-32 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              value >= maxValue * 0.85
                ? "bg-success"
                : value >= maxValue * 0.7
                ? "bg-primary"
                : value >= maxValue * 0.5
                ? "bg-warning"
                : "bg-destructive"
            )}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};
