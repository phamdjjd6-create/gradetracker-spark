import React, { useState } from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GpaDisplay } from "@/components/GpaDisplay";
import { FptCumulativeRow } from "@/types/gpa";
import { calculateFptCumulativeGpa, generateId } from "@/lib/gpaCalculations";
import { useToast } from "@/hooks/use-toast";

interface FptCumulativeGpaProps {
  rows: FptCumulativeRow[];
  onRowsChange: (rows: FptCumulativeRow[]) => void;
}

export const FptCumulativeGpa: React.FC<FptCumulativeGpaProps> = ({
  rows,
  onRowsChange,
}) => {
  const { toast } = useToast();
  const [weighted, setWeighted] = useState(true);
  const cumulativeGpa = calculateFptCumulativeGpa(rows, weighted);

  const addRow = () => {
    onRowsChange([
      ...rows,
      { id: generateId(), semesterGpa: 0, numCourses: 5 },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) {
      toast({
        title: "Không thể xóa",
        description: "Phải có ít nhất 1 học kỳ.",
        variant: "destructive",
      });
      return;
    }
    onRowsChange(rows.filter((row) => row.id !== id));
  };

  const updateRow = (
    id: string,
    field: keyof FptCumulativeRow,
    value: number
  ) => {
    onRowsChange(
      rows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]:
                field === "semesterGpa"
                  ? Math.min(10, Math.max(0, value))
                  : Math.max(1, value),
            }
          : row
      )
    );
  };

  const fillSample = () => {
    onRowsChange([
      { id: generateId(), semesterGpa: 7.5, numCourses: 6 },
      { id: generateId(), semesterGpa: 8.2, numCourses: 7 },
      { id: generateId(), semesterGpa: 7.8, numCourses: 5 },
      { id: generateId(), semesterGpa: 8.5, numCourses: 6 },
    ]);
  };

  return (
    <Card className="card-elevated card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            🎯 GPA Tích Lũy
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={fillSample}>
            <Sparkles className="h-4 w-4 mr-1" />
            Ví dụ
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Nhập GPA từng kỳ để tính GPA tích lũy
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Weighted toggle */}
        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
          <Label htmlFor="weighted" className="text-sm">
            Tính theo số môn (weighted)
          </Label>
          <Switch
            id="weighted"
            checked={weighted}
            onCheckedChange={setWeighted}
          />
        </div>

        {/* Header */}
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-1">
          <div className="col-span-2 text-center">Kỳ</div>
          <div className="col-span-5 text-center">GPA (0-10)</div>
          <div className="col-span-4 text-center">Số môn</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {rows.map((row, index) => (
            <div
              key={row.id}
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
                max={10}
                step={0.1}
                value={row.semesterGpa || ""}
                onChange={(e) =>
                  updateRow(row.id, "semesterGpa", Number(e.target.value) || 0)
                }
              />
              <Input
                type="number"
                className="col-span-4 input-gpa text-sm py-2 text-center"
                placeholder="5"
                min={1}
                value={row.numCourses || ""}
                onChange={(e) =>
                  updateRow(row.id, "numCourses", Number(e.target.value) || 1)
                }
                disabled={!weighted}
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

        {/* Add button */}
        <Button variant="outline" size="sm" onClick={addRow} className="w-full">
          <Plus className="h-4 w-4 mr-1" />
          Thêm học kỳ
        </Button>

        {/* Result */}
        <div className="pt-4 border-t border-border">
          <GpaDisplay
            value={cumulativeGpa}
            scale={10}
            label="GPA Tích Lũy"
            size="md"
          />
          <p className="text-center text-xs text-muted-foreground mt-2">
            {weighted ? "Tính theo số môn" : "Trung bình cộng"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
