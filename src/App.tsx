import {
  FRAMEWORK,
  MAJOR_META,
  QUESTIONS,
  REQUIRED_BY_MAJOR,
  SCHOOL_PACKAGE,
  type MajorId,
  type ScoreTriple,
} from "./data/content";
import { emptyScores, interpretFit, addScores } from "./lib/scoring";
import { RaceTrack } from "./components/RaceTrack";
import { Robot } from "./components/Robot";
import "./App.css";
import { useMemo, useState } from "react";

type Stage =
  | "hero"
  | "school"
  | "placements"
  | "quiz"
  | "result"
  | "required"
  | "framework"
  | "summary";

const STAGE_ORDER: Stage[] = [
  "hero",
  "school",
  "placements",
  "quiz",
  "result",
  "required",
  "framework",
  "summary",
];

const MAJORS: MajorId[] = ["cs", "ds", "sta"];

export default function App() {
  const [stage, setStage] = useState<Stage>("hero");
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<ScoreTriple>(emptyScores);
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => QUESTIONS.map(() => null),
  );

  const fit = useMemo(() => interpretFit(scores), [scores]);

  const go = (next: Stage) => {
    setStage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restartQuiz = () => {
    setScores(emptyScores());
    setAnswers(QUESTIONS.map(() => null));
    setQIndex(0);
    go("quiz");
  };

  const answer = (choiceId: string) => {
    const question = QUESTIONS[qIndex];
    if (!question) return;
    const choice = question.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    const nextAnswers = [...answers];
    const previousId = nextAnswers[qIndex];
    let nextScores = scores;

    if (previousId) {
      const prev = question.choices.find((c) => c.id === previousId);
      if (prev) {
        nextScores = {
          cs: nextScores.cs - prev.scores.cs,
          ds: nextScores.ds - prev.scores.ds,
          sta: nextScores.sta - prev.scores.sta,
        };
      }
    }

    nextAnswers[qIndex] = choiceId;
    nextScores = addScores(nextScores, choice.scores);
    setAnswers(nextAnswers);
    setScores(nextScores);

    if (qIndex + 1 >= QUESTIONS.length) {
      setTimeout(() => go("result"), 280);
    } else {
      setTimeout(() => setQIndex((i) => i + 1), 180);
    }
  };

  const progress = ((qIndex + (stage === "result" ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="page">
      <header className="nav">
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); go("hero"); }}>
          MAJOR<span>MATCH</span> 2026
        </a>
        <div className="nav__links">
          <button type="button" onClick={() => go("school")}>School Package</button>
          <button type="button" onClick={() => go("quiz")}>Race</button>
          <button type="button" onClick={() => go("required")}>Required</button>
          <button type="button" onClick={() => go("summary")}>Summary</button>
        </div>
      </header>

      {stage === "hero" && (
        <section className="hero" id="top">
          <div>
            <p className="kicker">School of Data Science · CUHK-Shenzhen</p>
            <h1>CS, Data Science, or Statistics?</h1>
            <p className="lead">
              Year‑1 courses are shared. Your major choice should follow what you already
              do well — not only which name sounds hottest in the AI era.
            </p>
            <button type="button" className="primary" onClick={() => go("school")}>
              Start <span>→</span>
            </button>
            <p className="micro">About 5 minutes · English · fit check, not admission</p>
          </div>
          <div className="heroVisual">
            <div className="heroRobots">
              {MAJORS.map((id) => (
                <div key={id} className="heroRobotCard" style={{ borderColor: MAJOR_META[id].color }}>
                  <Robot major={id} size={88} />
                  <strong style={{ color: MAJOR_META[id].color }}>{MAJOR_META[id].short}</strong>
                  <span>{MAJOR_META[id].robot}</span>
                </div>
              ))}
            </div>
            <p className="heroCaption">Three robots. One race. Evidence from your past.</p>
          </div>
        </section>
      )}

      {stage === "school" && (
        <section className="slide">
          <p className="kicker">01 · Shared foundation</p>
          <h2>School Package courses help you discover a major</h2>
          <p className="sectionLead">
            All SDS Year‑1 students take the same school package. These courses are not just
            requirements — they are evidence for which spine you should choose later.
          </p>
          <ul className="packageList">
            {SCHOOL_PACKAGE.map((item) => (
              <li key={item.code}>
                <strong>{item.code}</strong>
                <span>{item.title}</span>
                {item.note ? <em>{item.note}</em> : null}
              </li>
            ))}
          </ul>
          <div className="slideActions">
            <button type="button" className="secondary" onClick={() => go("hero")}>
              Back
            </button>
            <button type="button" className="primary" onClick={() => go("placements")}>
              Next <span>→</span>
            </button>
          </div>
        </section>
      )}

      {stage === "placements" && (
        <section className="slide slide--dark">
          <p className="kicker kicker--paper">02 · Before you race</p>
          <h2>All three majors can lead to strong outcomes</h2>
          <p className="sectionLead sectionLead--light">
            CS, Data Science, and Statistics graduates from our school find good further-study
            and industry pathways. A “hot” major name does not replace consistent study.
          </p>
          <div className="callout">
            <span>Remember</span>
            <p>
              <strong>Studying well is much more important than choosing a hot major.</strong>{" "}
              Pick the curriculum spine you can sustain for three years — then execute.
            </p>
          </div>
          <div className="slideActions">
            <button type="button" className="secondary" onClick={() => go("school")}>
              Back
            </button>
            <button type="button" className="primary" onClick={restartQuiz}>
              Start the race <span>→</span>
            </button>
          </div>
        </section>
      )}

      {stage === "quiz" && (
        <section className="quiz">
          <div className="progressTop">
            <span>
              Question {String(qIndex + 1).padStart(2, "0")} /{" "}
              {String(QUESTIONS.length).padStart(2, "0")}
            </span>
            <button type="button" className="textButton" onClick={() => go("placements")}>
              Exit
            </button>
          </div>
          <div className="progressTrack">
            <i style={{ width: `${progress}%` }} />
          </div>

          <RaceTrack scores={scores} compact />

          <h2>{QUESTIONS[qIndex]?.prompt}</h2>
          <div className="choices">
            {QUESTIONS[qIndex]?.choices.map((choice, index) => (
              <button
                key={choice.id}
                type="button"
                className={`choice ${answers[qIndex] === choice.id ? "choice--picked" : ""}`}
                onClick={() => answer(choice.id)}
              >
                <span className="choiceCode">{String.fromCharCode(65 + index)}</span>
                <strong>{choice.label}</strong>
                {choice.detail ? <small>{choice.detail}</small> : null}
              </button>
            ))}
          </div>
          <p className="insight">
            Answer from past experience — contests, grades, Year‑1 feelings — not career fantasy.
          </p>
          {qIndex > 0 && (
            <button
              type="button"
              className="back"
              onClick={() => setQIndex((i) => Math.max(0, i - 1))}
            >
              ← Previous question
            </button>
          )}
        </section>
      )}

      {stage === "result" && (
        <section className="result">
          <p className="kicker" style={{ color: MAJOR_META[fit.leader].color }}>
            Race result
          </p>
          <h1>{fit.label}</h1>
          <p className="resultLead">{fit.summary}</p>
          <RaceTrack scores={scores} />
          <div className="fit" style={{ borderLeftColor: MAJOR_META[fit.leader].color }}>
            <span>What this suggests</span>
            <p>{fit.advice}</p>
          </div>
          <p className="micro">
            Fit check only — not an admission decision. Quotas and university rules still apply.
          </p>
          <div className="slideActions">
            <button type="button" className="secondary" onClick={restartQuiz}>
              Retake race
            </button>
            <button type="button" className="primary" onClick={() => go("required")}>
              Compare required courses <span>→</span>
            </button>
          </div>
        </section>
      )}

      {stage === "required" && (
        <section className="slide">
          <p className="kicker">04 · Required spines</p>
          <h2>Which set of courses would you like to take in the coming years?</h2>
          <p className="sectionLead">
            Ignore marketing names for a moment. These are the major-required courses you would
            actually sit through after Year 1 (2026–27 schemes).
          </p>
          <div className="requiredGrid">
            {MAJORS.map((id) => (
              <article key={id} style={{ borderTopColor: MAJOR_META[id].color }}>
                <header>
                  <Robot major={id} size={52} />
                  <div>
                    <strong style={{ color: MAJOR_META[id].color }}>{MAJOR_META[id].short}</strong>
                    <span>{REQUIRED_BY_MAJOR[id].units} units required</span>
                  </div>
                </header>
                <ul>
                  {REQUIRED_BY_MAJOR[id].courses.map((c) => (
                    <li key={c.code}>
                      <b>{c.code}</b>
                      <span>{c.title}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="slideActions">
            <button type="button" className="secondary" onClick={() => go("result")}>
              Back
            </button>
            <button type="button" className="primary" onClick={() => go("framework")}>
              Graduation framework <span>→</span>
            </button>
          </div>
        </section>
      )}

      {stage === "framework" && (
        <section className="slide slide--paper">
          <p className="kicker">05 · Structure</p>
          <h2>How graduation requirements differ</h2>
          <p className="sectionLead">
            Framework only — not full elective catalogues. Elective lists are long; the structure
            is what changes your day-to-day load.
          </p>
          <div className="frameworkTableWrap">
            <table className="frameworkTable">
              <thead>
                <tr>
                  <th>Item</th>
                  {MAJORS.map((id) => (
                    <th key={id} style={{ color: MAJOR_META[id].color }}>
                      {MAJOR_META[id].short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total major units</td>
                  {MAJORS.map((id) => (
                    <td key={id}>{FRAMEWORK[id].total}</td>
                  ))}
                </tr>
                <tr>
                  <td>School Package</td>
                  {MAJORS.map((id) => (
                    <td key={id}>{FRAMEWORK[id].school}</td>
                  ))}
                </tr>
                <tr>
                  <td>Major Required</td>
                  {MAJORS.map((id) => (
                    <td key={id}>{FRAMEWORK[id].required}</td>
                  ))}
                </tr>
                <tr>
                  <td>Electives</td>
                  {MAJORS.map((id) => (
                    <td key={id}>{FRAMEWORK[id].electives}</td>
                  ))}
                </tr>
                <tr>
                  <td>Elective rule</td>
                  {MAJORS.map((id) => (
                    <td key={id} className="frameworkTable__text">
                      {FRAMEWORK[id].electivesRule}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Streams</td>
                  {MAJORS.map((id) => (
                    <td key={id} className="frameworkTable__text">
                      {FRAMEWORK[id].streams}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="slideActions">
            <button type="button" className="secondary" onClick={() => go("required")}>
              Back
            </button>
            <button type="button" className="primary" onClick={() => go("summary")}>
              Summary <span>→</span>
            </button>
          </div>
        </section>
      )}

      {stage === "summary" && (
        <section className="slide">
          <p className="kicker">06 · Summary</p>
          <h2>Choose the spine you can sustain</h2>
          <div className="summaryGrid">
            <article>
              <Robot major="cs" size={56} />
              <h3 style={{ color: MAJOR_META.cs.color }}>CS</h3>
              <p>
                Best when you already enjoy serious coding. Required load includes systems,
                OS, advanced programming, algorithms — plus ML.
              </p>
            </article>
            <article>
              <Robot major="ds" size={56} />
              <h3 style={{ color: MAJOR_META.ds.color }}>DS</h3>
              <p>
                Best for applied ML and multi-domain data work with a moderate theory layer —
                without a full CS systems stack.
              </p>
            </article>
            <article>
              <Robot major="sta" size={56} />
              <h3 style={{ color: MAJOR_META.sta.color }}>STA</h3>
              <p>
                Best for inference, uncertainty, and mathematical foundations. You can still
                add computing and ML through streams and electives.
              </p>
            </article>
          </div>
          <div className="callout callout--light">
            <span>Final reminder</span>
            <p>
              In an AI era, many students feel they “should” choose CS. Use Year‑1 evidence —
              contests, CSC enjoyment, math comfort — then compare required courses.{" "}
              <strong>Study well beats choosing a hot label.</strong>
            </p>
          </div>
          <div className="slideActions">
            <button type="button" className="secondary" onClick={restartQuiz}>
              Run the race again
            </button>
            <button type="button" className="primary" onClick={() => go("hero")}>
              Back to start
            </button>
          </div>
        </section>
      )}

      <footer className="footer">
        <span>School of Data Science · Major Match 2026</span>
        <span className="footerJoke">
          Wanting AI jobs ≠ automatic CS. Evidence first — then the race.
        </span>
        <span>
          Based on 2026–27 study schemes · stages:{" "}
          {STAGE_ORDER.indexOf(stage) + 1}/{STAGE_ORDER.length}
        </span>
      </footer>
    </div>
  );
}
