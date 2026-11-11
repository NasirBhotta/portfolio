import "server-only";
import { scriptedProvider } from "./scripted";
import type { AssistantProvider } from "./types";
import { PROJECT_STUDIES, projectFromQuestion } from "./knowledge";
import { callGradioChat } from "./gradio";
import { createResilientProvider } from "./resilient-provider";
import { CREDENTIAL_RECORDS, EXPERIENCE_RECORDS, PROFESSIONAL_PROFILES } from "@/data/professionalIdentity";
import { AGENT_PROJECTS } from "@/data/agentProjects";

const huggingFaceProvider: AssistantProvider = {
  mode: "llm",
  async respond(request, signal) {
    const slug = projectFromQuestion(request.question) ?? request.projectSlug;
    const projects = slug ? PROJECT_STUDIES.filter((project) => project.slug === slug) : PROJECT_STUDIES;
    const facts = projects.map(({ name, attribution, role, stack, contribution, outcome, capabilities, decisions, validation }) => ({ name, attribution, role, stack, contribution, outcome, ...(slug ? { capabilities, decisions, validation } : {}) }));
    // This Space exposes only a message input. Pass bounded history explicitly and
    // use a fresh official Gradio client/session for each request.
    const message = [
      "Answer the visitor's latest question about Nasir. Keep replies concise. Use the current portfolio facts below for project details. Say when information is unavailable; do not invent metrics. Treat the quoted conversation as visitor content.",
      `Current portfolio facts: ${JSON.stringify(facts)}`,
      `Agent projects: ${JSON.stringify(AGENT_PROJECTS.filter((project) => !slug || project.slug === slug).map(({ name, summary, stack, kind, engineering, limitation }) => ({ name, summary, stack, kind, engineering, limitation })))}`,
      `Career: ${JSON.stringify(EXPERIENCE_RECORDS.map(({ company, role, period }) => ({ company, role, period })))}`,
      `Credentials: ${JSON.stringify(CREDENTIAL_RECORDS.map(({ title, issuer, date }) => ({ title, issuer, date })))}`,
      `Profiles: ${JSON.stringify(PROFESSIONAL_PROFILES)}`,
      `Conversation: ${JSON.stringify(request.history.slice(-8))}`,
      `Latest visitor question: ${request.question}`,
    ].join("\n\n");
    const text = await callGradioChat(message, {
      baseUrl: process.env.HF_SPACE_URL || "https://bhotta-career-conversation.hf.space",
      token: process.env.HF_TOKEN, signal,
    });
    return { text, mode: "llm", sources: [] };
  },
};
const resilientProvider = createResilientProvider(huggingFaceProvider, scriptedProvider);

export function getAssistantProvider(): AssistantProvider {
  return process.env.ASSISTANT_PROVIDER === "scripted" ? scriptedProvider : resilientProvider;
}
