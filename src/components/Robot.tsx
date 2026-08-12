import type { MajorId } from "../data/content";
import { MAJOR_META } from "../data/content";
import "./Robot.css";

interface RobotProps {
  major: MajorId;
  size?: number;
  className?: string;
}

/** Simple geometric robot mascots — same visual language for all three majors. */
export function Robot({ major, size = 96, className = "" }: RobotProps) {
  const color = MAJOR_META[major].color;
  const accent = major === "cs" ? "#ff8a7a" : major === "ds" ? "#7eb8d4" : "#f0c14d";

  return (
    <svg
      className={`robot ${className}`}
      width={size}
      height={size}
      viewBox="0 0 96 96"
      aria-hidden="true"
    >
      <rect x="18" y="28" width="60" height="44" rx="10" fill={color} stroke="#16213c" strokeWidth="3" />
      <rect x="30" y="12" width="36" height="22" rx="8" fill={accent} stroke="#16213c" strokeWidth="3" />
      <circle cx="40" cy="22" r="4" fill="#16213c" />
      <circle cx="56" cy="22" r="4" fill="#16213c" />
      <rect x="38" y="40" width="20" height="8" rx="2" fill="#fffaf0" stroke="#16213c" strokeWidth="2" />
      <rect x="8" y="38" width="12" height="8" rx="2" fill={accent} stroke="#16213c" strokeWidth="2" />
      <rect x="76" y="38" width="12" height="8" rx="2" fill={accent} stroke="#16213c" strokeWidth="2" />
      <rect x="28" y="72" width="12" height="14" rx="3" fill={accent} stroke="#16213c" strokeWidth="2" />
      <rect x="56" y="72" width="12" height="14" rx="3" fill={accent} stroke="#16213c" strokeWidth="2" />
      <line x1="48" y1="12" x2="48" y2="4" stroke="#16213c" strokeWidth="3" />
      <circle cx="48" cy="3" r="3" fill={color} stroke="#16213c" strokeWidth="2" />
    </svg>
  );
}
