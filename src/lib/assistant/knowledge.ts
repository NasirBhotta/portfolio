import { PROJECT_STUDIES } from "../../data/projectShowcase";
import { AGENT_PROJECTS } from "../../data/agentProjects";

export const ASSISTANT_CONTEXTS = [
  ...PROJECT_STUDIES.map(({ slug, name }) => ({ slug, name })),
  ...AGENT_PROJECTS.map(({ slug, name }) => ({ slug, name })),
  { slug: "cvflow", name: "CVFlow" },
  { slug: "university-research-agent", name: "University Research Agent" },
];

export const PROJECT_ALIASES: Record<string, string[]> = {
  brainbee: ["brainbee", "brain bee"], nizaam: ["nizaam", "nizam", "mobileshop", "mobile shop saas"], talib: ["talib", "glowsims"],
  gotcakey: ["gotcakey", "got cakey", "got bakey", "got backey"], shoutsy: ["shoutsy"], "24ifix": ["24ifix", "24 ifix"],
  ecommerce: ["ecommerce", "e-commerce", "ecommerce_app", "flutter ecommerce", "shopping app"],
  "ors-map": ["ors_map", "ors map", "navigation engine", "mapbox", "3d navigation"], cvflow: ["cvflow", "cv flow"],
  "university-research-agent": ["university research", "research agent", "france university"],
};

export function projectFromQuestion(question: string) {
  const lower = question.toLowerCase();
  return AGENT_PROJECTS.find((project) => lower.includes(project.name.toLowerCase()) || lower.includes(project.slug.replaceAll("-", " ")))?.slug
    ?? Object.entries(PROJECT_ALIASES).find(([, aliases]) => aliases.some((alias) => lower.includes(alias)))?.[0];
}

export const AI_OUTLINES = {
  cvflow: "CVFlow is described in Nasir’s portfolio brief as AI-enabled CV processing and automation. Its implementation, model provider, deployment, and outcomes are not documented in the portfolio yet, so I can’t confirm those details.",
  "university-research-agent": "The University Research Agent is described as research and recommendation automation. The existing portfolio also mentions a France University Research Agent. Its tool integrations, orchestration, model provider, and outcomes are not documented here.",
};

export { PROJECT_STUDIES };
