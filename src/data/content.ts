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

export interface MajorIntro {
  tagline: string;
  bullets: string[];
}

export const MAJOR_INTROS: Record<MajorId, MajorIntro> = {
  cs: {
    tagline: "Build the systems that make AI run.",
    bullets: [
      "Computer Science trains you to design algorithms, software, and computer systems — from data structures and operating systems to how programs actually execute.",
      "In the AI era, models still need people who can implement, scale, debug, and ship them: compilers, databases, operating systems, and large-scale software.",
      "If you enjoy making things run reliably — not only using AI tools — CS is the spine for building the infrastructure behind intelligent applications.",
      "AI is one application of CS, not a replacement for it. Foundations in algorithms and systems stay useful as models change.",
    ],
  },
  ds: {
    tagline: "Turn data into predictions and decisions.",
    bullets: [
      "Data Science sits between computing and statistics: you learn to collect, model, and deploy data workflows for prediction and decision-making.",
      "In the AI era, DS is the applied path — machine learning, simulation, optimization, and domain data (finance, operations, life science) without a full CS systems stack.",
      "You practice connecting models to messy real problems: pipelines, evaluation, and using ML where it actually helps.",
      "If you want to work with AI as a data product — rather than only proving theorems or only writing systems code — DS is designed for that middle ground.",
    ],
  },
  sta: {
    tagline: "Choose a way of thinking that stays valid as tools change.",
    bullets: [
      "Statistics trains you to make reliable inferences from limited, noisy data; to quantify uncertainty; and to distinguish correlation from causation.",
      "Tools and models will keep iterating. Probability, inference, and experimental design do not go out of date.",
      "It leads to biostatistics, financial risk, and research, and it also gives a solid foundation for data science and AI.",
      "In an era when AI can answer quickly, statistics helps you ask whether the answer is trustworthy, where bias comes from, and whether a conclusion can survive scrutiny.",
    ],
  },
};

export interface StreamInfo {
  name: string;
  examples: string[];
}

export const FRAMEWORK: Record<
  MajorId,
  {
    electivesRule: string;
    streamRule: string;
    streams: StreamInfo[];
  }
> = {
  cs: {
    electivesRule:
      "27 units from two groups: at least 18 from Group (a) (core CS electives such as databases, AI, NLP, software engineering, deep learning). The remaining units may come from Group (a) or a broader Group (b) (ECE, math, stats, biology, finance, etc.).",
    streamRule:
      "Optional Artificial Intelligence Stream: take at least 4 courses from the AI list. You may also graduate with no declared stream.",
    streams: [
      {
        name: "Artificial Intelligence Stream",
        examples: [
          "CSC3180 Fundamentals of Artificial Intelligence",
          "CSC3160 Fundamentals of Speech and Language Processing",
          "CSC4100 Natural Language Processing",
          "DDA4220 Deep Learning and Applications",
          "DDA4230 Reinforcement Learning",
          "CSC4801 AI-assisted Software Engineering",
        ],
      },
    ],
  },
  ds: {
    electivesRule:
      "Any 30 units chosen from the five streams below. At most two courses may be below 3000-level. Streams can be mixed unless you declare one.",
    streamRule:
      "Optional: declare exactly one stream by completing at least 4 courses in it. You may also declare none.",
    streams: [
      {
        name: "Methodology and Theory Stream",
        examples: [
          "DDA4210 Advanced Machine Learning",
          "DDA4250 Mathematical Introduction to Deep Learning",
          "STA3020 Statistical Inference",
          "MAT2050 Mathematical Analysis",
        ],
      },
      {
        name: "Finance and Economics Stream",
        examples: [
          "FMA4200 Financial Data Analysis",
          "FIN3080 Investment Analysis and Portfolio Management",
          "STA4003 Time Series",
          "ECO3121 Introductory Econometrics",
        ],
      },
      {
        name: "Operations Management Stream",
        examples: [
          "DMS2030 Operations Management",
          "DMS4031 Supply Chain and Logistics",
          "MKT4220 Big Data Marketing",
          "DDA4260 Networked Life",
        ],
      },
      {
        name: "Life Science Stream",
        examples: [
          "BIM3001 Bioinformatics",
          "BIM2005 Computational Biology",
          "STA4012 Statistical Genetics and Genomics",
          "BIO3204 Genetic Engineering",
        ],
      },
      {
        name: "Computing Stream",
        examples: [
          "CSC3170 Database System",
          "CSC3150 Operating System",
          "CSC4100 Natural Language Processing",
          "DDA4220 Deep Learning and Applications",
        ],
      },
    ],
  },
  sta: {
    electivesRule:
      "30 units from the streams (and complementary electives). Every student must complete a depth requirement: 3 courses from any one stream. Complementary electives include extra CS, DS, finance, and STA courses.",
    streamRule:
      "Optional: declare exactly one stream by completing at least 4 courses in it. Depth (3 in one stream) is required even if you declare none.",
    streams: [
      {
        name: "Mathematical Statistics Stream",
        examples: [
          "STA4001 / 4001H Stochastic Processes",
          "STA4100 Statistical Inference II",
          "MAT3280 Probability Theory",
          "DDA4002 Stochastic Simulation",
        ],
      },
      {
        name: "Statistical Methodology Stream",
        examples: [
          "STA3006 Design and Analysis of Experiments",
          "DDA4010 Bayesian Statistics",
          "STA4003 Time Series",
          "STA4041 Causal Inference",
        ],
      },
      {
        name: "Biostatistics & Bioinformatics Stream",
        examples: [
          "STA4012 Statistical Genetics and Genomics",
          "BIM3001 Bioinformatics",
          "BIM2005 Computational Biology",
          "STA4005 Survival Modelling",
        ],
      },
      {
        name: "Financial Statistics Stream",
        examples: [
          "STA4020 Statistical Modelling in Financial Markets",
          "FIN3380 Financial Data Analysis with AI Tools",
          "RMS4001 Simulation Methods for Risk Management and Finance",
          "STA4003 Time Series",
        ],
      },
      {
        name: "Computing & Machine Learning Stream",
        examples: [
          "DDA3020 / 3020H Machine Learning",
          "CSC3100 Data Structures",
          "CSC4120 Design and Analysis of Algorithms",
          "DDA4220 Deep Learning and Applications",
        ],
      },
    ],
  },
};
