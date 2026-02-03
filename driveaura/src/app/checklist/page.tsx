import type { Metadata } from "next";
import PassengerChecklistClient from "./PassengerChecklistClient";

export const metadata: Metadata = {
  title: "Passenger Checklist | DriveAura",
  description:
    "Interactive passenger checklist for G2/G practice sessions: grade driving behaviors, track progress, and get a strengths & weaknesses summary.",
};

export default function PassengerChecklistPage() {
  return <PassengerChecklistClient />;
}

