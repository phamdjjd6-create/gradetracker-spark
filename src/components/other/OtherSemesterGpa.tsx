import React from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScaleToggle } from "@/components/ScaleToggle";
import { GpaDisplay } from "@/components/GpaDisplay";
import { OtherSemesterCourse, GpaScale } from "@/types/gpa";
import { calculateWeightedSemesterGpa, generateId } from "@/lib/gpaCalculations";
import { useToast } from "@/hooks/use-toast";

interface OtherSemesterGpaProps {
  courses: OtherSemesterCourse[];
  scale: GpaScale;
  onCoursesChange: (courses: OtherSemesterCourse[]) => void;
  onScaleChange: (scale: GpaScale) => void;
}

export const OtherSemesterGpa: React.FC<OtherSemesterGpaProps> = ({
  courses,
  scale,
  onCoursesChange,
  onScaleChange,
}) => {
  const { toast } = useToast();
  const maxGrade = scale;
  const gpa = calculateWeightedSemesterGpa(
    courses.map((c) => ({ grade: c.grade, credits: c.credits }))
  );
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

  const addCourse = () => {
    onCoursesChange([
      ...courses,
      { id: generateId(), courseName: "", grade: 0, credits: 3 },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) {
      toast({
        title: "Không thể xóa",
        description: "Phải có ít nhất 1 môn học.",
        variant: "destructive",
      });
      return;
    }
    onCoursesChange(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (
    id: string,
    field: keyof OtherSemesterCourse,
    value: string | number
  ) => {
    onCoursesChange(
      courses.map((c) =>
        c.id === id
          ? {
              ...c,
              [field]:
                field === "grade"
                  ? Math.min(maxGrade, Math.max(0, Number(value) || 0))
                  : field === "credits"
                  ? Math.max(1, Number(value) || 1)
                  : value,
            }
          : c
      )
    );
  };

  const fillSample = () => {
    const sampleCourses = scale === 10
      ? [
          { id: generateId(), courseName: "Toán cao cấp", grade: 8.5, credits: 3 },
          { id: generateId(), courseName: "Vật lý", grade: 7.8, credits: 2 },
          { id: generateId(), courseName: "Tin học", grade: 9.0, credits: 3 },
          { id: generateId(), courseName: "Tiếng Anh", grade: 8.2, credits: 2 },
        ]
      : [
          { id: generateId(), courseName: "Calculus", grade: 3.5, credits: 3 },
          { id: generateId(), courseName: "Physics", grade: 3.0, credits: 2 },
          { id: generateId(), courseName: "Programming", grade: 4.0, credits: 3 },
          { id: generateId(), courseName: "English", grade: 3.3, credits: 2 },
        ];
    onCoursesChange(sampleCourses);
  };

  return (
    <Card className="card-elevated card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            📊 GPA Học Kỳ
          </CardTitle>
          <div className="flex items-center gap-2">
            <ScaleToggle scale={scale} onScaleChange={onScaleChange} />
            <Button variant="ghost" size="sm" onClick={fillSample}>
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Nhập điểm và số tín chỉ từng môn
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-1">
          <div className="col-span-5">Tên môn học</div>
          <div className="col-span-3 text-center">Điểm (0-{maxGrade})</div>
          <div className="col-span-3 text-center">Tín chỉ</div>
          <div className="col-span-1"></div>
        </div>

        {/* Courses */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="grid grid-cols-12 gap-2 items-center animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Input
                className="col-span-5 input-gpa text-sm py-2"
                placeholder="VD: Toán cao cấp"
                value={course.courseName}
                onChange={(e) =>
                  updateCourse(course.id, "courseName", e.target.value)
                }
              />
              <Input
                type="number"
                className="col-span-3 input-gpa text-sm py-2 text-center"
                placeholder="0"
                min={0}
                max={maxGrade}
                step={0.1}
                value={course.grade || ""}
                onChange={(e) =>
                  updateCourse(course.id, "grade", e.target.value)
                }
              />
              <Input
                type="number"
                className="col-span-3 input-gpa text-sm py-2 text-center"
                placeholder="3"
                min={1}
                value={course.credits || ""}
                onChange={(e) =>
                  updateCourse(course.id, "credits", e.target.value)
                }
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

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={addCourse}>
            <Plus className="h-4 w-4 mr-1" />
            Thêm môn
          </Button>
          <span className="text-sm text-muted-foreground">
            Tổng: {totalCredits} tín chỉ
          </span>
        </div>

        {/* Result */}
        <div className="pt-4 border-t border-border">
          <GpaDisplay value={gpa} scale={scale} label="GPA Học Kỳ" size="md" />
        </div>
      </CardContent>
    </Card>
  );
};
