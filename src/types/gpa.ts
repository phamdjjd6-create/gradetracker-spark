// GPA Calculator Types

export type UniversityMode = "FPT" | "OTHER";
export type GpaScale = 10 | 4;

// Course Average types
export interface CourseAverageRow {
  id: string;
  name: string;
  score: number;
  weight: number;
}

// FPT Semester types
export interface FptSemesterCourse {
  id: string;
  name: string;
  score: number;
}

export interface FptSemester {
  id: string;
  courses: FptSemesterCourse[];
}

// FPT Cumulative types
export interface FptCumulativeRow {
  id: string;
  semesterGpa: number;
  numCourses: number;
}

// FPT Planner types
export interface FptPlanner {
  totalSemesters: number;
  completedSemesters: number;
  currentGpa: number;
  targetGpa: number;
}

// FPT Major types
export type FptBlock = "CNTT" | "KinhTe" | "NgoaiNgu";

export interface FptMajor {
  block: FptBlock | null;
  subMajor: string | null;
}

export interface FptMajorGrades {
  [subMajor: string]: {
    [semester: number]: {
      [courseCode: string]: number;
    };
  };
}

// Other University types
export interface OtherSemesterCourse {
  id: string;
  courseName: string;
  grade: number;
  credits: number;
}

export interface OtherCumulativeRow {
  id: string;
  semesterGpa: number;
  semesterCredits: number;
}

export interface OtherPlanner {
  completedSemesters: number;
  completedCredits: number;
  currentGpa: number;
  targetGpa: number;
  totalCredits: number;
  totalSemesters: number;
  creditsRemainingPerSemester: number[];
}

export interface GradingScaleEntry {
  minScore: number;
  maxScore: number;
  gpa4: number;
  letter: string;
}

export interface ScalePerFeature {
  courseAvgScale: GpaScale;
  semesterScale: GpaScale;
  cumulativeScale: GpaScale;
  plannerScale: GpaScale;
}

// Main user data structure
export interface UserDataJson {
  selectedMode: UniversityMode;
  
  // FPT mode data
  fpt: {
    courseAverageRows: CourseAverageRow[];
    semesters: FptSemester[];
    cumulative: FptCumulativeRow[];
    planner: FptPlanner;
    major: FptMajor;
    selectedSemesterForMajorUI: number;
    majorGrades: FptMajorGrades;
  };
  
  // Other university mode data
  other: {
    scalePerFeature: ScalePerFeature;
    courseAverageRows: CourseAverageRow[];
    semesterCourses: OtherSemesterCourse[];
    cumulativeSemesters: OtherCumulativeRow[];
    planner: OtherPlanner;
    gradingScaleConfig: GradingScaleEntry[];
  };
}

// Default values
export const defaultGradingScale: GradingScaleEntry[] = [
  { minScore: 8.5, maxScore: 10, gpa4: 4.0, letter: "A" },
  { minScore: 7.0, maxScore: 8.49, gpa4: 3.0, letter: "B" },
  { minScore: 5.5, maxScore: 6.99, gpa4: 2.0, letter: "C" },
  { minScore: 4.0, maxScore: 5.49, gpa4: 1.0, letter: "D" },
  { minScore: 0, maxScore: 3.99, gpa4: 0, letter: "F" },
];

export const createDefaultUserData = (): UserDataJson => ({
  selectedMode: "FPT",
  fpt: {
    courseAverageRows: [
      { id: "1", name: "", score: 0, weight: 50 },
      { id: "2", name: "", score: 0, weight: 50 },
    ],
    semesters: [
      {
        id: "1",
        courses: [{ id: "1", name: "", score: 0 }],
      },
    ],
    cumulative: [{ id: "1", semesterGpa: 0, numCourses: 5 }],
    planner: {
      totalSemesters: 9,
      completedSemesters: 0,
      currentGpa: 0,
      targetGpa: 8.0,
    },
    major: {
      block: null,
      subMajor: null,
    },
    selectedSemesterForMajorUI: 1,
    majorGrades: {},
  },
  other: {
    scalePerFeature: {
      courseAvgScale: 10,
      semesterScale: 10,
      cumulativeScale: 4,
      plannerScale: 4,
    },
    courseAverageRows: [
      { id: "1", name: "", score: 0, weight: 50 },
      { id: "2", name: "", score: 0, weight: 50 },
    ],
    semesterCourses: [{ id: "1", courseName: "", grade: 0, credits: 3 }],
    cumulativeSemesters: [{ id: "1", semesterGpa: 0, semesterCredits: 15 }],
    planner: {
      completedSemesters: 0,
      completedCredits: 0,
      currentGpa: 0,
      targetGpa: 3.0,
      totalCredits: 120,
      totalSemesters: 8,
      creditsRemainingPerSemester: [],
    },
    gradingScaleConfig: defaultGradingScale,
  },
});
