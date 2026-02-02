import React from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GpaDisplay } from "@/components/GpaDisplay";
import { CourseAverageRow } from "@/types/gpa";
import {
  calculateCourseAverage,
  generateId,
  validateWeightTotal,
} from "@/lib/gpaCalculations";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FptCourseAverageProps {
  rows: CourseAverageRow[];
  onRowsChange: (rows: CourseAverageRow[]) => void;
}

export const FptCourseAverage: React.FC<FptCourseAverageProps> = ({
  rows,
  onRowsChange,
}) => {
  const { toast } = useToast();
  const average = calculateCourseAverage(rows);
  const totalWeight = rows.reduce((sum, row) => sum + row.weight, 0);
  const isWeightValid = validateWeightTotal(rows.map((r) => r.weight));

  const addRow = () => {
    onRowsChange([
      ...rows,
      { id: generateId(), name: "", score: 0, weight: 0 },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) {
      toast({
        title: "Không thể xóa",
        description: "Phải có ít nhất 1 thành phần điểm.",
        variant: "destructive",
      });
      return;
    }
    onRowsChange(rows.filter((row) => row.id !== id));
  };

  const updateRow = (id: string, field: keyof CourseAverageRow, value: string | number) => {
    onRowsChange(
      rows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]:
                field === "score"
                  ? Math.min(10, Math.max(0, Number(value) || 0))
                  : field === "weight"
                  ? Math.min(100, Math.max(0, Number(value) || 0))
                  : value,
            }
          : row
      )
    );
  };

  const fillSample = () => {
    onRowsChange([
      { id: generateId(), name: "Attendance", score: 9, weight: 10 },
      { id: generateId(), name: "Assignment", score: 8.5, weight: 20 },
      { id: generateId(), name: "Progress Test", score: 7.5, weight: 30 },
      { id: generateId(), name: "Final Exam", score: 8, weight: 40 },
    ]);
  };

  return (
    <Card className="card-elevated card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            📚 Điểm Trung Bình Môn
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={fillSample}>
            <Sparkles className="h-4 w-4 mr-1" />
            Ví dụ
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Nhập điểm từng thành phần và trọng số (tổng = 100%)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-1">
          <div className="col-span-5">Tên thành phần</div>
          <div className="col-span-3 text-center">Điểm (0-10)</div>
          <div className="col-span-3 text-center">Trọng số (%)</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="grid grid-cols-12 gap-2 items-center animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Input
                className="col-span-5 input-gpa text-sm py-2"
                placeholder="VD: Final Exam"
                value={row.name}
                onChange={(e) => updateRow(row.id, "name", e.target.value)}
              />
              <Input
                type="number"
                className="col-span-3 input-gpa text-sm py-2 text-center"
                placeholder="0"
                min={0}
                max={10}
                step={0.1}
                value={row.score || ""}
                onChange={(e) => updateRow(row.id, "score", e.target.value)}
              />
              <Input
                type="number"
                className="col-span-3 input-gpa text-sm py-2 text-center"
                placeholder="0"
                min={0}
                max={100}
                value={row.weight || ""}
                onChange={(e) => updateRow(row.id, "weight", e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="col-span-1 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeRow(row.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Weight indicator */}
        <div className="flex items-center justify-between px-1">
          <Button variant="outline" size="sm" onClick={addRow}>
            <Plus className="h-4 w-4 mr-1" />
            Thêm dòng
          </Button>
          <span
            className={cn(
              "text-sm font-medium",
              isWeightValid ? "text-success" : "text-destructive"
            )}
          >
            Tổng: {totalWeight}% {isWeightValid ? "✓" : "(phải = 100%)"}
          </span>
        </div>

        {/* Result */}
        <div className="pt-4 border-t border-border">
          <GpaDisplay
            value={isWeightValid ? average : 0}
            scale={10}
            label="Điểm trung bình môn"
            size="md"
          />
          {!isWeightValid && (
            <p className="text-center text-sm text-destructive mt-2">
              Điều chỉnh trọng số để tổng = 100%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
