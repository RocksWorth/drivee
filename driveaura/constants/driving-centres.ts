export type LatLng = { lat: number; lng: number };

export interface IntersectionHighlight {
  id: string;
  title: string;
  description: string;
  /**
   * Timestamp into the walkthrough video (in seconds).
   * Used to generate video links like ?t=123.
   */
  timestampSeconds: number;
  severity: "watch-out" | "common-mistake" | "must-do";
  /**
   * Optional location for map pin (lets users tap a highlight and see it on-map).
   * If omitted, the highlight is still shown in the list.
   */
  location?: LatLng;
}

export interface TestRoute {
  id: string;
  name: string;
  /**
   * "G2" or "G" – some centres have different common routes per test.
   */
  testType: "G2" | "G";
  distanceKm?: number;
  durationMin?: number;
  /**
   * Polyline coordinates for map overlay (mocked).
   */
  path: LatLng[];
  /**
   * YouTube embed URL, e.g. https://www.youtube.com/embed/<id>
   * (We keep it as embedUrl to render safely in an iframe.)
   */
  walkthroughVideo: {
    title: string;
    embedUrl: string;
  };
  highlights: IntersectionHighlight[];
}

export interface DrivingCentre {
  id: string; // slug-safe id (used in routes)
  name: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  coordinates: LatLng;
  testsOffered: Array<"G2" | "G">;
  hoursNote?: string;
  arrivalTips: string[];
  whatToExpect: {
    examinerFocus: string[];
    parkingNotes: string[];
    localQuirks: string[];
  };
  routes: TestRoute[];
}

