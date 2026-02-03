import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDrivingCentre } from "../../../../constants/driving-centres";
import CentreDetailClient from "./CentreDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ centreId: string }>;
}): Promise<Metadata> {
  const { centreId } = await params;
  const centre = getDrivingCentre(centreId);
  if (!centre) return { title: "Centre Not Found | DriveAura" };
  return {
    title: `${centre.city} DriveTest Centre | DriveAura`,
    description: `Practice routes, map previews, and walkthrough videos for ${centre.name}.`,
  };
}

export default async function CentreDetailPage({
  params,
}: {
  params: Promise<{ centreId: string }>;
}) {
  const { centreId } = await params;
  const centre = getDrivingCentre(centreId);
  if (!centre) notFound();

  return <CentreDetailClient centre={centre} />;
}

