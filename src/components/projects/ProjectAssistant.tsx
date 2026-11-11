"use client";

import { useState } from "react";
import { Braces } from "lucide-react";
import { AssistantDialog } from "@/components/assistant/AssistantDialog";
import styles from "./projects.module.css";

export function ProjectAssistant({ projectSlug }: { projectSlug?: string }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" className={styles.assistantButton} onClick={() => setOpen(true)}>Ask my assistant <Braces size={16} /></button><AssistantDialog isOpen={open} onClose={() => setOpen(false)} projectSlug={projectSlug} /></>;
}