export const DRIVING_CENTRES: DrivingCentre[] = [
  {
    id: "brampton",
    name: "DriveTest Brampton",
    city: "Brampton",
    addressLine1: "59 First Gulf Blvd",
    addressLine2: "Brampton, ON",
    coordinates: { lat: 43.7209, lng: -79.6909 },
    testsOffered: ["G2", "G"],
    hoursNote: "Arrive 30 minutes early for check-in and vehicle inspection.",
    arrivalTips: [
      "Park in the designated test parking area and note your spot number if posted.",
      "Have your licence, confirmation, and a safe, roadworthy vehicle ready.",
      "Practice a calm start: mirrors set, seatbelt, lights, and signals.",
    ],
    whatToExpect: {
      examinerFocus: [
        "Observation (mirror checks + shoulder checks before lateral movement)",
        "Speed control (posted limit + conditions)",
        "Smooth stops and safe following distance",
        "Confident right-of-way decisions at intersections",
      ],
      parkingNotes: [
        "Be ready for parking maneuvers at the end (reverse/parallel depending on route).",
        "Signal when exiting the parking spot and check blind spots carefully.",
      ],
      localQuirks: [
        "Industrial area traffic: watch for trucks entering/exiting driveways.",
        "Be prepared for lane changes near busier intersections.",
      ],
    },
    routes: [
      {
        id: "brampton-g2-basic-loop",
        name: "Common G2 Loop (Basics)",
        testType: "G2",
        distanceKm: 9.5,
        durationMin: 18,
        path: [
          { lat: 43.7209, lng: -79.6909 },
          { lat: 43.7222, lng: -79.6882 },
          { lat: 43.7237, lng: -79.6863 },
          { lat: 43.7219, lng: -79.6847 },
          { lat: 43.7199, lng: -79.6868 },
          { lat: 43.7209, lng: -79.6909 },
        ],
        walkthroughVideo: {
          title: "Brampton G2 Route Walkthrough (Mock)",
          embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        highlights: [
          {
            id: "br-g2-1",
            title: "Busy right turn + pedestrian scan",
            description:
              "Slow early, check crosswalk, and look for pedestrians stepping in late.",
            timestampSeconds: 145,
            severity: "must-do",
            location: { lat: 43.7222, lng: -79.6882 },
          },
          {
            id: "br-g2-2",
            title: "Lane change setup",
            description:
              "Mirror → signal → shoulder check. Don’t drift before the shoulder check.",
            timestampSeconds: 310,
            severity: "common-mistake",
            location: { lat: 43.7237, lng: -79.6863 },
          },
        ],
      },
      {
        id: "brampton-g-highway",
        name: "G Highway Segment (Mock)",
        testType: "G",
        distanceKm: 16.2,
        durationMin: 25,
        path: [
          { lat: 43.7209, lng: -79.6909 },
          { lat: 43.7168, lng: -79.6849 },
          { lat: 43.7118, lng: -79.6787 },
          { lat: 43.7069, lng: -79.6708 },
          { lat: 43.7124, lng: -79.6792 },
          { lat: 43.7209, lng: -79.6909 },
        ],
        walkthroughVideo: {
          title: "Brampton G Route (Highway) Walkthrough (Mock)",
          embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        highlights: [
          {
            id: "br-g-1",
            title: "Merging speed discipline",
            description:
              "Use the ramp to match traffic speed (when safe). Avoid merging too slowly.",
            timestampSeconds: 220,
            severity: "must-do",
            location: { lat: 43.7118, lng: -79.6787 },
          },
          {
            id: "br-g-2",
            title: "Following distance at higher speeds",
            description:
              "Maintain a safe space cushion; don’t ride alongside vehicles for long periods.",
            timestampSeconds: 420,
            severity: "watch-out",
            location: { lat: 43.7069, lng: -79.6708 },
          },
        ],
      },
    ],
  },
  {
    id: "etobicoke",
    name: "DriveTest Etobicoke",
    city: "Etobicoke",
    addressLine1: "5555 Eglinton Ave W",
    addressLine2: "Etobicoke, ON",
    coordinates: { lat: 43.6383, lng: -79.5757 },
    testsOffered: ["G2", "G"],
    hoursNote: "Give yourself extra time—traffic can be heavy near peak hours.",
    arrivalTips: [
      "Plan your approach route ahead of time to reduce stress.",
      "Keep your phone away—focus on calm breathing and checklist habits.",
      "Expect more complex multi-lane situations and busier merges.",
    ],
    whatToExpect: {
      examinerFocus: [
        "Lane discipline and early positioning",
        "Smooth braking and predictable acceleration",
        "Clear observation for pedestrians/cyclists",
        "Confident but safe merging/lane changes",
      ],
      parkingNotes: [
        "Practice reversing into a spot smoothly while checking surroundings.",
        "Use slow control; don’t rely on camera alone—check mirrors/shoulder.",
      ],
      localQuirks: [
        "Higher traffic density—don’t rush decisions to ‘keep up.’",
        "Watch for buses and lane shifts near major intersections.",
      ],
    },
    routes: [
      {
        id: "etobicoke-g2-city-core",
        name: "G2 City Core Practice (Mock)",
        testType: "G2",
        distanceKm: 8.8,
        durationMin: 17,
        path: [
          { lat: 43.6383, lng: -79.5757 },
          { lat: 43.6397, lng: -79.5719 },
          { lat: 43.6415, lng: -79.569 },
          { lat: 43.6388, lng: -79.5668 },
          { lat: 43.6364, lng: -79.5709 },
          { lat: 43.6383, lng: -79.5757 },
        ],
        walkthroughVideo: {
          title: "Etobicoke G2 Route Walkthrough (Mock)",
          embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        highlights: [
          {
            id: "et-g2-1",
            title: "Complex intersection scanning",
            description:
              "Scan left-right-left, check crosswalks, and confirm green is clear.",
            timestampSeconds: 190,
            severity: "must-do",
            location: { lat: 43.6415, lng: -79.569 },
          },
          {
            id: "et-g2-2",
            title: "Early lane setup",
            description:
              "Get into the correct lane early—last-second lane changes increase risk.",
            timestampSeconds: 360,
            severity: "watch-out",
            location: { lat: 43.6388, lng: -79.5668 },
          },
        ],
      },
    ],
  },
  {
    id: "mississauga",
    name: "DriveTest Mississauga",
    city: "Mississauga",
    addressLine1: "2555 Stanfield Rd",
    addressLine2: "Mississauga, ON",
    coordinates: { lat: 43.6402, lng: -79.6347 },
    testsOffered: ["G2", "G"],
    arrivalTips: [
      "Do a quick pre-drive check: seat, mirrors, steering wheel, seatbelt.",
      "Expect lane changes—practice MSM (mirror-signal-shoulder) habit.",
      "Arrive early to settle nerves and review your plan.",
    ],
    whatToExpect: {
      examinerFocus: [
        "Consistent signaling and mirror checks",
        "Safe gaps for lane changes and turns",
        "Speed control near school zones and busy corridors",
      ],
      parkingNotes: [
        "Be ready to demonstrate controlled parking (reverse/parallel).",
        "Look around before moving—pedestrians may walk behind the vehicle.",
      ],
      localQuirks: [
        "Watch for sudden merges and commercial driveways.",
        "Stay calm in heavier traffic; keep a safe space cushion.",
      ],
    },
    routes: [
      {
        id: "mississauga-g2-steady-loop",
        name: "G2 Steady Loop (Mock)",
        testType: "G2",
        distanceKm: 10.1,
        durationMin: 19,
        path: [
          { lat: 43.6402, lng: -79.6347 },
          { lat: 43.6421, lng: -79.6322 },
          { lat: 43.6438, lng: -79.6298 },
          { lat: 43.6413, lng: -79.6269 },
          { lat: 43.6386, lng: -79.6297 },
          { lat: 43.6402, lng: -79.6347 },
        ],
        walkthroughVideo: {
          title: "Mississauga G2 Route Walkthrough (Mock)",
          embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        highlights: [
          {
            id: "mi-g2-1",
            title: "Right turn from multi-lane road",
            description:
              "Signal early, mirror check, blind spot (cyclists), and turn into correct lane.",
            timestampSeconds: 210,
            severity: "must-do",
            location: { lat: 43.6421, lng: -79.6322 },
          },
          {
            id: "mi-g2-2",
            title: "Speed maintenance",
            description:
              "Hold a steady speed; don’t creep above the limit when traffic opens up.",
            timestampSeconds: 415,
            severity: "common-mistake",
            location: { lat: 43.6413, lng: -79.6269 },
          },
        ],
      },
    ],
  },
];

export function getDrivingCentre(centreId: string): DrivingCentre | undefined {
  return DRIVING_CENTRES.find((c) => c.id === centreId);
}

