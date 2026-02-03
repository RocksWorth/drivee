export type TestMode = "G2" | "G";

export type GradeValue = true | false | null;

export type ChecklistCategoryId =
  | "safety_starting"
  | "mirrors_blind_spots"
  | "lane_changes"
  | "turns_intersections";

export interface ChecklistItem {
  id: string;
  title: string;
  detail?: string;
  /**
   * Which test modes this item applies to. If omitted, applies to both.
   */
  modes?: TestMode[];
}

export interface ChecklistCategory {
  id: ChecklistCategoryId;
  title: string;
  description?: string;
  items: ChecklistItem[];
}

export interface ChecklistDefinition {
  mode: TestMode;
  categories: ChecklistCategory[];
  passThresholdPercent: number;
}

