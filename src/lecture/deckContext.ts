import { createContext, useContext } from "react";
import type { ScoreTriple } from "../data/content";
import type { FitResult } from "../lib/scoring";

export interface DeckContextValue {
  goTo: (id: string) => void;
  scores: ScoreTriple;
  answers: (string | null)[];
  qIndex: number;
  setQIndex: (index: number) => void;
  answer: (choiceId: string) => void;
  restartQuiz: () => void;
  fit: FitResult;
}

export const DeckContext = createContext<DeckContextValue | null>(null);

export function useDeck(): DeckContextValue {
  const ctx = useContext(DeckContext);
  if (!ctx) {
    throw new Error("useDeck must be used within the lecture deck");
  }
  return ctx;
}
