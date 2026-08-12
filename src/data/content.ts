export type MajorId = "cs" | "ds" | "sta";

export type ScoreTriple = Record<MajorId, number>;

export interface Choice {
  id: string;
  label: string;
  detail?: string;
  scores: ScoreTriple;
}

export interface Question {
  id: string;
  prompt: string;
  choices: Choice[];
}

export const MAJOR_META: Record<
  MajorId,
  { short: string; full: string; color: string; robot: string }
> = {
  cs: {
    short: "CS",
    full: "Computer Science and Engineering",
    color: "#df4a3e",
    robot: "Bolt",
  },
  ds: {
    short: "DS",
    full: "Data Science and Big Data Technology",
    color: "#2e7190",
    robot: "Pulse",
  },
  sta: {
    short: "STA",
    full: "Statistics",
    color: "#c98500",
    robot: "Prism",
  },
};

export const QUESTIONS: Question[] = [
  {
    id: "contests",
    prompt:
      "Have you taken part in programming contests (e.g. school contests, OI/ICPC-style, Codeforces)?",
    choices: [
      {
        id: "a",
        label: "Yes — and I got a strong result",
        detail: "Medal, high rank, or I felt competitive.",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label: "Yes — I participated, but results were average",
        detail: "Or I did not enjoy contest-style coding much.",
        scores: { cs: 1, ds: 2, sta: 1 },
      },
      {
        id: "c",
        label: "No — I never tried, or I disliked it",
        detail: "Contest coding is not part of my story so far.",
        scores: { cs: 0, ds: 2, sta: 2 },
      },
    ],
  },
  {
    id: "csc-courses",
    prompt:
      "Thinking about CSC1001 or CSC1003 and CSC1002 or CSC1004, which is closest to your experience?",
    choices: [
      {
        id: "a",
        label: "Strong grade — and I genuinely enjoyed the courses",
        scores: { cs: 4, ds: 2, sta: 0 },
      },
      {
        id: "b",
        label: "Grade was fine, but it felt like work",
        detail: "Not something I necessarily want more of.",
        scores: { cs: 1, ds: 3, sta: 2 },
      },
      {
        id: "c",
        label: "I struggled, or finished but did not like the labs",
        scores: { cs: 0, ds: 2, sta: 3 },
      },
    ],
  },
  {
    id: "y1-natural",
    prompt: "Which kind of Year-1 work felt most natural to you?",
    choices: [
      {
        id: "a",
        label: "Writing and debugging programs; making something run",
        scores: { cs: 4, ds: 2, sta: 0 },
      },
      {
        id: "b",
        label: "Working with data / DDA-style projects",
        detail: "Trying models or analysis workflows.",
        scores: { cs: 1, ds: 4, sta: 2 },
      },
      {
        id: "c",
        label: "Calculus / linear algebra / careful mathematical reasoning",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "math-background",
    prompt: "How would you describe your past experience with mathematics?",
    choices: [
      {
        id: "a",
        label: "Strong contest math, or math usually feels easy and interesting",
        scores: { cs: 1, ds: 2, sta: 4 },
      },
      {
        id: "b",
        label: "Solid school math with effort — not “math-contest” oriented",
        scores: { cs: 2, ds: 3, sta: 2 },
      },
      {
        id: "c",
        label: "Math is often hard or unenjoyable, even when I pass",
        scores: { cs: 3, ds: 2, sta: 0 },
      },
    ],
  },
  {
    id: "past-task",
    prompt:
      "Looking back (school, contests, projects, or Year-1 work), which task type did you prefer?",
    choices: [
      {
        id: "a",
        label: "Build a tool / program that others can use",
        scores: { cs: 4, ds: 2, sta: 0 },
      },
      {
        id: "b",
        label: "Get predictions / patterns to work well on new data",
        scores: { cs: 1, ds: 4, sta: 1 },
      },
      {
        id: "c",
        label: "Check whether a claim is justified — and how uncertain we should be",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "when-stuck",
    prompt: "When you get stuck on a hard problem, what do you usually do first?",
    choices: [
      {
        id: "a",
        label: "Search docs / examples, refactor, keep debugging until it runs",
        scores: { cs: 4, ds: 2, sta: 0 },
      },
      {
        id: "b",
        label: "Try another approach / feature / experiment and compare outcomes",
        scores: { cs: 1, ds: 4, sta: 1 },
      },
      {
        id: "c",
        label: "Go back to definitions, assumptions, and step-by-step reasoning",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "extra-course",
    prompt: "If you could add one extra type of course next year, which would you choose?",
    choices: [
      {
        id: "a",
        label: "More programming / algorithms / systems-style CS courses",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label: "More machine learning / data pipelines / applied analytics",
        scores: { cs: 1, ds: 4, sta: 1 },
      },
      {
        id: "c",
        label: "More probability / inference / careful mathematical statistics",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "hype-check",
    prompt:
      "Many students choose CS because AI / software sounds hot. Which is closest to you?",
    choices: [
      {
        id: "a",
        label: "I already have evidence I do well at serious coding",
        detail: "Contests and/or strong enjoyment of CSC courses.",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label: "I like data / ML ideas, but I am unsure about a full CS systems load",
        scores: { cs: 1, ds: 4, sta: 2 },
      },
      {
        id: "c",
        label: "I am more drawn to math / reasoning; coding is a tool, not my identity",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
];

export const SCHOOL_PACKAGE = [
  {
    code: "CSC1001 / 1003 & CSC1002 / 1004",
    title: "Intro programming + lab",
    note: "CS may take 1003/1004; STA & DS typically 1001/1002 — both paths are allowed for CS.",
  },
  { code: "DDA1000", title: "Freshmen Induction and Academic Planning", note: "1 unit" },
  { code: "DDA2001", title: "Introduction to Data Science", note: "" },
  {
    code: "MAT1001/1011, 1002/1012, 2041/2041A",
    title: "Calculus I–II and Linear Algebra",
    note: "Honours options available",
  },
  { code: "PHY1001", title: "Mechanics", note: "" },
  {
    code: "STA2001 or STA2001H",
    title: "Probability and Statistics I",
    note: "STA students are recommended to take the H version",
  },
];

export const REQUIRED_BY_MAJOR: Record<
  MajorId,
  { units: number; courses: { code: string; title: string }[] }
> = {
  cs: {
    units: 20,
    courses: [
      { code: "CSC3001", title: "Discrete Mathematics" },
      { code: "CSC3060", title: "Introduction to Computer Systems (4 units)" },
      { code: "CSC3200", title: "Data Structures and Advanced Programming (4 units)" },
      { code: "CSC3150", title: "Operating System" },
      { code: "CSC4120 / 4120H", title: "Design and Analysis of Algorithms" },
      { code: "DDA3020 / 3020H", title: "Machine Learning" },
    ],
  },
  ds: {
    units: 18,
    courses: [
      { code: "CSC3100", title: "Data Structures" },
      { code: "DDA3020 / 3020H", title: "Machine Learning" },
      { code: "DDA4002", title: "Stochastic Simulation" },
      { code: "MAT3007 / 3007H", title: "Optimization" },
      { code: "STA2002 / 2002H", title: "Probability and Statistics II" },
      { code: "STA4001 / 4001H", title: "Stochastic Processes" },
    ],
  },
  sta: {
    units: 18,
    courses: [
      { code: "MAT2050", title: "Mathematical Analysis" },
      { code: "MAT3007 / 3007H", title: "Optimization" },
      { code: "STA2002H / 2002", title: "Probability and Statistics II (H recommended)" },
      { code: "STA3005", title: "Statistical Computing" },
      { code: "STA3020", title: "Statistical Inference" },
      { code: "STA3042", title: "Statistical Learning" },
    ],
  },
};

/** Soft titles for CS courses we don't have exact English titles from course list extract */
export const FRAMEWORK: Record<
  MajorId,
  {
    total: number;
    school: number;
    required: number;
    electives: number;
    electivesRule: string;
    streams: string;
  }
> = {
  cs: {
    total: 70,
    school: 23,
    required: 20,
    electives: 27,
    electivesRule:
      "≥18 units from CS-heavy Group (a); remaining ≤9 units from (a) or broader Group (b).",
    streams: "Optional Artificial Intelligence stream (≥4 courses from a short list).",
  },
  ds: {
    total: 71,
    school: 23,
    required: 18,
    electives: 30,
    electivesRule:
      "Any 30 units from five domain streams; at most two courses below 3000-level.",
    streams:
      "Optional declaration of one stream (≥4 courses): Theory, Finance & Econ, Ops, Life Science, Computing.",
  },
  sta: {
    total: 71,
    school: 23,
    required: 18,
    electives: 30,
    electivesRule:
      "30 units from streams / CE; ALL students must complete depth of 3 courses in one stream.",
    streams:
      "Optional declaration of one stream (≥4): Math Stats, Methodology, Biostat, Finance, Computing & ML.",
  },
};
