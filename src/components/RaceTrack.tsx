import { MAJOR_META, type MajorId, type ScoreTriple } from "../data/content";
import { normalizeScores } from "../lib/scoring";
import { Robot } from "./Robot";
import "./RaceTrack.css";

interface RaceTrackProps {
  scores: ScoreTriple;
  compact?: boolean;
}

const ORDER: MajorId[] = ["cs", "ds", "sta"];

export function RaceTrack({ scores, compact = false }: RaceTrackProps) {
  const norm = normalizeScores(scores);
  const maxNorm = Math.max(norm.cs, norm.ds, norm.sta, 0.01);

  return (
    <div className={`race ${compact ? "race--compact" : ""}`} aria-label="Experience signals by major">
      {ORDER.map((id) => {
        const pct = Math.round((norm[id] / maxNorm) * 100);
        const raw = scores[id];
        return (
          <div key={id} className="race__lane">
            <div className="race__label" style={{ color: MAJOR_META[id].color }}>
              <strong>{MAJOR_META[id].short}</strong>
              <span>{MAJOR_META[id].robot}</span>
            </div>
            <div className="race__track">
              <div
                className="race__runner"
                style={{
                  left: `calc(${Math.max(pct, 8)}% - 28px)`,
                }}
              >
                <Robot major={id} size={compact ? 48 : 64} />
              </div>
              <div className="race__bar">
                <i style={{ width: `${pct}%`, background: MAJOR_META[id].color }} />
              </div>
            </div>
            <div className="race__score">{raw}</div>
          </div>
        );
      })}
    </div>
  );
}
