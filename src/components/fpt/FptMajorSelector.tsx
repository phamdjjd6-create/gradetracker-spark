import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GpaDisplay } from "@/components/GpaDisplay";
import { FptMajor, FptMajorGrades, FptBlock } from "@/types/gpa";
import {
  fptMajorData,
  getBlockOptions,
  getMajorOptions,
  getSemesterCourses,
  getTotalSemesters,
} from "@/data/fptMajors";
import { calculateFptSemesterGpa, formatGpa, generateId } from "@/lib/gpaCalculations";
import { ChevronLeft, ChevronRight, GraduationCap, Filter } from "lucide-react";

interface FptMajorSelectorProps {
  major: FptMajor;
  selectedSemester: number;
  majorGrades: FptMajorGrades;
  onMajorChange: (major: FptMajor) => void;
  onSemesterChange: (semester: number) => void;
  onGradesChange: (grades: FptMajorGrades) => void;
}

export const FptMajorSelector: React.FC<FptMajorSelectorProps> = ({
  major,
  selectedSemester,
  majorGrades,
  onMajorChange,
  onSemesterChange,
  onGradesChange,
}) => {
  const [showUngraded, setShowUngraded] = React.useState(false);
  
  const blockOptions = getBlockOptions();
  const majorOptions = getMajorOptions(major.block);
  const totalSemesters = getTotalSemesters(major.block, major.subMajor);
  const courses = getSemesterCourses(major.block, major.subMajor, selectedSemester);

  // Get grade for a course
  const getGrade = (courseCode: string): number => {
    return majorGrades[major.subMajor || ""]?.[selectedSemester]?.[courseCode] || 0;
  };

  // Set grade for a course
  const setGrade = (courseCode: string, score: number) => {
    const validScore = Math.min(10, Math.max(0, score));
    const newGrades = { ...majorGrades };
    
    if (!newGrades[major.subMajor || ""]) {
      newGrades[major.subMajor || ""] = {};
    }
    if (!newGrades[major.subMajor || ""][selectedSemester]) {
      newGrades[major.subMajor || ""][selectedSemester] = {};
    }
    newGrades[major.subMajor || ""][selectedSemester][courseCode] = validScore;
    
    onGradesChange(newGrades);
  };

  // Calculate semester GPA
  const semesterScores = courses.map((c) => getGrade(c)).filter((s) => s > 0);
  const semesterGpa = calculateFptSemesterGpa(semesterScores);

  // Calculate total program GPA
  const getAllGrades = (): number[] => {
    const allGrades: number[] = [];
    const subMajorGrades = majorGrades[major.subMajor || ""];
    if (subMajorGrades) {
      Object.values(subMajorGrades).forEach((semGrades) => {
        Object.values(semGrades).forEach((score) => {
          if (score > 0) allGrades.push(score);
        });
      });
    }
    return allGrades;
  };

  const allGrades = getAllGrades();
  const totalGpa = allGrades.length > 0
    ? allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length
    : 0;

  // Filter courses
  const displayedCourses = showUngraded
    ? courses.filter((c) => getGrade(c) === 0)
    : courses;

  return (
    <Card className="card-elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GraduationCap className="h-5 w-5" />
          Chương Trình Học FPT
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Chọn ngành và nhập điểm theo từng kỳ
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Major selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Khối ngành</Label>
            <Select
              value={major.block || ""}
              onValueChange={(value) =>
                onMajorChange({ block: value as FptBlock, subMajor: null })
              }
            >
              <SelectTrigger className="input-gpa">
                <SelectValue placeholder="Chọn khối ngành" />
              </SelectTrigger>
              <SelectContent>
                {blockOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Ngành</Label>
            <Select
              value={major.subMajor || ""}
              onValueChange={(value) =>
                onMajorChange({ ...major, subMajor: value })
              }
              disabled={!major.block}
            >
              <SelectTrigger className="input-gpa">
                <SelectValue placeholder="Chọn ngành" />
              </SelectTrigger>
              <SelectContent>
                {majorOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Semester navigation */}
        {major.subMajor && (
          <>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSemesterChange(Math.max(1, selectedSemester - 1))}
                disabled={selectedSemester <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSemesters }, (_, i) => i + 1).map(
                  (sem) => (
                    <button
                      key={sem}
                      onClick={() => onSemesterChange(sem)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                        sem === selectedSemester
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {sem}
                    </button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onSemesterChange(Math.min(totalSemesters, selectedSemester + 1))
                }
                disabled={selectedSemester >= totalSemesters}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter toggle */}
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
              <Label htmlFor="ungraded" className="text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Chỉ hiện môn chưa nhập điểm
              </Label>
              <Switch
                id="ungraded"
                checked={showUngraded}
                onCheckedChange={setShowUngraded}
              />
            </div>

            {/* Course grades */}
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-1">
                <div className="col-span-8">Mã môn</div>
                <div className="col-span-4 text-center">Điểm (0-10)</div>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {displayedCourses.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    {showUngraded ? "Tất cả môn đã có điểm!" : "Không có môn học"}
                  </p>
                ) : (
                  displayedCourses.map((courseCode, index) => (
                    <div
                      key={courseCode}
                      className="grid grid-cols-12 gap-2 items-center animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <div className="col-span-8 text-sm font-medium px-3 py-2 bg-secondary/30 rounded-lg">
                        {courseCode}
                      </div>
                      <Input
                        type="number"
                        className="col-span-4 input-gpa text-sm py-2 text-center"
                        placeholder="0"
                        min={0}
                        max={10}
                        step={0.1}
                        value={getGrade(courseCode) || ""}
                        onChange={(e) =>
                          setGrade(courseCode, Number(e.target.value) || 0)
                        }
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Results */}
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">GPA Kỳ {selectedSemester}</p>
                  <div className="text-2xl font-bold text-primary">
                    {formatGpa(semesterGpa)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {semesterScores.length}/{courses.length} môn
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">GPA Toàn Khóa</p>
                  <div className="text-2xl font-bold text-foreground">
                    {formatGpa(totalGpa)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {allGrades.length} môn đã có điểm
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {!major.subMajor && (
          <div className="text-center py-8 text-muted-foreground">
            <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Chọn khối ngành và ngành để bắt đầu</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
