import { AI_OUTLINES, PROJECT_STUDIES, projectFromQuestion } from "./knowledge";
import { CERTIFICATE_DOCUMENTS } from "../../data/certificates";
import { CREDENTIAL_RECORDS, EXPERIENCE_RECORDS } from "../../data/professionalIdentity";
import { AGENT_PROJECTS } from "../../data/agentProjects";
import type { AssistantProvider, AssistantReply, AssistantRequest } from "./types";

const overviewSource = { label: "Selected projects", href: "/#selected-work" };
const aiSource = { label: "AI engineering & documentation", href: "/#ai-engineering" };

/** Deliberately bounded keyword responder, not generation or autonomous tool use. */
export function answerFromPortfolio(request: AssistantRequest): AssistantReply {
  const lower = request.question.toLowerCase();
  const previousProject = [...request.history].reverse().filter((turn) => turn.role === "user").map((turn) => projectFromQuestion(turn.text)).find(Boolean);
  const slug = projectFromQuestion(request.question) ?? request.projectSlug ?? previousProject;
  const reply = (text: string, sources = [overviewSource]): AssistantReply => ({ text, sources, mode: "scripted" });
  const agentProject = AGENT_PROJECTS.find((project) => project.slug === slug);
  if (agentProject) return reply(`${agentProject.summary}\n\n${agentProject.workflow.join(" ")}\n\n${agentProject.kind}. ${agentProject.limitation}`, [{ label: agentProject.name, href: `/agents/${agentProject.slug}` }]);

  if (/\b(instagram|insta|channel|vibecode)\b/.test(lower)) return reply("Nasir runs Vibecode Unpacked, his Instagram tech channel at @vibecode_unpacked, sharing software engineering, AI, and development content.", [{ label: "Vibecode Unpacked channel", href: "/#channel" }]);
  if (/\bielts\b/.test(lower)) return reply(`Nasir's IELTS Academic record is dated ${CREDENTIAL_RECORDS.find((record) => record.id === "cert-ielts")?.date}.`, [{ label: "Education & language assessment", href: "/#education" }]);
  if (/\b(certificates?|certifications?|credentials?|courses?|micro1|forage|udemy|hugging face)\b/.test(lower)) return reply(CERTIFICATE_DOCUMENTS.map(({ title, issuer, date }) => `${title} — ${issuer}, ${date}.`).join("\n\n"), [{ label: "View certificate documents", href: "/#certificates" }]);
  if (/\b(crifly|cifly|internship|internships)\b/.test(lower)) return reply(EXPERIENCE_RECORDS.filter((record) => /intern/i.test(record.role) || record.company === "Crifly").map(({ company, role, period }) => `${company}: ${role}, ${period}.`).join("\n\n"), [{ label: "Experience & internships", href: "/#experience" }]);

  if (/\b(contact|email|hire|reach|availability|available|rate|pricing)\b/.test(lower)) {
    return reply("You can contact Nasir at dev.nasirbhutta@gmail.com. Availability, rates, and a specific project commitment need to be confirmed with him directly.");
  }
  if (/\b(users?|revenue|salary|metrics?|percent|percentage|awards?|nobel|certif|gpa|ielts|clients?|years? of experience)\b/.test(lower)) {
    return reply("I don’t have supporting evidence here to verify that figure or qualification. I can explain the documented projects and Nasir’s contribution, or you can contact him directly for evidence.");
  }
  if (slug && slug in AI_OUTLINES) return reply(AI_OUTLINES[slug as keyof typeof AI_OUTLINES], [aiSource]);
  if (/\b(mcp|model context protocol|agentic|agents?|autonomous)\b/.test(lower) && !projectFromQuestion(request.question)) {
    return reply("Nasir's agent collection includes multi-agent paper trading, a deep research assistant, a LangGraph browser sidekick, and a CrewAI engineering team, alongside smaller learning experiments and custom integrations. Course implementations retain attribution to Ed Donner's AI Agentic Engineering course. I am answering from the local guide while the hosted assistant is unavailable.", [{ label: "Agent projects & workflows", href: "/#agent-projects" }]);
  }
  const project = PROJECT_STUDIES.find((item) => item.slug === slug);
  if (project) {
    const source = [{ label: `${project.name} case study`, href: `/work/${project.slug}` }];
    if (project.capabilities) {
      const requested = project.capabilities.find((capability) => capability.title.toLowerCase().split(/[^a-z]+/).filter((word) => word.length > 3).some((word) => lower.includes(word)));
      if (requested) return reply(`${requested.title}: ${requested.description}`, source);
      if (/\b(features?|modules?|scope|capabilities)\b/.test(lower)) return reply(project.capabilities.map(({ title, description }) => `${title}: ${description}`).join("\n\n"), source);
    }
    if (/\b(model|llm|provider|gpt|claude|gemini)\b/.test(lower)) return reply(`The portfolio does not document a specific LLM provider or model for ${project.name}. I can explain its documented stack and architecture, but I can’t verify that detail.`, source);
    if (/\b(stack|technolog|tools?|database|languages?)|built with/.test(lower)) return reply(`${project.name} uses the following documented stack: ${project.stack.join(", ")}. ${project.attribution}.`, source);
    if (/\b(who|own|role|contribut|independent|company|team)\w*/.test(lower)) return reply(`${project.role}. ${project.attribution}. ${project.contribution.join(" ")}`, source);
    if (/\b(architecture|work|retriev|rag|offline|sync|security|faiss|embed|pipeline)\w*/.test(lower)) return reply(project.decisions.map((decision) => `${decision.title} ${decision.implementation}`).join("\n\n"), source);
    if (/\b(outcome|result|impact)\b/.test(lower)) return reply(project.outcome, source);
    if (/\b(tell|about|explain|overview|what|project)\b/.test(lower) || lower.trim() === project.name.toLowerCase()) return reply(`${project.summary}\n\n${project.attribution}. ${project.outcome}`, source);
    return reply(`I can discuss ${project.name}’s documented stack, architecture, contribution, and outcome. I don’t have a verified answer to that specific question.`, source);
  }
  if (/\b(rag|retrieval|embedding|vector|llm|language model|ai integration)\w*/.test(lower)) {
    return reply("BrainBee is a co-developed COMSATS capstone using textbook embeddings, FAISS semantic retrieval, and retrieval-augmented learning features alongside quizzes and flashcards. The portfolio does not identify its model provider. The workflow on this page is an illustrative local walkthrough, not a live embedding or LLM service.", [{ label: "BrainBee case study", href: "/work/brainbee" }, aiSource]);
  }
  if (/\b(skills?|experience|mobile|flutter|backend|services|build)\b/.test(lower)) {
    return reply("Nasir’s documented work includes Flutter mobile applications, backend integrations, offline retail software, and retrieval-assisted learning. NIZAAM is an independent product; BrainBee is a team capstone; Talib, GotCakey, Shoutsy, and 24ifix are company contributions. Ask about a project for its specific role and stack.");
  }
  return reply("I’m a scripted guide to Nasir’s portfolio. I can help with project contributions, stacks, engineering choices, and contact information. I don’t have a verified answer to that question. Try asking about BrainBee, NIZAAM, or his company work.");
}

export const scriptedProvider: AssistantProvider = {
  mode: "scripted",
  async respond(request, signal) {
    if (signal?.aborted) throw new DOMException("Request cancelled", "AbortError");
    return answerFromPortfolio(request);
  },
};
