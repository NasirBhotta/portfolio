import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { CERTIFICATE_DOCUMENTS } from "@/data/certificates";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import styles from "./identity.module.css";

export function CertificatesAndChannel() {
  return <>
    <section id="certificates" className={styles.certificateSection} aria-labelledby="certificates-title">
      <header className={styles.splitHeading}><div><span className={styles.eyebrow}>COURSES & TECHNICAL CREDENTIALS</span><h2 id="certificates-title">The learning.<br /><em>The certificates.</em></h2></div><p>AI agents, Flutter development, and software engineering. View the original certificates or download a copy.</p></header>
      <div className={styles.certificateGrid}>{CERTIFICATE_DOCUMENTS.map((certificate) => <article key={certificate.id} className={styles.certificateCard}>
        <a href={certificate.href} target="_blank" rel="noopener noreferrer" className={styles.certificatePreview} aria-label={`View ${certificate.title} certificate`}><Image src={certificate.preview} alt={`${certificate.title} certificate awarded to Nasir`} width={1200} height={850} sizes="(max-width: 800px) 88vw, 42vw" /></a>
        <div className={styles.certificateMeta}><span>{certificate.issuer}</span><span>{certificate.date}</span></div><h3>{certificate.title}</h3><p>{certificate.kind}</p>
        <div className={styles.certificateActions}><a href={certificate.href} target="_blank" rel="noopener noreferrer">View certificate<ArrowUpRight size={15} /></a><a href={certificate.href} download>Download PDF<Download size={15} /></a></div>
      </article>)}</div>
    </section>
    <section id="channel" className={styles.channelSection} aria-labelledby="channel-title">
      <div><span className={styles.eyebrow}>MY INSTAGRAM TECH CHANNEL</span><h2 id="channel-title">Vibecode<br /><em>Unpacked.</em></h2><p>I share software engineering, AI, and development content on my Instagram channel. Follow along beyond the finished projects.</p><a className={styles.channelLink} href={PORTFOLIO_DATA.profile.instagram} target="_blank" rel="noopener noreferrer">Explore my channel<ArrowUpRight size={20} /></a></div>
      <a className={styles.channelCard} href={PORTFOLIO_DATA.profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit Vibecode Unpacked on Instagram"><span>INSTAGRAM / TECH CONTENT</span><strong>@vibecode_<br />unpacked</strong><p>Software engineering<br />AI & development</p><span>Visit the channel <ArrowUpRight size={20} /></span></a>
    </section>
  </>;
}
