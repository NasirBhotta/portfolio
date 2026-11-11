import { PORTFOLIO_DATA } from "./portfolioData";
import { CERTIFICATE_DOCUMENTS } from "./certificates";

const details: Record<string, { kind: string; ongoing: boolean; contributions: string[]; projects: { name: string; slug: string }[] }> = {
  AXAON: {
    kind: "Employment · Remote", ongoing: true,
    contributions: [
      "Engineering the Flutter client for 24ifix, an on-demand device-repair service.",
      "Onboarding, authentication, and booking flows for home pickup and in-shop appointments.",
      "Customer dashboard and REST API integration for repair status and technician tracking.",
    ],
    projects: [{ name: "24ifix", slug: "24ifix" }],
  },
  GLOWSIMS: {
    kind: "Internship", ongoing: false,
    contributions: [
      "Contributed to the Talib LMS during a mobile app development internship.",
      "Worked on query optimization, database indexing, enrollment, and attendance workflows.",
      "Improved the Flutter dashboard’s loading approach with caching, lazy loading, and pagination.",
    ],
    projects: [{ name: "Talib", slug: "talib" }],
  },
  Crifly: {
    kind: "Employment · Part-time", ongoing: false,
    contributions: [
      "Co-developed commercial Flutter applications including GotCakey and Shoutsy as part of the Crifly team.",
      "Integrated REST APIs, Firebase authentication, real-time synchronization, and Node.js / Express / MongoDB services.",
      "Used MVVM and BLoC architecture; contributed to defect resolution, testing, and release pipelines.",
    ],
    projects: [{ name: "GotCakey", slug: "gotcakey" }, { name: "Shoutsy", slug: "shoutsy" }],
  },
};

// Titles and periods come directly from the supplied records. Editorial summaries
// omit unsupported metrics; project ownership and company attribution are retained.
export const EXPERIENCE_RECORDS = PORTFOLIO_DATA.experience.map((record) => {
  const detail = details[record.company];
  const internship = record.company === "Crifly" && record.type === "Internship";
  return {
    company: record.company,
    role: record.role,
    period: record.period,
    location: record.location,
    kind: internship ? "First internship" : detail?.kind ?? record.type,
    ongoing: /present|current/i.test(record.period),
    contributions: internship ? record.highlights : detail?.contributions ?? [],
    projects: internship ? [] : detail?.projects ?? [],
  };
});

export const EXPERTISE = [
  { number: "01", title: "Mobile engineering", description: "Flutter applications with clear state ownership, deliberate architecture, and interfaces that remain useful when connections are unreliable.", tools: ["Flutter", "Dart", "Riverpod", "BLoC", "MVVM", "Offline persistence"], example: { label: "NIZAAM / local-first retail", href: "/work/nizaam" } },
  { number: "02", title: "Backend & systems", description: "APIs and data models that connect the product’s workflows. Authentication, real-time updates, and tenant boundaries belong in the system design.", tools: ["Node.js", "Express", "MongoDB", "Firebase", "REST APIs", "PostgreSQL / Supabase"], example: { label: "Shoutsy / connected workflows", href: "/work/shoutsy" } },
  { number: "03", title: "AI engineering", description: "Retrieval-assisted learning in BrainBee, with agents, MCP, LLM integration, and automation as areas of practice. The AI section distinguishes implemented work from project outlines.", tools: ["RAG", "Embeddings", "FAISS", "Agents & MCP", "LLM integration", "Automation"], example: { label: "AI engineering / evidence & boundaries", href: "/#ai-engineering" } },
  { number: "04", title: "Infrastructure & delivery", description: "Automated testing, CI, deployment integration, and release workflows. My operational focus is to make failures visible and recovery understandable.", tools: ["Git", "GitHub Actions", "Unit / fuzz / stress tests", "Deployment", "Release pipelines", "Observability principles"], example: { label: "ors_map / testing & navigation", href: "/work/ors-map" } },
];

// Existing “Verified” status values are not proof. No badge is propagated here.
export const CREDENTIAL_RECORDS = PORTFOLIO_DATA.certificates.filter((record) => !CERTIFICATE_DOCUMENTS.some((document) => document.id === record.id)).map((record) => ({
  id: record.id,
  title: record.id === "cert-french" ? "French language coursework" : record.id === "cert-ielts" ? "IELTS Academic" : record.title,
  issuer: record.issuer,
  date: record.date,
  kind: record.id === "cert-french" ? "University coursework" : record.id === "cert-ielts" ? "Language assessment" : "Listed course",
  href: record.credentialUrl?.startsWith("https://") ? record.credentialUrl : undefined,
})).concat(CERTIFICATE_DOCUMENTS);

export const PROFESSIONAL_PROFILES = [
  { name: "GitHub", href: PORTFOLIO_DATA.profile.github, description: "Code, repositories, and engineering experiments." },
  { name: "LinkedIn", href: PORTFOLIO_DATA.profile.linkedin, description: "Professional background and conversations." },
  { name: "Instagram", href: PORTFOLIO_DATA.profile.instagram, description: "Software engineering, AI, and development content.", handle: PORTFOLIO_DATA.profile.instagramHandle },
];

export function contactEmail(subject?: string) {
  return `mailto:${PORTFOLIO_DATA.profile.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
