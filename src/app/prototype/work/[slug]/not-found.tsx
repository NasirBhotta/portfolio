import Link from "next/link";
import styles from "@/components/projects/projects.module.css";

export default function ProjectNotFound() {
  return <main className={styles.notFound}><span className={styles.eyebrow}>PROJECT NOT FOUND</span><h1>Another way<br /><em>into the work.</em></h1><p>This project isn’t in the selected collection.</p><Link className={styles.readLink} href="/#selected-work">Return to selected projects ↗</Link></main>;
}
