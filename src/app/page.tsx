import type { Metadata } from "next";
import { InfrastructurePrototype } from "@/components/prototype/InfrastructurePrototype";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { AIEngineeringShowcase } from "@/components/ai/AIEngineeringShowcase";
import { ProfessionalIdentity } from "@/components/identity/ProfessionalIdentity";

export const metadata: Metadata = {
  title: "Nasir Bhutta — From interface to infrastructure",
  description: "From interface to infrastructure: selected mobile, backend, and AI engineering by Nasir Bhutta. Explore BrainBee, NIZAAM, and contributions to commercial products.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <InfrastructurePrototype projects={<ProjectShowcase />} engineering={<AIEngineeringShowcase />} professional={<ProfessionalIdentity />} />;
}
