export type LicenseLevelId = "g1" | "g2" | "g";

export type LessonQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type LessonQuizBlock = {
  type: "quiz";
  title?: string;
  subtitle?: string;
  questions: LessonQuizQuestion[];
  footerNote?: string;
};

export type LessonBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "callout"; tone: "info" | "warning" | "success"; title?: string; text: string }
  | { type: "list"; items: string[] }
  | LessonQuizBlock
  | {
      type: "image";
      alt: string;
      /**
       * Placeholder-friendly: can be a real `public/` asset or a remote URL.
       */
      src: string;
      caption?: string;
    }
  | {
      type: "video";
      /**
       * Embed URL (YouTube/Vimeo). Example: https://www.youtube.com/embed/<id>
       */
      embedUrl: string;
      title: string;
      caption?: string;
    };

export interface Lesson {
  id: string;
  title: string;
  summary?: string;
  blocks: LessonBlock[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Level {
  id: LicenseLevelId;
  title: string;
  subtitle: string;
  /**
   * Used by UI to map to a Lucide icon.
   */
  iconKey: "book" | "car" | "map";
  modules: Module[];
}

export const LEVELS: Level[] = [
  {
    id: "g1",
    title: "G1",
    subtitle: "Knowledge • rules, signs, and safe decisions",
    iconKey: "book",
    modules: [
      {
        id: "traffic-signs",
        title: "Traffic Signs",
        description:
          "Master sign recognition with patterns (shape + color), plus quick practice checks.",
        lessons: [
          {
            id: "regulatory-signs",
            title: "Regulatory Signs",
            summary: "Rules you must follow: stop, yield, speed, lanes, and more.",
            blocks: [
              { type: "heading", text: "What are regulatory signs?" },
              {
                type: "paragraph",
                text: "Regulatory signs communicate laws and rules. Missing them can cause tickets—or worse, collisions. Your fastest win: memorize the “shape + color” cue so your brain recognizes the rule before you finish reading the words.",
              },
              {
                type: "image",
                alt: "Placeholder diagram of common regulatory signs",
                src: "/file.svg",
                caption: "Placeholder — swap with real Ontario sign graphics later.",
              },
              {
                type: "list",
                items: [
                  "Octagon (red) = STOP: full stop behind the line or before the crosswalk",
                  "Triangle (red/white) = YIELD: slow, be ready to stop, give right-of-way",
                  "Rectangle (black/white) = rules: speed limits, turns, lane use",
                  "Circle with red slash = prohibited action (no left turn, no parking, etc.)",
                ],
              },
              {
                type: "callout",
                tone: "warning",
                title: "G1 exam mindset",
                text: "If you’re unsure, pick the safest legal action: slow down, scan, and yield. Rule compliance beats guessing every time.",
              },
              {
                type: "quiz",
                title: "Quick Check: Regulatory signs",
                subtitle: "Answer like you’re taking the knowledge test.",
                questions: [
                  {
                    id: "g1-reg-1",
                    prompt: "A red octagon sign means:",
                    options: [
                      "Slow down and be prepared to stop",
                      "Stop completely, then proceed when safe",
                      "Do not enter",
                      "Yield to traffic from the left only",
                    ],
                    correctIndex: 1,
                    explanation:
                      "STOP means a complete stop. Proceed only when the intersection is clear and it’s legal to go.",
                  },
                  {
                    id: "g1-reg-2",
                    prompt: "A posted speed limit is best described as:",
                    options: [
                      "The recommended speed in any weather",
                      "The maximum speed under ideal conditions",
                      "The minimum speed you should maintain",
                      "Only enforced on highways",
                    ],
                    correctIndex: 1,
                    explanation:
                      "In rain/snow/fog, safe speed is often lower than the posted maximum.",
                  },
                ],
                footerNote:
                  "Tip: on test day, think “shape first, rule second.”",
              },
            ],
          },
          {
            id: "warning-signs",
            title: "Warning Signs",
            summary: "Signs that warn about hazards ahead.",
            blocks: [
              { type: "heading", text: "Recognize hazards early" },
              {
                type: "paragraph",
                text: "Warning signs cue you to adjust speed and positioning. The skill isn’t memorizing a picture—it’s predicting what could happen next and reducing risk before it happens.",
              },
              {
                type: "image",
                alt: "Placeholder warning sign visuals",
                src: "/globe.svg",
                caption: "Placeholder image — replace with warning sign set.",
              },
              {
                type: "callout",
                tone: "info",
                title: "Golden rule",
                text: "In poor weather, treat posted limits as a ceiling—not a target.",
              },
              {
                type: "list",
                items: [
                  "Curve ahead: reduce speed before the curve, not in the middle of it",
                  "Slippery when wet: increase following distance, avoid harsh braking",
                  "Pedestrian/crossing: scan sidewalks and crosswalks early",
                  "Construction: obey temporary signage and be ready for lane shifts",
                ],
              },
              {
                type: "quiz",
                title: "Quick Check: Warning signs",
                questions: [
                  {
                    id: "g1-warn-1",
                    prompt: "A warning sign ahead should make you:",
                    options: [
                      "Speed up to clear the area faster",
                      "Ignore it unless you see the hazard",
                      "Adjust speed/position and scan for the hazard",
                      "Stop immediately regardless of traffic",
                    ],
                    correctIndex: 2,
                    explanation:
                      "Warning signs are early information. You respond by reducing risk: slow/scan/position safely.",
                  },
                ],
              },
            ],
          },
          {
            id: "sign-shapes-colors",
            title: "Sign Shapes & Colors (Fast Recognition)",
            summary: "A cheat-sheet system to recognize signs in under a second.",
            blocks: [
              { type: "heading", text: "Why shape matters" },
              {
                type: "paragraph",
                text: "At speed, you often see a sign’s shape and color before you can read it. Train your brain to map those cues to meaning instantly.",
              },
              {
                type: "list",
                items: [
                  "Octagon (red) = STOP",
                  "Triangle (red/white) = YIELD",
                  "Diamond (yellow) = WARNING / hazard",
                  "Rectangle (black/white) = REGULATORY / rules",
                  "Pentagon (yellow) = SCHOOL / children",
                ],
              },
              {
                type: "callout",
                tone: "success",
                title: "Study trick",
                text: "Cover the text on a sign image and quiz yourself using only the outline. If you can’t name it, you don’t know it yet.",
              },
            ],
          },
        ],
      },
      {
        id: "rules-of-road",
        title: "Rules of the Road",
        description: "Right-of-way, lanes, speed, and predictable decisions.",
        lessons: [
          {
            id: "four-way-stops",
            title: "Four-Way Stops",
            summary: "Order rules and conflict prevention.",
            blocks: [
              { type: "heading", text: "The rule set" },
              {
                type: "paragraph",
                text: "At a four-way stop, the first vehicle to stop goes first. If two vehicles stop at the same time, the vehicle on the right goes first. When turning left, yield to oncoming traffic going straight.",
              },
              {
                type: "list",
                items: [
                  "First to STOP = first to GO",
                  "Same time = vehicle on the RIGHT goes first",
                  "Left turns yield to oncoming straight traffic",
                  "Pedestrians always matter—scan crosswalks before moving",
                ],
              },
              {
                type: "callout",
                tone: "success",
                title: "DriveAura habit",
                text: "Make eye contact when possible, signal clearly, and commit smoothly—hesitation causes confusion.",
              },
              {
                type: "quiz",
                title: "Quick Check: Right-of-way",
                questions: [
                  {
                    id: "g1-row-1",
                    prompt:
                      "At a four-way stop, two cars stop at the same time. Who goes first?",
                    options: [
                      "The vehicle on the left",
                      "The vehicle on the right",
                      "The larger vehicle",
                      "Whoever accelerates first",
                    ],
                    correctIndex: 1,
                    explanation:
                      "Same time → vehicle on the right has the right-of-way.",
                  },
                ],
              },
            ],
          },
          {
            id: "lane-markings-basics",
            title: "Lane Markings (Basics)",
            summary: "What solid vs broken lines mean—quickly and correctly.",
            blocks: [
              { type: "heading", text: "Read the road paint" },
              {
                type: "paragraph",
                text: "Lane markings are silent instructions. Your G1 test often checks whether you understand what a line allows—or forbids.",
              },
              {
                type: "list",
                items: [
                  "Broken line: you may cross when safe",
                  "Solid line: do not cross (follow local rules/signs)",
                  "Double solid: do not cross in either direction",
                  "Yellow lines separate opposite directions; white lines separate same direction lanes",
                ],
              },
              {
                type: "callout",
                tone: "info",
                title: "Reality check",
                text: "Even if it’s legal to cross, it still must be safe. Legality doesn’t cancel physics.",
              },
            ],
          },
          {
            id: "speed-space",
            title: "Speed & Space Management",
            summary: "Safe speed is a decision, not a number.",
            blocks: [
              { type: "heading", text: "Two jobs at once" },
              {
                type: "paragraph",
                text: "You manage speed (time) and space (distance). Together, they define your stopping capability. Faster speed requires more space.",
              },
              {
                type: "list",
                items: [
                  "In good conditions: keep a 2–3 second following distance",
                  "Bad weather/night: increase to 4+ seconds",
                  "Look 12–15 seconds ahead to avoid surprise braking",
                  "Avoid driving in other vehicles’ blind spots for long periods",
                ],
              },
              {
                type: "quiz",
                title: "Quick Check: Safe following distance",
                questions: [
                  {
                    id: "g1-speed-1",
                    prompt:
                      "In rain or snow, your following distance should generally:",
                    options: [
                      "Stay the same",
                      "Decrease so you don’t lose the car ahead",
                      "Increase",
                      "Not matter if you have ABS",
                    ],
                    correctIndex: 2,
                    explanation:
                      "Reduced traction increases stopping distance. More space gives you more time.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "safe-driving-foundations",
        title: "Safe Driving Foundations",
        description:
          "The habits that prevent collisions: scanning, braking, and decisions.",
        lessons: [
          {
            id: "seeing-thinking",
            title: "See • Think • Do (Scanning)",
            summary: "A simple framework to avoid surprises.",
            blocks: [
              { type: "heading", text: "The cycle" },
              {
                type: "paragraph",
                text: "Great drivers don’t have faster reflexes—they have better prediction. Scan early, identify risks, then choose a safe action.",
              },
              {
                type: "list",
                items: [
                  "See: scan ahead, mirrors, sidewalks, intersections",
                  "Think: what could go wrong in the next 5–10 seconds?",
                  "Do: adjust speed, position, or communication (signal) safely",
                ],
              },
              {
                type: "callout",
                tone: "success",
                title: "Mini drill",
                text: "Every 10 seconds, name 1 hazard and 1 safe response—even as a passenger. This trains your brain for the road test.",
              },
            ],
          },
          {
            id: "stopping-distance",
            title: "Stopping Distance",
            summary: "Why speed + traction + attention determine outcomes.",
            blocks: [
              { type: "heading", text: "Stopping distance = thinking + braking" },
              {
                type: "paragraph",
                text: "Stopping distance includes reaction time (your brain) and braking distance (your tires). Alcohol/drugs/distraction increase reaction time; rain/snow reduces traction and increases braking distance.",
              },
              {
                type: "callout",
                tone: "warning",
                title: "Big mistake",
                text: "Tailgating removes your only safety buffer. Even perfect brakes can’t fix zero space.",
              },
              {
                type: "quiz",
                title: "Quick Check: Stopping distance",
                questions: [
                  {
                    id: "g1-stop-1",
                    prompt: "Which factor increases stopping distance the MOST?",
                    options: [
                      "A dry road",
                      "A wet/icy road",
                      "Driving at a steady speed",
                      "Using turn signals",
                    ],
                    correctIndex: 1,
                    explanation:
                      "Low traction dramatically increases braking distance and reduces control.",
                  },
                ],
              },
            ],
          },
          {
            id: "weather-night",
            title: "Weather & Night Driving",
            summary: "How to adjust when you can’t see or stop as well.",
            blocks: [
              { type: "heading", text: "Adjust your plan, not your luck" },
              {
                type: "list",
                items: [
                  "Slow down and increase following distance",
                  "Use lights correctly; keep windshield and mirrors clean",
                  "Avoid sudden steering/braking on slippery roads",
                  "If visibility is poor, be ready to pull over safely",
                ],
              },
              {
                type: "callout",
                tone: "info",
                title: "Mindset",
                text: "If conditions are bad, arriving late is better than not arriving.",
              },
            ],
          },
        ],
      },
      {
        id: "sharing-the-road",
        title: "Sharing the Road",
        description: "Pedestrians, cyclists, buses, and emergency vehicles.",
        lessons: [
          {
            id: "pedestrians-cyclists",
            title: "Pedestrians & Cyclists",
            summary: "The most vulnerable road users.",
            blocks: [
              { type: "heading", text: "Scan for vulnerability" },
              {
                type: "paragraph",
                text: "Expect unpredictable movement near crosswalks, schools, and bus stops. Give more space than you think you need.",
              },
              {
                type: "list",
                items: [
                  "Yield to pedestrians in crosswalks",
                  "Check blind spots for cyclists before turning",
                  "Leave extra space when passing cyclists",
                  "Never block a crosswalk while waiting",
                ],
              },
              {
                type: "quiz",
                title: "Quick Check: Crosswalks",
                questions: [
                  {
                    id: "g1-share-1",
                    prompt: "When approaching a crosswalk, you should:",
                    options: [
                      "Maintain speed to avoid stopping",
                      "Scan early and be ready to yield",
                      "Honk to warn pedestrians",
                      "Only slow down if someone is already crossing",
                    ],
                    correctIndex: 1,
                    explanation:
                      "Scanning early prevents last-second braking and helps you spot pedestrians stepping in.",
                  },
                ],
              },
            ],
          },
          {
            id: "school-bus-emergency",
            title: "School Buses & Emergency Vehicles",
            summary: "High-consequence rules you must know.",
            blocks: [
              { type: "heading", text: "High-priority situations" },
              {
                type: "callout",
                tone: "warning",
                title: "School bus",
                text: "Always follow school bus stop-arm rules and signage. These are heavily enforced and safety-critical.",
              },
              {
                type: "callout",
                tone: "info",
                title: "Emergency vehicles",
                text: "When you see flashing lights/sirens, stay calm, signal, and move over safely (or stop if required). Don’t panic-brake in a live lane.",
              },
              {
                type: "quiz",
                title: "Quick Check: Emergency response",
                questions: [
                  {
                    id: "g1-em-1",
                    prompt: "If an emergency vehicle approaches from behind, you should:",
                    options: [
                      "Stop immediately where you are",
                      "Speed up to get out of the way",
                      "Signal and move over safely; stop if needed",
                      "Ignore it unless it’s very close",
                    ],
                    correctIndex: 2,
                    explanation:
                      "The goal is predictable, safe clearance—signal and move over without sudden moves.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "g2",
    title: "G2",
    subtitle: "Basic Road • city driving fundamentals",
    iconKey: "car",
    modules: [
      {
        id: "core-controls",
        title: "Core Controls",
        description: "The behaviors examiners look for every minute.",
        lessons: [
          {
            id: "mirror-signal-shoulder",
            title: "Mirror • Signal • Shoulder Check",
            summary: "A repeatable routine for safe lane actions.",
            blocks: [
              { type: "heading", text: "The MSM routine" },
              {
                type: "paragraph",
                text: "Mirror (situational awareness), Signal (communicate), Shoulder check (blind spots). Do it every time before moving laterally: lane changes, merges, pulling over, or turning from a parked position.",
              },
              {
                type: "video",
                title: "Shoulder Check Demo (placeholder)",
                embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                caption: "Replace this placeholder with a real instructional video.",
              },
              {
                type: "callout",
                tone: "warning",
                title: "Common fail",
                text: "Signaling without checking blind spots (or checking too late). The check must happen before you move.",
              },
            ],
          },
        ],
      },
      {
        id: "turns-intersections",
        title: "Turns & Intersections",
        description: "Turning lanes, scanning, and speed control.",
        lessons: [
          {
            id: "right-turns",
            title: "Right Turns (City)",
            blocks: [
              { type: "heading", text: "Clean right turns" },
              {
                type: "list",
                items: [
                  "Signal early",
                  "Check mirrors + blind spot (watch for cyclists)",
                  "Slow smoothly, keep wheels controlled",
                  "Turn into the correct lane",
                ],
              },
              {
                type: "image",
                alt: "Placeholder right turn lane diagram",
                src: "/window.svg",
              },
            ],
          },
          {
            id: "left-turns",
            title: "Left Turns (Unprotected)",
            blocks: [
              { type: "heading", text: "Left turn judgment" },
              {
                type: "paragraph",
                text: "Yield to oncoming traffic and pedestrians. Enter the intersection only when appropriate and complete the turn decisively when safe.",
              },
              {
                type: "callout",
                tone: "info",
                text: "Smooth ≠ slow. Be predictable and commit when you have a safe gap.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "g",
    title: "G",
    subtitle: "Advanced • highway & complex environments",
    iconKey: "map",
    modules: [
      {
        id: "highway-driving",
        title: "Highway Driving",
        description: "Merging, lane discipline, spacing, and exits.",
        lessons: [
          {
            id: "merging",
            title: "Merging Safely",
            summary: "Match speed, find a gap, and merge confidently.",
            blocks: [
              { type: "heading", text: "How to merge" },
              {
                type: "list",
                items: [
                  "Use the on-ramp to accelerate to traffic speed (when safe)",
                  "Mirror check → signal → shoulder check",
                  "Pick a gap early and adjust speed to fit it",
                  "Merge smoothly—no sudden braking",
                ],
              },
              {
                type: "callout",
                tone: "warning",
                title: "Highway risk",
                text: "Merging too slowly forces other drivers to brake. Use the ramp to build speed safely.",
              },
            ],
          },
          {
            id: "following-distance",
            title: "Following Distance & Space Cushion",
            blocks: [
              { type: "heading", text: "Space buys time" },
              {
                type: "paragraph",
                text: "At higher speeds, increase following distance. Avoid riding alongside vehicles in their blind spots for extended periods.",
              },
              {
                type: "callout",
                tone: "success",
                title: "DriveAura rule",
                text: "If you can’t see a vehicle’s mirrors, they likely can’t see you.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getLevel(levelId: string): Level | undefined {
  return LEVELS.find((l) => l.id === levelId);
}

export function getLessonPath(levelId: LicenseLevelId, lessonId: string): {
  level: Level;
  module: Module;
  lesson: Lesson;
} | null {
  const level = getLevel(levelId);
  if (!level) return null;
  for (const mod of level.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { level, module: mod, lesson };
  }
  return null;
}

export function getAllLessonsForLevel(levelId: LicenseLevelId): Lesson[] {
  const level = getLevel(levelId);
  if (!level) return [];
  return level.modules.flatMap((m) => m.lessons);
}

export function getAdjacentLesson(
  levelId: LicenseLevelId,
  lessonId: string,
): { prev: Lesson | null; next: Lesson | null } {
  const lessons = getAllLessonsForLevel(levelId);
  const idx = lessons.findIndex((l) => l.id === lessonId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  };
}

export function getFirstLessonId(levelId: LicenseLevelId): string | null {
  const lessons = getAllLessonsForLevel(levelId);
  return lessons[0]?.id ?? null;
}

