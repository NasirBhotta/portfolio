import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AGENT_ATTRIBUTION, AGENT_PROJECTS } from "@/data/agentProjects";
import styles from "./ai.module.css";

export function AgentProjectCollection() {
  return <section id="agent-projects" className={styles.agentCollection} aria-labelledby="agent-projects-title">
    <header className={styles.outlineHeading}><span className={styles.eyebrow}>EARLY AGENTS & CUSTOM EXTENSIONS</span><div><h3 id="agent-projects-title">From learning workflows<br /><em>to connected systems.</em></h3><p>{AGENT_ATTRIBUTION}</p></div></header>
    <div className={styles.agentGrid}>{AGENT_PROJECTS.filter((project) => project.featured).map((project) => <article key={project.slug}>
      <span className={styles.eyebrow}>{project.kind}</span><h4><Link href={`/agents/${project.slug}`}>{project.name}<ArrowUpRight size={19} /></Link></h4><p>{project.summary}</p><ul aria-label="Technologies">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul><Link className={styles.agentLink} href={`/agents/${project.slug}`}>Workflow & engineering<ArrowUpRight size={15} /></Link>
    </article>)}</div>
    <details className={styles.agentArchive}><summary>Explore 12 more agents & experiments<span aria-hidden="true">+</span></summary><div className={styles.agentGrid}>{AGENT_PROJECTS.filter((project) => !project.featured).map((project) => <article key={project.slug}><span className={styles.eyebrow}>{project.kind}</span><h4><Link href={`/agents/${project.slug}`}>{project.name}<ArrowUpRight size={18} /></Link></h4><p>{project.summary}</p><Link className={styles.agentLink} href={`/agents/${project.slug}`}>Explore the project<ArrowUpRight size={15} /></Link></article>)}</div></details>
    <p className={styles.agentEvidence}>These case studies describe documented implementations. Fresh execution results, deployment claims, and performance metrics are shown only when available. The model adapter and crypto dashboard extend the paper-trading system.</p>
  </section>;
}
