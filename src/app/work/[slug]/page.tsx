import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectStudy, OWNERSHIP_LABELS, PROJECT_STUDIES } from "@/data/projectShowcase";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ProjectAssistant } from "@/components/projects/ProjectAssistant";
import styles from "@/components/projects/projects.module.css";

export function generateStaticParams() {
  return PROJECT_STUDIES.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProjectStudy((await params).slug);
  return { title: project ? `${project.name} — Engineering case study · Nasir Bhutta` : "Project not found", description: project?.summary, robots: { index: true, follow: true }, alternates: project ? { canonical: `/work/${project.slug}` } : undefined };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectStudy((await params).slug);
  if (!project) notFound();
  const index = PROJECT_STUDIES.indexOf(project);
  const next = PROJECT_STUDIES[(index + 1) % PROJECT_STUDIES.length];
  return (
    <div className={styles.casePage}>
      <a className={styles.skipLink} href="#case-content">Skip to case study</a>
      <header className={styles.caseNavigation}><Link href="/#selected-work"><ArrowLeft size={16} /> All projects</Link><Link href="/" className={styles.caseBrand}>Nasir Bhutta<span>AI-NATIVE SOFTWARE ENGINEER</span></Link><ProjectAssistant projectSlug={project.slug} /></header>
      <main id="case-content">
        <header className={styles.caseHero}>
          <div className={styles.caseOverline}><span>CASE STUDY / 0{index + 1}</span><span>{OWNERSHIP_LABELS[project.ownership]}</span></div>
          <div className={styles.caseTitle}><h1>{project.name}</h1><p>{project.summary}</p></div>
          <dl className={styles.caseFacts}><div><dt>Context</dt><dd>{project.attribution}</dd></div><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Discipline</dt><dd>{project.category}</dd></div></dl>
          <ProjectVisual project={project} />
        </header>
        <div className={styles.caseBody}>
          <nav className={styles.caseContents} aria-label="Case study sections"><span>IN THIS STUDY</span><a href="#problem">01 / The problem</a><a href="#contribution">02 / My contribution</a><a href="#decisions">03 / Engineering decisions</a><a href="#outcome">04 / The outcome</a><Link href="/#selected-work">← Project index</Link></nav>
          <div className={styles.caseSections}>
            <section id="problem"><span className={styles.eyebrow}>01 / CONTEXT</span><h2>The problem.</h2><p className={styles.caseProblem}>{project.problem}</p></section>
            <section id="contribution"><span className={styles.eyebrow}>02 / MY CONTRIBUTION</span><h2>The work I took on.</h2><ul className={styles.contributions}>{project.contribution.map((item, itemIndex) => <li key={item}><span>0{itemIndex + 1}</span>{item}</li>)}</ul><h3 className={styles.stackHeading}>Tools & technologies</h3><ul className={styles.stack}>{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>{project.capabilities && <div className={styles.capabilities}><h3>Connected business workflows</h3>{project.capabilities.map((capability) => <details key={capability.title}><summary>{capability.title}</summary><p>{capability.description}</p></details>)}</div>}</section>
            <section id="decisions"><span className={styles.eyebrow}>03 / ENGINEERING DECISIONS</span><h2>Below the surface.</h2>{project.decisions.map((decision) => <div key={decision.title} className={styles.decision}><h3>{decision.title}</h3><p>{decision.implementation}</p><div className={styles.consideration}><span>ENGINEERING CONSIDERATION</span><p>{decision.consideration}</p></div></div>)}</section>
            <section id="outcome"><span className={styles.eyebrow}>04 / THE OUTCOME</span><h2>The result.</h2><p className={styles.caseProblem}>{project.outcome}</p>{project.validation && <div className={styles.consideration}><span>VALIDATION & SCOPE</span><p>{project.validation}</p></div>}{project.ownership === "company" && <p className={styles.outcomeNote}>This is a contribution to a company product, built with its team.</p>}{project.repository && <a className={styles.readLink} href={project.repository} target="_blank" rel="noopener noreferrer">Explore the project repository<ArrowUpRight size={16} /></a>}</section>
            <div className={styles.caseContact}><p>Want to discuss the engineering?</p><a href={`mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(`Let’s talk about ${project.name}`)}`}>Start a conversation <ArrowUpRight size={18} /></a></div>
          </div>
        </div>
        <Link href={`/work/${next.slug}`} className={styles.nextProject}><div><span className={styles.eyebrow}>NEXT PROJECT / 0{(index + 1) % PROJECT_STUDIES.length + 1}</span><strong>{next.name}</strong><p>{next.attribution}</p></div><ArrowUpRight size={42} /></Link>
      </main>
      <footer className={styles.caseFooter}><Link href="/#selected-work">All projects</Link><span>NASIR BHUTTA / SELECTED ENGINEERING</span><a href="#case-content">Back to top ↑</a></footer>
    </div>
  );
}
