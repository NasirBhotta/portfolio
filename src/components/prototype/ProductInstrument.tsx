import { ArrowUpRight, Check, Command, Database, Layers3, Radio, ScanLine } from "lucide-react";
import styles from "./prototype.module.css";

/** Intentionally schematic. No invented metrics, product screenshots, or production UI claims. */
export function ProductInstrument() {
  return (
    <figure className={styles.instrument} aria-label="Illustrative product cross-section: Flutter interface, local persistence, and tenant-isolated cloud synchronization">
      <div className={styles.assembly}>
        <div className={`${styles.plane} ${styles.cloudPlane}`}>
          <div className={styles.layerHeader}><Radio size={15} /><span>03 / CLOUD & SYNC</span><span>PostgreSQL · RLS</span></div>
          <div className={styles.cloudBody}><strong>Each tenant, its own data.</strong></div>
        </div>
        <div className={`${styles.plane} ${styles.localPlane}`}>
          <div className={styles.layerHeader}><Database size={15} /><span>02 / LOCAL PERSISTENCE</span><span>Drift · SQLite</span></div>
          <div className={styles.localBody}><strong>Persist locally.<br />Synchronize deliberately.</strong><div className={styles.queue}><span>WRITE</span><i /><span>QUEUE</span><i /><span>SYNC</span></div></div>
        </div>
        <div className={`${styles.plane} ${styles.interfacePlane}`}>
          <div className={styles.appBar}><span className={styles.appLogo}><Command size={18} /> nizaam<span>®</span></span><span className={styles.demoBadge}>INTERFACE SCHEMATIC</span><span className={styles.appAvatar}>N</span></div>
          <div className={styles.appBody}>
            <aside className={styles.appSidebar}><Layers3 size={19} /><ScanLine size={19} /><Database size={19} /><Radio size={19} /><span>01</span></aside>
            <div className={styles.appContent}>
              <div className={styles.appEyebrow}>YOUR STORE, CONNECTED</div>
              <div className={styles.appTitle}>Less friction.<br /><span>More business.</span></div>
              <div className={styles.appToolbar}><span>Inventory workspace</span><ArrowUpRight size={17} /></div>
              <div className={styles.inventoryHeader}><span>DEVICE / SERIAL</span><span>STATUS</span></div>
              <div className={styles.inventoryRow}><span><i /> Device inventory<small>Individual IMEI tracking</small></span><span>TRACKED</span></div>
              <div className={styles.inventoryRow}><span><i /> Repair workflow<small>From intake to handover</small></span><span>IN PROGRESS</span></div>
              <div className={styles.inventoryRow}><span><i /> Credit ledger<small>A record of every balance</small></span><span>RECORDED</span></div>
              <div className={styles.appFooter}><span><Check size={12} /> Local-first workspace</span><span>FLUTTER / DART</span></div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className={styles.instrumentCaption}><span className={styles.captionLine} />Illustrative schematic · not a shipped product screenshot</figcaption>
    </figure>
  );
}
