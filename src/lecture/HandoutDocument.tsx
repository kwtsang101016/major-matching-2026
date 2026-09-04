import { SCENES } from "./scenes";
import { PrintModeProvider } from "./printContext";
import handoutStyles from "./Handout.module.css";

const LONG_SLIDES = new Set(["quiz", "framework", "required", "intros"]);

export function HandoutDocument() {
  return (
    <PrintModeProvider>
      <article className={handoutStyles.slides} aria-label="Studying at SDS: What and Why — slide PDF">
        {SCENES.map((scene, index) => {
          const Slide = scene.Scene;
          const long = LONG_SLIDES.has(scene.id);
          return (
            <div
              key={scene.id}
              className={`${handoutStyles.slidePage} ${long ? handoutStyles.slidePageLong : ""}`}
            >
              <header className={handoutStyles.slideHeader}>
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
                </span>
                <span>
                  {scene.chapter} · {scene.label}
                </span>
              </header>
              <Slide />
            </div>
          );
        })}
      </article>
    </PrintModeProvider>
  );
}
