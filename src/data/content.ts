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
  section: "Interest" | "Year-1 evidence" | "Sustainable load";
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
    id: "own-the-work",
    section: "Interest",
    prompt: "When a problem is interesting, which part do you most want to own?",
    choices: [
      {
        id: "a",
        label: "Making it run reliably as software or a system",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label: "Turning messy data into a model that predicts or decides well",
        scores: { cs: 1, ds: 4, sta: 1 },
      },
      {
        id: "c",
        label: "Checking whether a claim is justified, and with what uncertainty",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "kind-of-question",
    section: "Interest",
    prompt: "Which kind of question do you most enjoy sitting with?",
    choices: [
      {
        id: "a",
        label: "How can we build this efficiently and correctly?",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label: "How can we get a useful pattern from this data?",
        scores: { cs: 1, ds: 4, sta: 1 },
      },
      {
        id: "c",
        label: "Is this pattern real, or could it be noise, bias, or a weak design?",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "group-role",
    section: "Interest",
    prompt: "In a group project, which role feels most like you?",
    choices: [
      {
        id: "a",
        label: "Design the structure, write the core code, and debug until it ships",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label: "Clean the data, try models, and compare what actually works",
        scores: { cs: 1, ds: 4, sta: 1 },
      },
      {
        id: "c",
        label: "State assumptions, choose the method, and explain how sure we should be",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "y1-enjoyment",
    section: "Year-1 evidence",
    prompt: "So far this year, which kind of work have you found most enjoyable?",
    choices: [
      {
        id: "a",
        label: "Programming courses and labs (CSC1001/1003, CSC1002/1004)",
        scores: { cs: 4, ds: 2, sta: 0 },
      },
      {
        id: "b",
        label: "Data-oriented work (DDA2001, projects, trying models or analysis)",
        scores: { cs: 1, ds: 4, sta: 2 },
      },
      {
        id: "c",
        label: "Mathematics (calculus, linear algebra) or careful step-by-step argument",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "programming-experience",
    section: "Year-1 evidence",
    prompt: "Which is closest to your experience with programming so far?",
    choices: [
      {
        id: "a",
        label:
          "I enjoy it enough that I would take more systems / algorithms courses even if they are hard",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label: "I can program when a project needs it, but I do not want programming to be the whole major",
        scores: { cs: 1, ds: 4, sta: 2 },
      },
      {
        id: "c",
        label: "Programming is a tool I will use; the reasoning is what I care about",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "math-experience",
    section: "Year-1 evidence",
    prompt: "Which is closest to your experience with mathematics so far?",
    choices: [
      {
        id: "a",
        label: "I can get through required math, but I do not want a proof-heavy spine",
        scores: { cs: 4, ds: 2, sta: 0 },
      },
      {
        id: "b",
        label:
          "I am comfortable with math as a language for models, especially when it stays tied to applications",
        scores: { cs: 1, ds: 4, sta: 2 },
      },
      {
        id: "c",
        label: "I usually find abstract math and careful argument natural, even when the work takes a long time",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "required-load",
    section: "Sustainable load",
    prompt:
      "Ignore the brand names. Which set of required work are you most willing to sustain for the next two to three years?",
    choices: [
      {
        id: "a",
        label:
          "Discrete math, computer systems, advanced programming, operating systems, algorithms, plus machine learning",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label:
          "Data structures, machine learning, optimization, stochastic simulation, probability II, stochastic processes",
        scores: { cs: 1, ds: 4, sta: 1 },
      },
      {
        id: "c",
        label:
          "Mathematical analysis, optimization, probability II, statistical computing, statistical inference, statistical learning",
        scores: { cs: 0, ds: 2, sta: 4 },
      },
    ],
  },
  {
    id: "later-year-difficulty",
    section: "Sustainable load",
    prompt: "In a typical later-year week, which difficulty would you rather live with?",
    choices: [
      {
        id: "a",
        label: "A system that will not run, or a bug that only appears at scale",
        scores: { cs: 4, ds: 1, sta: 0 },
      },
      {
        id: "b",
        label: "A model that looks good in training but fails on new or messy data",
        scores: { cs: 1, ds: 4, sta: 1 },
      },
      {
        id: "c",
        label:
          "A result that is statistically delicate: assumptions, identification, and “how sure are we?”",
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
