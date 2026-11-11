import Image from "next/image";
import type { ProjectStudy } from "@/data/projectShowcase";
import styles from "./projects.module.css";

export function ProjectVisual({ project, compact = false }: { project: ProjectStudy; compact?: boolean }) {
  return (
    <figure className={styles.visual} data-compact={compact || undefined}>
      {project.video ? (
        <video className={styles.projectVideo} controls playsInline muted preload="none" poster={project.video.poster} aria-label={project.video.label}>
          <source src={project.video.src} type="video/mp4" />
          Your browser does not support video playback. <a href={project.video.src}>Download the demo</a>.
        </video>
      ) : project.screenshot ? (
        <div className={styles.imageFrame}><Image src={project.screenshot.src} alt={project.screenshot.alt} width={project.screenshot.width} height={project.screenshot.height} sizes="(max-width: 800px) 88vw, 70vw" className={styles.productImage} /></div>
      ) : (
        <div className={styles.art} data-project={project.slug} role="img" aria-label={`Editorial illustration for ${project.name}: ${project.visual.steps.join(" to ")}. Not a product screenshot.`}>
          <div className={styles.artTop}><span>{project.name}</span><span>ENGINEERING STUDY</span></div>
          <div className={styles.artWords}><span>{project.visual.first}</span><em>{project.visual.second}</em></div>
          <div className={styles.artRule}><span>{project.visual.index}</span><span aria-hidden="true">↘</span></div>
          <ol className={styles.artSteps}>{project.visual.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
        </div>
      )}
      <figcaption>{project.video ? "Product demo · Mapbox 3D navigation · silent preview" : project.screenshot ? "Product screenshot" : "Editorial illustration · product screenshots not supplied"}</figcaption>
    </figure>
  );
}
