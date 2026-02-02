import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ModeSwitcher } from "@/components/ModeSwitcher";
import { FptCourseAverage } from "@/components/fpt/FptCourseAverage";
import { FptSemesterGpa } from "@/components/fpt/FptSemesterGpa";
import { FptCumulativeGpa } from "@/components/fpt/FptCumulativeGpa";
import { FptGpaPlanner } from "@/components/fpt/FptGpaPlanner";
import { FptMajorSelector } from "@/components/fpt/FptMajorSelector";
import { OtherCourseAverage } from "@/components/other/OtherCourseAverage";
import { OtherSemesterGpa } from "@/components/other/OtherSemesterGpa";
import { OtherCumulativeGpa } from "@/components/other/OtherCumulativeGpa";
import { OtherGpaPlanner } from "@/components/other/OtherGpaPlanner";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw } from "lucide-react";

const GpaApp = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data, isLoading, saveStatus, updateData, saveNow, resetData } = useUserData();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isFpt = data.selectedMode === "FPT";

  return (
    <div className="min-h-screen bg-background">
      <Header saveStatus={saveStatus} onSaveNow={saveNow} />
      
      <main className="container mx-auto px-4 py-8">
        <ModeSwitcher
          mode={data.selectedMode}
          onModeChange={(mode) => updateData((prev) => ({ ...prev, selectedMode: mode }))}
        />

        <div className="flex justify-end mb-6">
          <Button variant="outline" size="sm" onClick={resetData}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset dữ liệu
          </Button>
        </div>

        {isFpt ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FptCourseAverage
                rows={data.fpt.courseAverageRows}
                onRowsChange={(rows) => updateData((prev) => ({ ...prev, fpt: { ...prev.fpt, courseAverageRows: rows } }))}
              />
              <FptSemesterGpa
                semesters={data.fpt.semesters}
                onSemestersChange={(semesters) => updateData((prev) => ({ ...prev, fpt: { ...prev.fpt, semesters } }))}
              />
              <FptCumulativeGpa
                rows={data.fpt.cumulative}
                onRowsChange={(rows) => updateData((prev) => ({ ...prev, fpt: { ...prev.fpt, cumulative: rows } }))}
              />
              <FptGpaPlanner
                planner={data.fpt.planner}
                onPlannerChange={(planner) => updateData((prev) => ({ ...prev, fpt: { ...prev.fpt, planner } }))}
              />
            </div>
            <FptMajorSelector
              major={data.fpt.major}
              selectedSemester={data.fpt.selectedSemesterForMajorUI}
              majorGrades={data.fpt.majorGrades}
              onMajorChange={(major) => updateData((prev) => ({ ...prev, fpt: { ...prev.fpt, major } }))}
              onSemesterChange={(sem) => updateData((prev) => ({ ...prev, fpt: { ...prev.fpt, selectedSemesterForMajorUI: sem } }))}
              onGradesChange={(grades) => updateData((prev) => ({ ...prev, fpt: { ...prev.fpt, majorGrades: grades } }))}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OtherCourseAverage
              rows={data.other.courseAverageRows}
              scale={data.other.scalePerFeature.courseAvgScale}
              gradingScale={data.other.gradingScaleConfig}
              onRowsChange={(rows) => updateData((prev) => ({ ...prev, other: { ...prev.other, courseAverageRows: rows } }))}
              onScaleChange={(scale) => updateData((prev) => ({ ...prev, other: { ...prev.other, scalePerFeature: { ...prev.other.scalePerFeature, courseAvgScale: scale } } }))}
            />
            <OtherSemesterGpa
              courses={data.other.semesterCourses}
              scale={data.other.scalePerFeature.semesterScale}
              onCoursesChange={(courses) => updateData((prev) => ({ ...prev, other: { ...prev.other, semesterCourses: courses } }))}
              onScaleChange={(scale) => updateData((prev) => ({ ...prev, other: { ...prev.other, scalePerFeature: { ...prev.other.scalePerFeature, semesterScale: scale } } }))}
            />
            <OtherCumulativeGpa
              semesters={data.other.cumulativeSemesters}
              scale={data.other.scalePerFeature.cumulativeScale}
              onSemestersChange={(semesters) => updateData((prev) => ({ ...prev, other: { ...prev.other, cumulativeSemesters: semesters } }))}
              onScaleChange={(scale) => updateData((prev) => ({ ...prev, other: { ...prev.other, scalePerFeature: { ...prev.other.scalePerFeature, cumulativeScale: scale } } }))}
            />
            <OtherGpaPlanner
              planner={data.other.planner}
              scale={data.other.scalePerFeature.plannerScale}
              onPlannerChange={(planner) => updateData((prev) => ({ ...prev, other: { ...prev.other, planner } }))}
              onScaleChange={(scale) => updateData((prev) => ({ ...prev, other: { ...prev.other, scalePerFeature: { ...prev.other.scalePerFeature, plannerScale: scale } } }))}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default GpaApp;
