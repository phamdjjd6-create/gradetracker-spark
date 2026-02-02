import React from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GpaDisplay } from "@/components/GpaDisplay";
import { FptSemester, FptSemesterCourse } from "@/types/gpa";
import { calculateFptSemesterGpa, generateId } from "@/lib/gpaCalculations";
import { useToast } from "@/hooks/use-toast";

interface FptSemesterGpaProps {
  semesters: FptSemester[];
  onSemestersChange: (semesters: FptSemester[]) => void;
}

export const FptSemesterGpa: React.FC<FptSemesterGpaProps> = ({
  semesters,
  onSemestersChange,
}) => {
  const { toast } = useToast();
  const currentSemester = semesters[0] || {
    id: generateId(),
    courses: [{ id: generateId(), name: "", score: 0 }],
  };
  const gpa = calculateFptSemesterGpa(currentSemester.courses.map((c) => c.score));

  const updateCourses = (courses: FptSemesterCourse[]) => {
    onSemestersChange([{ ...currentSemester, courses }]);
  };

  const addCourse = () => {
    updateCourses([
      ...currentSemester.courses,
      { id: generateId(), name: "", score: 0 },
    ]);
  };

  const removeCourse = (id: string) => {
    if (currentSemester.courses.length <= 1) {
      toast({
        title: "Không thể xóa",
        description: "Phải có ít nhất 1 môn học.",
        variant: "destructive",
      });
      return;
    }
    updateCourses(currentSemester.courses.filter((c) => c.id !== id));
  };

  const updateCourse = (
    id: string,
    field: keyof FptSemesterCourse,
    value: string | number
  ) => {
    updateCourses(
      currentSemester.courses.map((c) =>
        c.id === id
          ? {
              ...c,
              [field]:
                field === "score"
                  ? Math.min(10, Math.max(0, Number(value) || 0))
                  : value,
            }
          : c
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index === currentSemester.courses.length - 1) {
        addCourse();
        // Focus will be handled by useEffect in a real implementation
      }
    }
  };

  const fillSample = () => {
    updateCourses([
      { id: generateId(), name: "PRF192", score: 8.5 },
      { id: generateId(), name: "CEA201", score: 7.8 },
      { id: generateId(), name: "CSI106", score: 9.0 },
      { id: generateId(), name: "MAE101", score: 7.2 },
      { id: generateId(), name: "SSL101c", score: 8.0 },
    ]);
  };

  return (
    <Card className="card-elevated card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            📊 GPA Học Kỳ
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={fillSample}>
            <Sparkles className="h-4 w-4 mr-1" />
            Ví dụ
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Nhập điểm các môn trong kỳ (hệ 10, không tín chỉ)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-1">
          <div className="col-span-7">Tên môn học</div>
          <div className="col-span-4 text-center">Điểm (0-10)</div>
          <div className="col-span-1"></div>
        </div>

        {/* Courses */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {currentSemester.courses.map((course, index) => (
            <div
              key={course.id}
              className="grid grid-cols-12 gap-2 items-center animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Input
                className="col-span-7 input-gpa text-sm py-2"
                placeholder="VD: PRF192"
                value={course.name}
                onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
              <Input
                type="number"
                className="col-span-4 input-gpa text-sm py-2 text-center"
                placeholder="0"
                min={0}
                max={10}
                step={0.1}
                value={course.score || ""}
                onChange={(e) => updateCourse(course.id, "score", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="col-span-1 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeCourse(course.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add button */}
        <Button variant="outline" size="sm" onClick={addCourse} className="w-full">
          <Plus className="h-4 w-4 mr-1" />
          Thêm môn (hoặc nhấn Enter)
        </Button>

        {/* Result */}
        <div className="pt-4 border-t border-border">
          <GpaDisplay value={gpa} scale={10} label="GPA Học Kỳ" size="md" />
        </div>
      </CardContent>
    </Card>
  );
};
