import { useEffect, useMemo, useState } from "react";
import { QUESTIONS, type ScoreTriple } from "../data/content";
import { addScores, emptyScores, interpretFit } from "../lib/scoring";
import { DeckContext } from "./deckContext";
import styles from "./Lecture.module.css";
import { SCENES } from "./scenes";

export function Lecture() {
  const [index, setIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<ScoreTriple>(emptyScores);
  const [answers, setAnswers] = useState<(string | null)[]>(() => QUESTIONS.map(() => null));

  const scene = SCENES[index];
  const progress = useMemo(() => ((index + 1) / SCENES.length) * 100, [index]);
  const fit = useMemo(() => interpretFit(scores), [scores]);

  const goTo = (id: string) => {
    const next = SCENES.findIndex((item) => item.id === id);
    if (next >= 0) setIndex(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restartQuiz = () => {
    setScores(emptyScores());
    setAnswers(QUESTIONS.map(() => null));
    setQIndex(0);
    goTo("quiz");
  };

  const answer = (choiceId: string) => {
    const question = QUESTIONS[qIndex];
    if (!question) return;
    const choice = question.choices.find((item) => item.id === choiceId);
    if (!choice) return;

    const nextAnswers = [...answers];
    const previousId = nextAnswers[qIndex];
    let nextScores = scores;

    if (previousId) {
      const prev = question.choices.find((item) => item.id === previousId);
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
      window.setTimeout(() => goTo("result"), 280);
    } else {
      window.setTimeout(() => setQIndex((value) => value + 1), 180);
    }
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        setIndex((value) => Math.min(SCENES.length - 1, value + 1));
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setIndex((value) => Math.max(0, value - 1));
      }
      if (event.key === "Home") setIndex(0);
      if (event.key === "End") setIndex(SCENES.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  if (!scene) {
    return <main className={styles.page}>Slide not found.</main>;
  }

  const Scene = scene.Scene;

  return (
    <DeckContext.Provider
      value={{ goTo, scores, answers, qIndex, setQIndex, answer, restartQuiz, fit }}
    >
      <main className={styles.page}>
        <nav className={styles.nav} aria-label="Slide navigation">
          <a
            className={styles.brand}
            href="#cover"
            title="Studying at SDS: What and Why"
            onClick={(event) => {
              event.preventDefault();
              goTo("cover");
            }}
          >
            Studying at <span>SDS</span>
          </a>
          <div className={styles.navCenter}>
            <button
              className={styles.navBtn}
              type="button"
              disabled={index === 0}
              onClick={() => setIndex((value) => value - 1)}
            >
              ← PREV
            </button>
            <span className={styles.progress}>
              {String(index + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
            </span>
            <button
              className={styles.navBtn}
              type="button"
              disabled={index === SCENES.length - 1}
              onClick={() => setIndex((value) => value + 1)}
            >
              NEXT →
            </button>
          </div>
          <select
            className={styles.jump}
            value={scene.id}
            onChange={(event) => goTo(event.target.value)}
            aria-label="Jump to slide"
          >
            {SCENES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.chapter} · {item.label}
              </option>
            ))}
          </select>
        </nav>
        <div className={styles.track} aria-hidden="true">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.stage}>
          <Scene />
        </div>
      </main>
    </DeckContext.Provider>
  );
}
