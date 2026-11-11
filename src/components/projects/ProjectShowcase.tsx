import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OWNERSHIP_LABELS, PROJECT_STUDIES, type ProjectStudy } from "@/data/projectShowcase";
import { ProjectVisual } from "./ProjectVisual";
import styles from "./projects.module.css";

function ProjectSummary({ project, number }: { project: ProjectStudy; number: number }) {
  return (
    <div className={styles.projectCopy}>
      <div className={styles.projectMeta}><span>0{number}</span><span>{OWNERSHIP_LABELS[project.ownership]}</span></div>
      <h3><Link href={`/work/${project.slug}`}>{project.name}<ArrowUpRight size={23} /></Link></h3>
      <p className={styles.summary}>{project.summary}</p>
      <p className={styles.attribution}>{project.attribution}</p>
      <dl className={styles.quickFacts}>
        <div><dt>The problem</dt><dd>{project.problem}</dd></div>
        <div><dt>My contribution</dt><dd>{project.contribution[0]}</dd></div>
        <div><dt>The result</dt><dd>{project.outcome}</dd></div>
      </dl>
      <ul className={styles.stack} aria-label={`${project.name} technology stack`}>{project.stack.slice(0, 5).map((tech) => <li key={tech}>{tech}</li>)}</ul>
      {project.slug === "kingston" && <a className={styles.readLink} href="https://kingston-site.vercel.app/" target="_blank" rel="noopener noreferrer">Visit Kingston<ArrowUpRight size={16} /></a>}
      <Link className={styles.readLink} href={`/work/${project.slug}`}>Inside {project.name}<ArrowUpRight size={16} /></Link>
    </div>
  );
}

export function ProjectShowcase() {
  const brainbee = PROJECT_STUDIES.find((project) => project.slug === "brainbee")!;
  const nizaam = PROJECT_STUDIES.find((project) => project.slug === "nizaam")!;
  const projects = PROJECT_STUDIES.filter((project) => project !== brainbee && project !== nizaam);
  const numberOf = (project: ProjectStudy) => PROJECT_STUDIES.indexOf(project) + 1;
  return (
    <section id="selected-work" className={styles.showcase} aria-labelledby="selected-work-title">
      <header className={styles.showcaseHeader}>
        <div><span className={styles.eyebrow}>03 / PRODUCTS & CONTRIBUTIONS</span><h2 id="selected-work-title">Different problems.<br /><em>The same care.</em></h2></div>
        <p>Independent products, shared builds, and company work. A closer look at what I made, how I contributed, and the decisions underneath.</p>
      </header>
      <nav className={styles.projectIndex} aria-label="Jump to a project">
        {PROJECT_STUDIES.map((project, index) => <a key={project.slug} href={`#work-${project.slug}`}><span>0{index + 1}</span>{project.name}</a>)}
      </nav>

      <article id="work-brainbee" className={styles.leadProject}>
        <Link href="/work/brainbee" className={styles.visualLink} aria-label="Read the BrainBee case study"><ProjectVisual project={brainbee} /></Link>
        <ProjectSummary project={brainbee} number={numberOf(brainbee)} />
      </article>
      <article id="work-nizaam" className={styles.secondProject}>
        <ProjectSummary project={nizaam} number={numberOf(nizaam)} />
        <Link href="/work/nizaam" className={styles.visualLink} aria-label="Read the NIZAAM case study"><ProjectVisual project={nizaam} /></Link>
      </article>

      <div className={styles.companyHeading}><span className={styles.eyebrow}>MORE SELECTED WORK</span><p>Full stack builds, company work,<br /><em>and open-source engineering.</em></p></div>
      <div className={styles.projectCollection}>
        {projects.map((project) => <article id={`work-${project.slug}`} key={project.slug} className={styles.collectionItem}>
          {project.video ? <ProjectVisual project={project} compact /> : <Link href={`/work/${project.slug}`} className={styles.visualLink} aria-label={`Read the ${project.name} case study`}><ProjectVisual project={project} compact /></Link>}
          <ProjectSummary project={project} number={numberOf(project)} />
        </article>)}
      </div>
      <div className={styles.workFooter}><span>THE ROLE MATTERS AS MUCH AS THE RESULT.</span><a href="#selected-work">Back to the project index ↑</a></div>
    </section>
  );
}
