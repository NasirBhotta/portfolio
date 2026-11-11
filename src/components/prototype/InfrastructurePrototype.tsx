"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Braces } from "lucide-react";
import { AssistantDialog } from "@/components/assistant/AssistantDialog";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ProductInstrument } from "./ProductInstrument";
import { useNativeTimeline } from "./useNativeTimeline";
import styles from "./prototype.module.css";

export function InfrastructurePrototype({ projects, engineering, professional }: { projects?: ReactNode; engineering?: ReactNode; professional?: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const [agentOpen, setAgentOpen] = useState(false);
  const [agentContext, setAgentContext] = useState<string>();
  useNativeTimeline(root);

  return (
    <div className={styles.prototype}>
      <a className={styles.skipLink} href="#nizaam">Skip to NIZAAM</a>
      <header className={styles.navigation}>
        <a href="#interface" className={styles.wordmark} aria-label="Nasir Bhutta, introduction">nb<span>／</span></a>
        <div className={styles.navIdentity}>NASIR BHUTTA<span>AI-NATIVE SOFTWARE ENGINEER</span></div>
        <nav aria-label="Primary navigation"><a href="#architecture">Approach</a><a href="#selected-work">Selected work <ArrowUpRight size={13} /></a><button onClick={() => { setAgentContext(undefined); setAgentOpen(true); }} aria-label="Ask my assistant">Ask my assistant <Braces size={15} /></button></nav>
      </header>

      <main>
        <section ref={root} className={styles.journey} aria-label="From interface to infrastructure">
          <div className={styles.stageTopline}><span>SOFTWARE, CONSIDERED FROM EVERY SIDE.</span><span>NASIR BHUTTA / SELECTED WORK</span></div>
          <div className={styles.stage}>
            <section id="interface" className={styles.heroCopy} aria-labelledby="prototype-title">
              <div className={styles.eyebrow}><span /> AI-NATIVE SOFTWARE ENGINEER</div>
              <h1 id="prototype-title">Beyond<br />the <em>interface.</em></h1>
              <p className={styles.heroStatement}>Thoughtful on the surface.<br />Resilient underneath.</p>
              <p className={styles.description}>I’m Nasir. I build mobile products, backend systems, and practical AI — with the same care for what people see and what makes it work.</p>
              <div className={styles.actions}><a className={styles.primaryLink} href="#selected-work">Explore my work <ArrowDown size={16} /></a><a href={`mailto:${PORTFOLIO_DATA.profile.email}`}>Let’s build something <ArrowUpRight size={15} /></a></div>
              <div className={styles.disciplines}>FLUTTER & DART<span>/</span>BACKEND SYSTEMS<span>/</span>APPLIED AI</div>
            </section>

            <ProductInstrument />

            <section id="architecture" className={styles.architectureCopy} aria-labelledby="architecture-title">
              <div className={styles.eyebrow}>01 / THE THINKING BENEATH</div>
              <h2 id="architecture-title">Good software<br /><em>goes deeper.</em></h2>
              <p className={styles.description}>A shop shouldn’t stop when its connection does. That requirement shapes every layer of NIZAAM.</p>
              <ol className={styles.layerNotes}>
                <li><span>01</span><div><strong>A focused interface</strong><p>Flutter and Riverpod bring the shop’s everyday work together.</p></div></li>
                <li><span>02</span><div><strong>Continuity, locally</strong><p>Drift persists local workflows; inventory mutations queue for synchronization and retry.</p></div></li>
                <li><span>03</span><div><strong>A deliberate data boundary</strong><p>PostgreSQL policies and business functions enforce tenant, branch, and staff access.</p></div></li>
              </ol>
            </section>
          </div>
        </section>

        <section id="nizaam" className={styles.projectIntroduction} aria-labelledby="nizaam-title">
          <div className={styles.projectOverline}><span>02 / SELECTED WORK</span><span>INDEPENDENT PRODUCT · DESIGN & ENGINEERING</span></div>
          <div className={styles.projectComposition}>
            <div><div className={styles.projectName}>NIZAAM<span lang="ur" dir="rtl">نظام</span></div><h2 id="nizaam-title">Built for the<br /><em>working day.</em></h2><p className={styles.projectDescription}>MobileShop SaaS for mobile retailers and repair shops. POS, IMEI inventory, repairs, procurement, customer credit, expenses, and accounts — connected across branches, staff permissions, and subscription access.</p><a className={styles.projectLink} href="#project-details">A few engineering decisions <ArrowDown size={16} /></a></div>
            <div className={styles.productIndex} aria-label="NIZAAM product scope">
              <span className={styles.indexLabel}>ONE WORKSPACE / CONNECTED OPERATIONS</span>
              <div><span>01</span><strong>Retail</strong><p>POS, IMEI inventory,<br />purchasing, and returns.</p></div>
              <div><span>02</span><strong>Workshop</strong><p>Repair tickets, parts,<br />payments, and delivery.</p></div>
              <div><span>03</span><strong>Finance</strong><p>Customer credit, expenses,<br />account ledgers, and reports.</p></div>
              <span className={styles.indexFootnote}>TENANTS · BRANCHES · ROLES · SUBSCRIPTIONS</span>
            </div>
          </div>
          <div className={styles.projectColophon}><span>FLUTTER · RIVERPOD · DRIFT · SUPABASE · POSTGRESQL</span><button onClick={() => { setAgentContext("nizaam"); setAgentOpen(true); }}>Ask about my work <Braces size={17} /></button></div>
        </section>

        <section id="project-details" className={styles.projectDetails} aria-labelledby="details-title">
          <div className={styles.detailsHeading}><span className={styles.eyebrow}>NIZAAM / ENGINEERING NOTES</span><h2 id="details-title">Small decisions.<br />Lasting consequences.</h2><p>The architecture is part of the product experience.</p></div>
          <dl className={styles.decisions}>
            <div><dt><span>01 / CONTINUITY</span>Persist, queue, then synchronize.</dt><dd>Drift stores eligible local workflows. Ordered inventory mutations synchronize with connectivity checks, retry backoff, and duplicate-request handling.</dd></div>
            <div><dt><span>02 / CONSISTENCY</span>Connect stock to the ledger.</dt><dd>Sales, repairs, procurement, expenses, and reversals link operational events to financial records. Backend policies and RPCs check tenant, branch, and staff access.</dd></div>
          </dl>
          <Link className={styles.projectLink} href="/work/nizaam">Explore all business workflows <ArrowUpRight size={16} /></Link>
        </section>
        {projects}
        {engineering}
        {professional}
      </main>
      <footer className={styles.endnote}><a href="#interface">Back to the beginning ↑</a><span>NASIR BHUTTA / FROM INTERFACE TO INFRASTRUCTURE</span><a href={`mailto:${PORTFOLIO_DATA.profile.email}`}>Let’s talk <ArrowUpRight size={15} /></a></footer>
      <AssistantDialog key={agentContext ?? "portfolio"} isOpen={agentOpen} onClose={() => setAgentOpen(false)} projectSlug={agentContext} />
    </div>
  );
}
