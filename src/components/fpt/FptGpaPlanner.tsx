import React from "react";
import { Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GpaDisplay } from "@/components/GpaDisplay";
import { FptPlanner } from "@/types/gpa";
import { calculateFptRequiredGpa, formatGpa } from "@/lib/gpaCalculations";
import { cn } from "@/lib/utils";

interface FptGpaPlannerProps {
  planner: FptPlanner;
  onPlannerChange: (planner: FptPlanner) => void;
}

export const FptGpaPlanner: React.FC<FptGpaPlannerProps> = ({
  planner,
  onPlannerChange,
}) => {
  const result = calculateFptRequiredGpa(
    planner.totalSemesters,
    planner.completedSemesters,
    planner.currentGpa,
    planner.targetGpa
  );

  const updateField = (field: keyof FptPlanner, value: number) => {
    let validValue = value;
    
    switch (field) {
      case "totalSemesters":
        validValue = Math.max(1, Math.min(12, value));
        break;
      case "completedSemesters":
        validValue = Math.max(0, Math.min(planner.totalSemesters, value));
        break;
      case "currentGpa":
      case "targetGpa":
        validValue = Math.max(0, Math.min(10, value));
        break;
    }

    onPlannerChange({ ...planner, [field]: validValue });
  };

  const fillSample = () => {
    onPlannerChange({
      totalSemesters: 9,
      completedSemesters: 4,
      currentGpa: 7.8,
      targetGpa: 8.5,
    });
  };

  const remaining = planner.totalSemesters - planner.completedSemesters;
  const progressPercent = (planner.completedSemesters / planner.totalSemesters) * 100;

  return (
    <Card className="card-elevated card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            🎓 Kế Hoạch GPA
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={fillSample}>
            <Target className="h-4 w-4 mr-1" />
            Ví dụ
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Lập kế hoạch đạt GPA mục tiêu (FPT: 9 kỳ)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tiến độ học tập</span>
            <span className="font-medium">
              {planner.completedSemesters}/{planner.totalSemesters} kỳ
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Tổng số kỳ</Label>
            <Input
              type="number"
              className="input-gpa text-center"
              min={1}
              max={12}
              value={planner.totalSemesters}
              onChange={(e) =>
                updateField("totalSemesters", Number(e.target.value) || 9)
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Kỳ đã hoàn thành</Label>
            <Input
              type="number"
              className="input-gpa text-center"
              min={0}
              max={planner.totalSemesters}
              value={planner.completedSemesters}
              onChange={(e) =>
                updateField("completedSemesters", Number(e.target.value) || 0)
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">GPA hiện tại</Label>
            <Input
              type="number"
              className="input-gpa text-center"
              min={0}
              max={10}
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
              max={10}
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
          {remaining > 0 && result.feasible && (
            <GpaDisplay
              value={result.required}
              scale={10}
              label={`GPA cần đạt cho ${remaining} kỳ còn lại`}
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
          {result.feasible && remaining > 0 && result.required > 0 && (
            <div className="flex items-start gap-3 p-4 bg-accent rounded-xl">
              <TrendingUp className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent-foreground" />
              <div className="text-sm text-accent-foreground">
                <p className="font-medium mb-1">Mẹo:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>
                    Mỗi kỳ cần đạt ít nhất {formatGpa(result.required)} điểm
                  </li>
                  <li>
                    Tập trung vào các môn có nhiều thành phần điểm
                  </li>
                  <li>
                    Không bỏ lỡ điểm chuyên cần và bài tập
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
