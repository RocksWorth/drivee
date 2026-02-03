import type { ChecklistCategory, ChecklistDefinition, TestMode } from "./types";

const PASS_THRESHOLD_PERCENT = 80;

const baseCategories: ChecklistCategory[] = [
  {
    id: "safety_starting",
    title: "Safety / Starting",
    description: "Pre-drive checks and safe setup before moving.",
    items: [
      {
        id: "seatbelt_check",
        title: "Seatbelt check",
        detail: "Confirms driver + passengers are buckled before moving.",
      },
      {
        id: "mirror_adjustments",
        title: "Mirror adjustments",
        detail: "Mirrors set before driving; minimal adjusting while moving.",
      },
      {
        id: "signal_usage_general",
        title: "Signal usage (consistent)",
        detail: "Signals early and cancels signal after completing action.",
      },
      {
        id: "speed_maintenance",
        title: "Speed maintenance",
        detail: "Maintains appropriate speed for posted limit and conditions.",
      },
    ],
  },
  {
    id: "mirrors_blind_spots",
    title: "Mirrors / Blind Spots",
    description: "Observation habits and awareness of hazards.",
    items: [
      {
        id: "regular_mirror_checks",
        title: "Regular mirror checks",
        detail: "Checks mirrors frequently and before braking/turning.",
      },
      {
        id: "blind_spot_checks",
        title: "Blind spot checks",
        detail: "Shoulder checks before moving, lane changes, or merging.",
      },
      {
        id: "intersection_scanning",
        title: "Intersection scanning",
        detail: "Scans left-right-left and watches for pedestrians.",
      },
    ],
  },
  {
    id: "lane_changes",
    title: "Lane Changes",
    description: "Safe lane changes and merges.",
    items: [
      {
        id: "lane_change_signal",
        title: "Signals before lane change",
        detail: "Signals early (about 3–5 seconds) before moving over.",
      },
      {
        id: "lane_change_msm",
        title: "Mirror–signal–shoulder check",
        detail: "Uses mirror + signal + blind spot check before changing lanes.",
      },
      {
        id: "lane_change_safe_gap",
        title: "Safe gap selection",
        detail: "Changes lanes only with a safe following distance/space.",
      },
      {
        id: "lane_positioning",
        title: "Lane positioning",
        detail: "Stays centered and maintains steady lane control.",
      },
    ],
  },
  {
    id: "turns_intersections",
    title: "Turns / Intersections",
    description: "Turns, right-of-way, and control at intersections.",
    items: [
      {
        id: "turn_signal_timing",
        title: "Signals before turns",
        detail: "Signals with enough time for others to react.",
      },
      {
        id: "correct_lane_for_turn",
        title: "Correct lane for turns",
        detail: "Gets into the correct lane early and turns into proper lane.",
      },
      {
        id: "complete_stops",
        title: "Complete stops",
        detail: "Full stop at stop signs / red lights when required.",
      },
      {
        id: "pedestrian_priority",
        title: "Pedestrian awareness",
        detail: "Checks crosswalks and yields appropriately.",
      },
      {
        id: "smooth_controlled_turns",
        title: "Smooth, controlled turns",
        detail: "Steers smoothly; appropriate speed through turn.",
      },
    ],
  },
];

const gOnlyAdditions: Partial<Record<(typeof baseCategories)[number]["id"], ChecklistCategory["items"]>> =
  {
    lane_changes: [
      {
        id: "highway_merge_speed",
        title: "Highway merge speed (G)",
        detail: "Accelerates to match traffic speed while merging safely.",
        modes: ["G"],
      },
      {
        id: "highway_following_distance",
        title: "Safe following distance at higher speeds (G)",
        detail: "Maintains space cushion and avoids tailgating.",
        modes: ["G"],
      },
    ],
    mirrors_blind_spots: [
      {
        id: "highway_mirror_awareness",
        title: "Mirror awareness on faster roads (G)",
        detail: "Checks mirrors before speed changes and lane adjustments.",
        modes: ["G"],
      },
    ],
  };

function withGAdditions(categories: ChecklistCategory[]): ChecklistCategory[] {
  return categories.map((cat) => ({
    ...cat,
    items: [...cat.items, ...(gOnlyAdditions[cat.id] ?? [])],
  }));
}

function filterByMode(categories: ChecklistCategory[], mode: TestMode): ChecklistCategory[] {
  return categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => !item.modes || item.modes.includes(mode)),
  }));
}

export function getChecklistDefinition(mode: TestMode): ChecklistDefinition {
  const categoriesWithG = withGAdditions(baseCategories);
  return {
    mode,
    categories: filterByMode(categoriesWithG, mode),
    passThresholdPercent: PASS_THRESHOLD_PERCENT,
  };
}

export const QUICK_REFERENCE: Record<TestMode, { title: string; bullets: string[]; note: string }> =
  {
    G2: {
      title: "Quick Reference (Ontario G2)",
      bullets: [
        "Zero blood alcohol required (no drinking and driving).",
        "Follow posted speed limits and road conditions at all times.",
        "For drivers 19 and under, passenger limits may apply at night and during the first months of G2.",
        "No hand-held devices while driving; keep distractions minimal.",
      ],
      note: "Passenger restrictions vary by age/time and can change—verify with official Ontario sources.",
    },
    G: {
      title: "Quick Reference (Ontario G)",
      bullets: [
        "Never drive impaired—alcohol/drugs slow reaction time.",
        "Always signal, check mirrors/blind spots, and keep safe following distance.",
        "Highway driving: merge smoothly and match traffic speed safely.",
        "No hand-held devices while driving; keep distractions minimal.",
      ],
      note: "This is a study aid—not legal advice. Confirm current rules with official sources.",
    },
  };

