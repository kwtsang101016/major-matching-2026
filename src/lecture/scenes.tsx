import type { ReactElement } from "react";
import {
  FrameworkScene,
  IntrosScene,
  PlacementsScene,
  QuizIntroScene,
  QuizScene,
  RequiredScene,
  ResultScene,
  SchoolPackageScene,
  SummaryScene,
} from "./majorScenes";
import {
  AbilitiesScene,
  CoverScene,
  CurriculumWhyScene,
  DefinitionScene,
  PathsScene,
  PerspectivesScene,
  SelfAskScene,
  StartingPointScene,
  TransitionScene,
  WorkflowScene,
} from "./whyScenes";

export type SceneDef = {
  id: string;
  chapter: string;
  label: string;
  Scene: () => ReactElement;
};

export const SCENES: SceneDef[] = [
  { id: "cover", chapter: "Welcome", label: "Cover", Scene: CoverScene },
  { id: "starting", chapter: "Data science", label: "Why SDS", Scene: StartingPointScene },
  { id: "definition", chapter: "Data science", label: "What it is", Scene: DefinitionScene },
  { id: "perspectives", chapter: "Data science", label: "Subject & career", Scene: PerspectivesScene },
  { id: "curriculum-why", chapter: "Data science", label: "Why the courses", Scene: CurriculumWhyScene },
  { id: "workflow", chapter: "Data science", label: "A DS workflow", Scene: WorkflowScene },
  { id: "abilities", chapter: "Data science", label: "Abilities", Scene: AbilitiesScene },
  { id: "paths", chapter: "Data science", label: "Not one track", Scene: PathsScene },
  { id: "self-ask", chapter: "Data science", label: "Ask yourself", Scene: SelfAskScene },
  { id: "transition", chapter: "Data science", label: "To the majors", Scene: TransitionScene },
  { id: "school", chapter: "Majors", label: "School package", Scene: SchoolPackageScene },
  { id: "intros", chapter: "Majors", label: "CS · DS · STA", Scene: IntrosScene },
  { id: "placements", chapter: "Majors", label: "Study well", Scene: PlacementsScene },
  { id: "quiz-intro", chapter: "Know yourself", label: "How this works", Scene: QuizIntroScene },
  { id: "quiz", chapter: "Know yourself", label: "Self-check", Scene: QuizScene },
  { id: "result", chapter: "Know yourself", label: "Reflection", Scene: ResultScene },
  { id: "required", chapter: "Curriculum", label: "Required courses", Scene: RequiredScene },
  { id: "framework", chapter: "Curriculum", label: "Electives & streams", Scene: FrameworkScene },
  { id: "summary", chapter: "Curriculum", label: "Takeaways", Scene: SummaryScene },
];
