import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AGENT_ATTRIBUTION, AGENT_PROJECTS } from "@/data/agentProjects";
import { ProjectAssistant } from "@/components/projects/ProjectAssistant";
import styles from "@/components/projects/projects.module.css";

export function generateStaticParams() { return AGENT_PROJECTS.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const record = AGENT_PROJECTS.find((item) => item.slug === slug);
  return { title: record ? `${record.name} · Nasir Bhutta` : "Project not found", description: record?.summary, alternates: { canonical: `/agents/${slug}` } };
}

export default async function AgentProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = AGENT_PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();
  return <div className={styles.casePage}>
    <header className={styles.caseNavigation}><Link href="/#agent-projects"><ArrowLeft size={16} /> Agent projects</Link><Link className={styles.caseBrand} href="/">Nasir Bhutta<span>AI & SOFTWARE ENGINEERING</span></Link><ProjectAssistant projectSlug={project.slug} /></header>
    <main id="case-content">
      <header className={styles.caseHero}><div className={styles.caseOverline}><span>AGENT ENGINEERING / PROJECT STUDY</span><span>{project.kind}</span></div><div className={styles.caseTitle}><h1>{project.name}</h1><p>{project.summary}</p></div><ul className={styles.stack}>{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul></header>
      <div className={styles.caseBody}><nav className={styles.caseContents} aria-label="Case study sections"><span>IN THIS STUDY</span><a href="#workflow">01 / Workflow</a><a href="#engineering">02 / Engineering</a><a href="#scope">03 / Scope & attribution</a></nav><div className={styles.caseSections}>
        <section id="workflow"><span className={styles.eyebrow}>01 / FROM INPUT TO OUTPUT</span><h2>The workflow.</h2><ol className={styles.contributions}>{project.workflow.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol></section>
        <section id="engineering"><span className={styles.eyebrow}>02 / IMPLEMENTATION</span><h2>The engineering choices.</h2><p className={styles.caseProblem}>{project.engineering}</p></section>
        <section id="scope"><span className={styles.eyebrow}>03 / CONTEXT & BOUNDARIES</span><h2>The scope.</h2><p className={styles.caseProblem}>{project.limitation}</p><p className={styles.outcomeNote}>{AGENT_ATTRIBUTION}</p><h3>Implementation reference</h3><p>{project.source}</p><p className={styles.outcomeNote}>Based on Nasir&apos;s supplied project documentation and selected source review. This portfolio update did not execute research, emails, browser agents, or trading workflows.</p></section>
        <Link className={styles.readLink} href="/#agent-projects">Explore the agent collection<ArrowUpRight size={16} /></Link>
      </div></div>
    </main>
  </div>;
}
