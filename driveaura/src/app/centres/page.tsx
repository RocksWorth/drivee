import type { Metadata } from "next";

import { DRIVING_CENTRES } from "../../../constants/driving-centres";
import { CentresDirectoryClient } from "./_components/CentresDirectoryClient";

export const metadata: Metadata = {
  title: "Driving Centres | DriveAura",
  description:
    "Directory of Ontario DriveTest centres with practice routes, maps, and walkthrough videos.",
};

export default function CentresPage() {
  return <CentresDirectoryClient centres={DRIVING_CENTRES} />;
}

