import type { MajorId, ScoreTriple } from "../data/content";
import { MAJOR_META, QUESTIONS } from "../data/content";

export function emptyScores(): ScoreTriple {
  return { cs: 0, ds: 0, sta: 0 };
}

export function addScores(a: ScoreTriple, b: ScoreTriple): ScoreTriple {
  return {
    cs: a.cs + b.cs,
    ds: a.ds + b.ds,
    sta: a.sta + b.sta,
  };
}

export function maxPossible(): ScoreTriple {
  return QUESTIONS.reduce((acc, q) => {
    const maxCs = Math.max(...q.choices.map((c) => c.scores.cs));
    const maxDs = Math.max(...q.choices.map((c) => c.scores.ds));
    const maxSta = Math.max(...q.choices.map((c) => c.scores.sta));
    return addScores(acc, { cs: maxCs, ds: maxDs, sta: maxSta });
  }, emptyScores());
}

export function normalizeScores(scores: ScoreTriple): ScoreTriple {
  const max = maxPossible();
  return {
    cs: max.cs ? scores.cs / max.cs : 0,
    ds: max.ds ? scores.ds / max.ds : 0,
    sta: max.sta ? scores.sta / max.sta : 0,
  };
}

export function rankedMajors(scores: ScoreTriple): MajorId[] {
  return (Object.keys(scores) as MajorId[]).sort(
    (a, b) => scores[b] - scores[a],
  );
}

export interface FitResult {
  leader: MajorId;
  runnerUp: MajorId;
  close: boolean;
  label: string;
  summary: string;
  advice: string;
}

export function interpretFit(raw: ScoreTriple): FitResult {
  const ranked = rankedMajors(raw);
  const leader = ranked[0]!;
  const runnerUp = ranked[1]!;
  const total = raw.cs + raw.ds + raw.sta || 1;
  const leadShare = raw[leader] / total;
  const gap = (raw[leader] - raw[runnerUp]) / total;
  const close = gap < 0.12;

  const name = MAJOR_META[leader].full;
  const second = MAJOR_META[runnerUp].short;

  if (close) {
    const pair = [leader, runnerUp].sort().join("-");
    if (pair === "cs-ds") {
      return {
        leader,
        runnerUp,
        close: true,
        label: "CS–DS hybrid signal",
        summary:
          "Your past experience points to both software strength and data/ML interest.",
        advice:
          "Compare CS required systems courses (OS, computer systems, advanced programming) with the DS spine (data structures, ML, stochastic processes, simulation). If full CS systems load feels heavy, DS may fit better.",
      };
    }
    if (pair === "ds-sta") {
      return {
        leader,
        runnerUp,
        close: true,
        label: "STA–DS hybrid signal",
        summary:
          "You show both mathematical / inferential leanings and applied data interest.",
        advice:
          "Statistics plus computing electives — or DS plus deeper inference courses — can both work. Ask which required spine you would rather take for the next two years.",
      };
    }
    return {
      leader,
      runnerUp,
      close: true,
      label: "Mixed signal",
      summary: `Scores are close between ${MAJOR_META[leader].short} and ${second}.`,
      advice:
        "Study the required-course lists carefully. Trying one hard coding week and one hard math week is more informative than chasing a hot major name.",
    };
  }

  const copy: Record<MajorId, FitResult> = {
    cs: {
      leader: "cs",
      runnerUp,
      close: false,
      label: "Computer Science–leaning",
      summary:
        "Your past coding performance and preferences align with a CS systems and algorithms spine.",
      advice:
        "CS is a good fit when you already enjoy serious programming — not only when AI sounds popular. Check that you are ready for discrete math, computer systems, OS, and algorithms.",
    },
    ds: {
      leader: "ds",
      runnerUp,
      close: false,
      label: "Data Science–leaning",
      summary:
        "Your experience fits applied ML / data work with a moderate theory layer — without a full CS systems stack.",
      advice:
        "DS required courses include data structures, machine learning, optimization, stochastic simulation, and stochastic processes. Strong for prediction and multi-domain electives.",
    },
    sta: {
      leader: "sta",
      runnerUp,
      close: false,
      label: "Statistics–leaning",
      summary:
        "Your past math / reasoning signals fit Statistics’ emphasis on inference, uncertainty, and mathematical foundations.",
      advice:
        "STA requires mathematical analysis, inference, and statistical learning. You can still add ML and computing through streams and electives.",
    },
  };

  const base = copy[leader];
  if (leadShare < 0.4) {
    return {
      ...base,
      label: `${base.label} (soft)`,
      advice: `${base.advice} Runner-up: ${MAJOR_META[runnerUp].full}.`,
    };
  }
  return { ...base, summary: `${base.summary} Leading fit: ${name}.` };
}
