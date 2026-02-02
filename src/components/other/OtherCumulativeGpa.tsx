import React from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScaleToggle } from "@/components/ScaleToggle";
import { GpaDisplay } from "@/components/GpaDisplay";
import { OtherCumulativeRow, GpaScale } from "@/types/gpa";
import { calculateWeightedCumulativeGpa, generateId } from "@/lib/gpaCalculations";
import { useToast } from "@/hooks/use-toast";

interface OtherCumulativeGpaProps {
  semesters: OtherCumulativeRow[];
  scale: GpaScale;
  onSemestersChange: (semesters: OtherCumulativeRow[]) => void;
  onScaleChange: (scale: GpaScale) => void;
}

export const OtherCumulativeGpa: React.FC<OtherCumulativeGpaProps> = ({
  semesters,
  scale,
  onSemestersChange,
  onScaleChange,
}) => {
  const { toast } = useToast();
  const maxGpa = scale;
  const cumulativeGpa = calculateWeightedCumulativeGpa(semesters);
  const totalCredits = semesters.reduce((sum, s) => sum + s.semesterCredits, 0);

  const addSemester = () => {
    onSemestersChange([
      ...semesters,
      { id: generateId(), semesterGpa: 0, semesterCredits: 15 },
    ]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length <= 1) {
      toast({
        title: "Không thể xóa",
        description: "Phải có ít nhất 1 học kỳ.",
        variant: "destructive",
      });
      return;
    }
    onSemestersChange(semesters.filter((s) => s.id !== id));
  };

  const updateSemester = (
    id: string,
    field: keyof OtherCumulativeRow,
    value: number
  ) => {
    onSemestersChange(
      semesters.map((s) =>
        s.id === id
          ? {
              ...s,
              [field]:
                field === "semesterGpa"
                  ? Math.min(maxGpa, Math.max(0, value))
                  : Math.max(1, value),
            }
          : s
      )
    );
  };

  const fillSample = () => {
    const samples = scale === 10
      ? [
          { id: generateId(), semesterGpa: 7.5, semesterCredits: 18 },
          { id: generateId(), semesterGpa: 8.2, semesterCredits: 21 },
          { id: generateId(), semesterGpa: 7.8, semesterCredits: 15 },
          { id: generateId(), semesterGpa: 8.5, semesterCredits: 18 },
        ]
      : [
          { id: generateId(), semesterGpa: 3.2, semesterCredits: 18 },
          { id: generateId(), semesterGpa: 3.5, semesterCredits: 21 },
          { id: generateId(), semesterGpa: 3.3, semesterCredits: 15 },
          { id: generateId(), semesterGpa: 3.7, semesterCredits: 18 },
        ];
    onSemestersChange(samples);
  };

  return (
    <Card className="card-elevated card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            🎯 GPA Tích Lũy
          </CardTitle>
          <div className="flex items-center gap-2">
            <ScaleToggle scale={scale} onScaleChange={onScaleChange} />
            <Button variant="ghost" size="sm" onClick={fillSample}>
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Nhập GPA và số tín chỉ từng kỳ
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-1">
          <div className="col-span-2 text-center">Kỳ</div>
          <div className="col-span-5 text-center">GPA (0-{maxGpa})</div>
          <div className="col-span-4 text-center">Tín chỉ</div>
          <div className="col-span-1"></div>
        </div>

        {/* Semesters */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {semesters.map((semester, index) => (
            <div
              key={semester.id}
              className="grid grid-cols-12 gap-2 items-center animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="col-span-2 text-center text-sm font-medium text-muted-foreground">
                {index + 1}
              </div>
              <Input
                type="number"
                className="col-span-5 input-gpa text-sm py-2 text-center"
                placeholder="0"
                min={0}
                max={maxGpa}
                step={0.1}
                value={semester.semesterGpa || ""}
                onChange={(e) =>
                  updateSemester(
                    semester.id,
                    "semesterGpa",
                    Number(e.target.value) || 0
                  )
                }
              />
              <Input
                type="number"
                className="col-span-4 input-gpa text-sm py-2 text-center"
                placeholder="15"
                min={1}
                value={semester.semesterCredits || ""}
                onChange={(e) =>
                  updateSemester(
                    semester.id,
                    "semesterCredits",
                    Number(e.target.value) || 1
                  )
                }
              />
              <Button
                variant="ghost"
                size="icon"
                className="col-span-1 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeSemester(semester.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={addSemester}>
            <Plus className="h-4 w-4 mr-1" />
            Thêm học kỳ
          </Button>
          <span className="text-sm text-muted-foreground">
            Tổng: {totalCredits} tín chỉ
          </span>
        </div>

        {/* Result */}
        <div className="pt-4 border-t border-border">
          <GpaDisplay
            value={cumulativeGpa}
            scale={scale}
            label="GPA Tích Lũy"
            size="md"
          />
        </div>
      </CardContent>
    </Card>
  );
};
