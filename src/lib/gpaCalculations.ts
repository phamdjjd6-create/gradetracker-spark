import { GpaScale, GradingScaleEntry, defaultGradingScale } from "@/types/gpa";

// Convert score from scale 10 to scale 4 using grading config
export function convertToScale4(
  score10: number,
  gradingScale: GradingScaleEntry[] = defaultGradingScale
): number {
  for (const entry of gradingScale) {
    if (score10 >= entry.minScore && score10 <= entry.maxScore) {
      return entry.gpa4;
    }
  }
  return 0;
}

// Get letter grade from score
export function getLetterGrade(
  score: number,
  scale: GpaScale = 10,
  gradingScale: GradingScaleEntry[] = defaultGradingScale
): string {
  const score10 = scale === 4 ? score * 2.5 : score;
  for (const entry of gradingScale) {
    if (score10 >= entry.minScore && score10 <= entry.maxScore) {
      return entry.letter;
    }
  }
  return "F";
}

// Get GPA badge class based on score
export function getGpaBadgeClass(score: number, scale: GpaScale = 10): string {
  const normalizedScore = scale === 4 ? score / 4 : score / 10;
  
  if (normalizedScore >= 0.85) return "gpa-excellent";
  if (normalizedScore >= 0.7) return "gpa-good";
  if (normalizedScore >= 0.5) return "gpa-average";
  return "gpa-poor";
}

// Format GPA with proper decimals
export function formatGpa(gpa: number, decimals: number = 2): string {
  return gpa.toFixed(decimals);
}

// Calculate course average (FPT style - weighted by percentage)
export function calculateCourseAverage(
  rows: { score: number; weight: number }[]
): number {
  const totalWeight = rows.reduce((sum, row) => sum + row.weight, 0);
  if (totalWeight === 0) return 0;
  
  const weightedSum = rows.reduce(
    (sum, row) => sum + row.score * row.weight,
    0
  );
  
  return weightedSum / 100;
}

// Calculate semester GPA (FPT - simple average)
export function calculateFptSemesterGpa(scores: number[]): number {
  if (scores.length === 0) return 0;
  const validScores = scores.filter((s) => s > 0);
  if (validScores.length === 0) return 0;
  return validScores.reduce((sum, s) => sum + s, 0) / validScores.length;
}

// Calculate cumulative GPA (FPT)
export function calculateFptCumulativeGpa(
  semesters: { semesterGpa: number; numCourses: number }[],
  weighted: boolean = true
): number {
  const validSemesters = semesters.filter((s) => s.semesterGpa > 0);
  if (validSemesters.length === 0) return 0;

  if (weighted) {
    const totalCourses = validSemesters.reduce((sum, s) => sum + s.numCourses, 0);
    if (totalCourses === 0) return 0;
    const weightedSum = validSemesters.reduce(
      (sum, s) => sum + s.semesterGpa * s.numCourses,
      0
    );
    return weightedSum / totalCourses;
  }

  return (
    validSemesters.reduce((sum, s) => sum + s.semesterGpa, 0) /
    validSemesters.length
  );
}

// Calculate required GPA for planner (FPT)
export function calculateFptRequiredGpa(
  totalSemesters: number,
  completedSemesters: number,
  currentGpa: number,
  targetGpa: number
): { required: number; feasible: boolean; message: string } {
  const remaining = totalSemesters - completedSemesters;

  if (remaining <= 0) {
    const achieved = currentGpa >= targetGpa;
    return {
      required: currentGpa,
      feasible: achieved,
      message: achieved
        ? `Chúc mừng! GPA hiện tại (${formatGpa(currentGpa)}) đã đạt mục tiêu.`
        : `GPA hiện tại (${formatGpa(currentGpa)}) chưa đạt mục tiêu (${formatGpa(targetGpa)}).`,
    };
  }

  const required =
    (targetGpa * totalSemesters - currentGpa * completedSemesters) / remaining;

  if (required > 10) {
    return {
      required,
      feasible: false,
      message: `Cần GPA trung bình ${formatGpa(required)} cho ${remaining} kỳ còn lại. Điều này không khả thi vì vượt quá 10.0.`,
    };
  }

  if (required < 0) {
    return {
      required: 0,
      feasible: true,
      message: `Bạn đã vượt mục tiêu! Chỉ cần duy trì GPA > 0 cho ${remaining} kỳ còn lại.`,
    };
  }

  return {
    required,
    feasible: true,
    message: `Cần GPA trung bình ${formatGpa(required)} cho ${remaining} kỳ còn lại.`,
  };
}

// Calculate semester GPA with credits (Other university)
export function calculateWeightedSemesterGpa(
  courses: { grade: number; credits: number }[]
): number {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  if (totalCredits === 0) return 0;

  const weightedSum = courses.reduce(
    (sum, c) => sum + c.grade * c.credits,
    0
  );

  return weightedSum / totalCredits;
}

// Calculate cumulative GPA with credits (Other university)
export function calculateWeightedCumulativeGpa(
  semesters: { semesterGpa: number; semesterCredits: number }[]
): number {
  const totalCredits = semesters.reduce((sum, s) => sum + s.semesterCredits, 0);
  if (totalCredits === 0) return 0;

  const weightedSum = semesters.reduce(
    (sum, s) => sum + s.semesterGpa * s.semesterCredits,
    0
  );

  return weightedSum / totalCredits;
}

// Calculate required GPA for planner (Other university - credit-based)
export function calculateOtherRequiredGpa(
  totalCredits: number,
  completedCredits: number,
  currentGpa: number,
  targetGpa: number,
  scale: GpaScale = 4
): { required: number; feasible: boolean; message: string } {
  const remainingCredits = totalCredits - completedCredits;
  const maxGpa = scale;

  if (remainingCredits <= 0) {
    const achieved = currentGpa >= targetGpa;
    return {
      required: currentGpa,
      feasible: achieved,
      message: achieved
        ? `Chúc mừng! GPA hiện tại (${formatGpa(currentGpa)}) đã đạt mục tiêu.`
        : `GPA hiện tại (${formatGpa(currentGpa)}) chưa đạt mục tiêu (${formatGpa(targetGpa)}).`,
    };
  }

  const required =
    (targetGpa * totalCredits - currentGpa * completedCredits) /
    remainingCredits;

  if (required > maxGpa) {
    return {
      required,
      feasible: false,
      message: `Cần GPA ${formatGpa(required)} cho ${remainingCredits} tín chỉ còn lại. Không khả thi vì vượt quá ${maxGpa}.0.`,
    };
  }

  if (required < 0) {
    return {
      required: 0,
      feasible: true,
      message: `Bạn đã vượt mục tiêu! Chỉ cần duy trì GPA > 0.`,
    };
  }

  return {
    required,
    feasible: true,
    message: `Cần GPA trung bình ${formatGpa(required)} cho ${remainingCredits} tín chỉ còn lại.`,
  };
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Validate weight total
export function validateWeightTotal(weights: number[]): boolean {
  const total = weights.reduce((sum, w) => sum + w, 0);
  return Math.abs(total - 100) < 0.01;
}
