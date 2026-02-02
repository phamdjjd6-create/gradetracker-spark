import React from "react";
import { Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScaleToggle } from "@/components/ScaleToggle";
import { GpaDisplay } from "@/components/GpaDisplay";
import { OtherPlanner, GpaScale } from "@/types/gpa";
import { calculateOtherRequiredGpa, formatGpa } from "@/lib/gpaCalculations";
import { cn } from "@/lib/utils";

interface OtherGpaPlannerProps {
  planner: OtherPlanner;
  scale: GpaScale;
  onPlannerChange: (planner: OtherPlanner) => void;
  onScaleChange: (scale: GpaScale) => void;
}

export const OtherGpaPlanner: React.FC<OtherGpaPlannerProps> = ({
  planner,
  scale,
  onPlannerChange,
  onScaleChange,
}) => {
  const maxGpa = scale;
  const result = calculateOtherRequiredGpa(
    planner.totalCredits,
    planner.completedCredits,
    planner.currentGpa,
    planner.targetGpa,
    scale
  );

  const remainingCredits = planner.totalCredits - planner.completedCredits;
  const progressPercent = (planner.completedCredits / planner.totalCredits) * 100;

  const updateField = (field: keyof OtherPlanner, value: number) => {
    let validValue = value;

    switch (field) {
      case "totalSemesters":
        validValue = Math.max(1, Math.min(12, value));
        break;
      case "completedSemesters":
        validValue = Math.max(0, Math.min(planner.totalSemesters, value));
        break;
      case "totalCredits":
        validValue = Math.max(1, value);
        break;
      case "completedCredits":
        validValue = Math.max(0, Math.min(planner.totalCredits, value));
        break;
      case "currentGpa":
      case "targetGpa":
        validValue = Math.max(0, Math.min(maxGpa, value));
        break;
    }

    onPlannerChange({ ...planner, [field]: validValue });
  };

  const fillSample = () => {
    onPlannerChange({
      completedSemesters: 4,
      completedCredits: 60,
      currentGpa: scale === 10 ? 7.8 : 3.2,
      targetGpa: scale === 10 ? 8.5 : 3.5,
      totalCredits: 120,
      totalSemesters: 8,
      creditsRemainingPerSemester: [],
    });
  };

  return (
    <Card className="card-elevated card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            🎓 Kế Hoạch GPA
          </CardTitle>
          <div className="flex items-center gap-2">
            <ScaleToggle scale={scale} onScaleChange={onScaleChange} />
            <Button variant="ghost" size="sm" onClick={fillSample}>
              <Target className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Lập kế hoạch đạt GPA mục tiêu theo tín chỉ
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tiến độ tín chỉ</span>
            <span className="font-medium">
              {planner.completedCredits}/{planner.totalCredits} tín chỉ
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Tổng tín chỉ</Label>
            <Input
              type="number"
              className="input-gpa text-center"
              min={1}
              value={planner.totalCredits}
              onChange={(e) =>
                updateField("totalCredits", Number(e.target.value) || 120)
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Tín chỉ đã hoàn thành
            </Label>
            <Input
              type="number"
              className="input-gpa text-center"
              min={0}
              max={planner.totalCredits}
              value={planner.completedCredits}
              onChange={(e) =>
                updateField("completedCredits", Number(e.target.value) || 0)
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">GPA hiện tại</Label>
            <Input
              type="number"
              className="input-gpa text-center"
              min={0}
              max={maxGpa}
              step={0.1}
              value={planner.currentGpa || ""}
              onChange={(e) =>
                updateField("currentGpa", Number(e.target.value) || 0)
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">GPA mục tiêu</Label>
            <Input
              type="number"
              className="input-gpa text-center"
              min={0}
              max={maxGpa}
              step={0.1}
              value={planner.targetGpa || ""}
              onChange={(e) =>
                updateField("targetGpa", Number(e.target.value) || 0)
              }
            />
          </div>
        </div>

        {/* Result */}
        <div className="pt-4 border-t border-border space-y-4">
          {remainingCredits > 0 && result.feasible && (
            <GpaDisplay
              value={result.required}
              scale={scale}
              label={`GPA cần đạt cho ${remainingCredits} tín chỉ còn lại`}
              size="md"
            />
          )}

          {/* Status message */}
          <div
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl",
              result.feasible
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {result.feasible ? (
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{result.message}</p>
          </div>

          {/* Tips */}
          {result.feasible && remainingCredits > 0 && result.required > 0 && (
            <div className="flex items-start gap-3 p-4 bg-accent rounded-xl">
              <TrendingUp className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent-foreground" />
              <div className="text-sm text-accent-foreground">
                <p className="font-medium mb-1">Mẹo:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>
                    Ưu tiên môn có nhiều tín chỉ để tăng GPA nhanh hơn
                  </li>
                  <li>
                    Cân nhắc retake các môn điểm thấp nếu được phép
                  </li>
                  <li>
                    Duy trì đều đặn GPA {formatGpa(result.required)} mỗi kỳ
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
