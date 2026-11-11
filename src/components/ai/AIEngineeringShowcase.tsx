import Link from "next/link";
import { AgentProjectCollection } from "./AgentProjectCollection";
import { ArrowUpRight } from "lucide-react";
import { RetrievalWalkthrough } from "./RetrievalWalkthrough";
import { RepresentativeInvitation } from "./RepresentativeInvitation";
import styles from "./ai.module.css";

export function AIEngineeringShowcase() {
  return (
    <section id="ai-engineering" className={styles.section} aria-labelledby="ai-engineering-title">
      <header className={styles.heading}><div><span className={styles.eyebrow}>04 / APPLIED INTELLIGENCE</span><h2 id="ai-engineering-title">Useful intelligence.<br /><em>Visible reasoning.</em></h2></div><p>The interesting part is the system around the model: what it can retrieve, what it can do, and how honestly it handles what it doesn’t know.</p></header>
      <article className={styles.brainbee}>
        <div><span className={styles.eyebrow}>BRAINBEE / CO-DEVELOPED CAPSTONE</span><h3>From textbook material<br />to active learning.</h3><p>Embeddings and FAISS semantic retrieval connect textbook material to retrieval-assisted learning. Quizzes, flashcards, and progress features bring that capability into a Flutter application.</p><Link href="/work/brainbee">Explore the implementation<ArrowUpRight size={16} /></Link></div>
        <dl className={styles.responsibilities}><div><dt>01 / REPRESENT</dt><dd>Textbook embeddings make material searchable by semantic similarity.</dd></div><div><dt>02 / RETRIEVE</dt><dd>A FAISS index supports finding relevant material for a learning question.</dd></div><div><dt>03 / INTEGRATE</dt><dd>Retrieval-assisted study lives inside a product, alongside practice and progress.</dd></div></dl>
      </article>
      <RetrievalWalkthrough />
      <AgentProjectCollection />
      <div className={styles.outlineHeading}><span className={styles.eyebrow}>AUTOMATION & AGENTIC WORKFLOWS</span><p>Keep the implementation<br /><em>separate from the ambition.</em></p></div>
      <div className={styles.outlines}>
        <article><div><span>01 / PROJECT OUTLINE</span><h3>CVFlow</h3></div><p>AI-enabled CV processing and automation. The project is identified in my portfolio brief; model choices, implementation details, and outcomes aren’t documented here yet.</p><span className={styles.documentation}>Scope identified · technical case study pending</span></article>
        <article><div><span>02 / PROJECT OUTLINE</span><h3>University<br />Research Agent</h3></div><p>Research and recommendation automation, also mentioned as a France University Research Agent in the existing portfolio. Tool integrations and orchestration details aren’t documented here yet.</p><span className={styles.documentation}>Scope identified · technical case study pending</span></article>
      </div>
      <div className={styles.boundaryNotes}><div><span className={styles.eyebrow}>AGENTS & MCP / ARCHITECTURE NOTE</span><h3>A tool interface<br />is a boundary.</h3><p>MCP can expose tools and resources through defined interfaces. An agentic workflow still needs clear orchestration, permissions, and error handling. A protocol connection alone does not make a system autonomous.</p></div><div><span className={styles.eyebrow}>LLM INTEGRATION / PRODUCT NOTE</span><h3>The model belongs<br />inside a product.</h3><p>Mobile and web clients need useful results, understandable loading states, and a way forward when a service fails. Keep provider credentials on the server and keep the interface independent of the response provider.</p></div></div>
      <RepresentativeInvitation />
    </section>
  );
}
