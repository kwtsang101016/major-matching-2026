import { useMemo, type ReactElement } from "react";
import {
  FRAMEWORK,
  MAJOR_INTROS,
  MAJOR_META,
  QUESTIONS,
  REQUIRED_BY_MAJOR,
  SCHOOL_PACKAGE,
  type MajorId,
} from "../data/content";
import { RaceTrack } from "../components/RaceTrack";
import { Robot } from "../components/Robot";
import { useDeck } from "./deckContext";
import { SceneFrame } from "./sceneFrame";
import styles from "./Lecture.module.css";

const MAJORS: MajorId[] = ["cs", "ds", "sta"];

export function SchoolPackageScene(): ReactElement {
  return (
    <SceneFrame kicker="Shared foundation" title="School Package courses help you discover a major">
      <p className={styles.lead}>
        All SDS Year‑1 students take the same school package. These courses are not just
        requirements — they are evidence for which spine you should choose later.
      </p>
      <ul className={styles.packageList}>
        {SCHOOL_PACKAGE.map((item) => (
          <li key={item.code}>
            <strong>{item.code}</strong>
            <span>{item.title}</span>
            {item.note ? <em>{item.note}</em> : null}
          </li>
        ))}
      </ul>
    </SceneFrame>
  );
}

export function IntrosScene(): ReactElement {
  return (
    <SceneFrame kicker="What each major is" title="CS, Data Science, and Statistics in the AI era">
      <p className={styles.lead}>
        Year‑1 students often hear the names before they know the jobs each major trains. Use
        these sketches as a map — then keep studying, whatever you choose.
      </p>
      <div className={styles.three}>
        {MAJORS.map((id) => (
          <article key={id} className={styles.card} style={{ borderTop: `8px solid ${MAJOR_META[id].color}` }}>
            <header className={styles.introHeader}>
              <Robot major={id} size={52} />
              <div>
                <strong style={{ color: MAJOR_META[id].color }}>{MAJOR_META[id].short}</strong>
                <span>{MAJOR_META[id].full}</span>
              </div>
            </header>
            <p className={styles.introTagline}>{MAJOR_INTROS[id].tagline}</p>
            <ul>
              {MAJOR_INTROS[id].bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SceneFrame>
  );
}

export function PlacementsScene(): ReactElement {
  return (
    <SceneFrame kicker="Before you look inward" title="All three majors can lead to strong outcomes" tone="dark">
      <p className={styles.lead}>
        CS, Data Science, and Statistics graduates from our school find good further-study and
        industry pathways. A “hot” major name does not replace consistent study.
      </p>
      <p className={styles.note}>
        <strong>Studying well is much more important than choosing a hot major.</strong> Pick the
        curriculum spine you can sustain for three years — then execute.
      </p>
    </SceneFrame>
  );
}

export function QuizIntroScene(): ReactElement {
  return (
    <SceneFrame kicker="Know yourself" title="A short reflection, not a test">
      <p className={styles.lead}>
        These questions are a reflection, not a personality test and not an admission result. They
        ask what you enjoy, what Year‑1 has already shown, and which required spine you are willing
        to sustain.
      </p>
      <div className={styles.three}>
        <article className={styles.card}>
          <p className={styles.kicker}>01 · Interest</p>
          <h2 className={styles.cardTitle}>What you want more of</h2>
          <p className={styles.muted}>Which part of a problem you want to own, and which questions you like sitting with.</p>
        </article>
        <article className={styles.card}>
          <p className={styles.kicker}>02 · Year‑1 evidence</p>
          <h2 className={styles.cardTitle}>What you have already felt</h2>
          <p className={styles.muted}>Which work you have found enjoyable, and how programming and mathematics have felt so far.</p>
        </article>
        <article className={styles.card}>
          <p className={styles.kicker}>03 · Load</p>
          <h2 className={styles.cardTitle}>What you can sustain</h2>
          <p className={styles.muted}>Which required course spine — and which later-year difficulties — you are willing to live with.</p>
        </article>
      </div>
      <p className={styles.note}>
        CS, Data Science, and Statistics are neighboring paths in the same school. No option is the
        “winning” major.
      </p>
    </SceneFrame>
  );
}

export function QuizScene(): ReactElement {
  const { qIndex, setQIndex, answers, answer, scores } = useDeck();
  const question = QUESTIONS[qIndex];
  const progress = ((qIndex + 1) / QUESTIONS.length) * 100;

  if (!question) {
    return (
      <SceneFrame kicker="Know yourself" title="The questions are ready">
        <p className={styles.lead}>Use the next slide to see what your answers suggest.</p>
      </SceneFrame>
    );
  }

  return (
    <SceneFrame kicker={question.section} title={question.prompt}>
      <div className={styles.questionMeta}>
        <span>
          Question {String(qIndex + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
        </span>
        <span>{question.section}</span>
      </div>
      <div className={styles.questionTrack}>
        <i style={{ width: `${progress}%` }} />
      </div>
      <RaceTrack scores={scores} compact />
      <div className={styles.choices}>
        {question.choices.map((choice, index) => (
          <button
            key={choice.id}
            type="button"
            className={`${styles.choice} ${answers[qIndex] === choice.id ? styles.choicePicked : ""}`}
            onClick={() => answer(choice.id)}
          >
            <span className={styles.choiceCode}>{String.fromCharCode(65 + index)}</span>
            <strong>{choice.label}</strong>
            {choice.detail ? <small>{choice.detail}</small> : null}
          </button>
        ))}
      </div>
      <p className={styles.small}>
        Answer from what you already know about yourself. No major “wins” the others.
      </p>
      {qIndex > 0 ? (
        <button type="button" className={styles.ghost} onClick={() => setQIndex(Math.max(0, qIndex - 1))}>
          ← Previous question
        </button>
      ) : null}
    </SceneFrame>
  );
}

export function ResultScene(): ReactElement {
  const { fit, scores, restartQuiz } = useDeck();

  return (
    <SceneFrame kicker="A reflection" title={fit.label}>
      <p className={styles.lead}>{fit.summary}</p>
      <RaceTrack scores={scores} />
      <div className={styles.fitBox} style={{ borderLeftColor: MAJOR_META[fit.leader].color }}>
        <span>What this suggests</span>
        <p>{fit.advice}</p>
      </div>
      <p className={styles.small}>
        This is a self-understanding check — not an admission decision. Quotas and university rules
        still apply.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.navBtn} onClick={restartQuiz}>
          RETAKE SELF-CHECK
        </button>
      </div>
    </SceneFrame>
  );
}

export function RequiredScene(): ReactElement {
  return (
    <SceneFrame kicker="Required spines" title="Which set of courses would you like to take?">
      <p className={styles.lead}>
        Ignore marketing names for a moment. These are the major-required courses you would
        actually sit through after Year 1 (2026–27 schemes).
      </p>
      <div className={styles.three}>
        {MAJORS.map((id) => (
          <article key={id} className={styles.card} style={{ borderTop: `8px solid ${MAJOR_META[id].color}` }}>
            <header className={styles.introHeader}>
              <Robot major={id} size={52} />
              <div>
                <strong style={{ color: MAJOR_META[id].color }}>{MAJOR_META[id].short}</strong>
                <span>{REQUIRED_BY_MAJOR[id].units} units required</span>
              </div>
            </header>
            <ul className={styles.courseList}>
              {REQUIRED_BY_MAJOR[id].courses.map((course) => (
                <li key={course.code}>
                  <b>{course.code}</b>
                  <span>{course.title}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SceneFrame>
  );
}

export function FrameworkScene(): ReactElement {
  return (
    <SceneFrame kicker="Structure" title="How graduation requirements differ" tone="gold">
      <div className={styles.three}>
        {MAJORS.map((id) => (
          <article key={id} className={styles.card} style={{ borderTop: `8px solid ${MAJOR_META[id].color}` }}>
            <header className={styles.introHeader}>
              <Robot major={id} size={48} />
              <strong style={{ color: MAJOR_META[id].color }}>{MAJOR_META[id].short}</strong>
            </header>
            <p className={styles.sectionLabel}>Elective rule</p>
            <p className={styles.muted}>{FRAMEWORK[id].electivesRule}</p>
            <p className={styles.sectionLabel}>Streams</p>
            <p className={styles.muted}>{FRAMEWORK[id].streamRule}</p>
            {FRAMEWORK[id].streams.map((stream) => (
              <div key={stream.name} className={styles.streamBlock}>
                <strong>{stream.name}</strong>
                <ul>
                  {stream.examples.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
        ))}
      </div>
    </SceneFrame>
  );
}

export function SummaryScene(): ReactElement {
  const { restartQuiz, goTo } = useDeck();

  const takeaways = useMemo(
    () => [
      {
        id: "cs" as const,
        text: "Best when you already enjoy serious coding. Required load includes systems, OS, advanced programming, algorithms — plus ML.",
      },
      {
        id: "ds" as const,
        text: "Best for applied ML and multi-domain data work with a moderate theory layer — without a full CS systems stack.",
      },
      {
        id: "sta" as const,
        text: "Best for inference, uncertainty, and mathematical foundations. You can still add computing and ML through streams and electives.",
      },
    ],
    [],
  );

  return (
    <SceneFrame kicker="Takeaways" title="Choose the spine you can sustain">
      <div className={styles.three}>
        {takeaways.map((item) => (
          <article key={item.id} className={styles.card}>
            <Robot major={item.id} size={56} />
            <h2 className={styles.cardTitle} style={{ color: MAJOR_META[item.id].color }}>
              {MAJOR_META[item.id].short}
            </h2>
            <p className={styles.muted}>{item.text}</p>
          </article>
        ))}
      </div>
      <p className={styles.note}>
        In an AI era, many students feel they “should” choose CS. Use Year‑1 evidence — what you
        have enjoyed, how programming and mathematics have felt — then compare required courses.{" "}
        <strong>Study well beats choosing a hot label.</strong>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.navBtn} onClick={restartQuiz}>
          RUN THE SELF-CHECK AGAIN
        </button>
        <button type="button" className={styles.primary} onClick={() => goTo("cover")}>
          BACK TO START
        </button>
      </div>
    </SceneFrame>
  );
}
