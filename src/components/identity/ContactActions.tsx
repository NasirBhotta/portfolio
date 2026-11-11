"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { AssistantDialog } from "@/components/assistant/AssistantDialog";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import styles from "./identity.module.css";

export function ContactAssistant() {
  const [open, setOpen] = useState(false);
  return <><button className={styles.contactAssistant} onClick={() => setOpen(true)}><span>03 / EXPLORE FIRST</span><strong>Ask my representative<ArrowUpRight size={22} /></strong><small>Questions about the work, projects, and engineering.</small></button><AssistantDialog isOpen={open} onClose={() => setOpen(false)} /></>;
}

export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try { await navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email); setStatus("copied"); }
    catch { setStatus("failed"); }
  }
  return <div className={styles.copyControl}><button onClick={() => void copy()} aria-label="Copy email address">{status === "copied" ? <Check size={15} /> : <Copy size={15} />}{status === "copied" ? "Copied" : "Copy email"}</button><span role="status">{status === "failed" ? "Copy unavailable. Select the email address or open the email link." : status === "copied" ? "Email address copied to clipboard." : ""}</span></div>;
}
