"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AssistantDialog } from "@/components/assistant/AssistantDialog";
import styles from "./ai.module.css";

export function RepresentativeInvitation() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  function start(value = "") { setQuestion(value); setOpen(true); }
  return (
    <section className={styles.invitation} aria-labelledby="representative-invitation-title">
      <div><span className={styles.eyebrow}>A CONVERSATION ABOUT THE WORK</span><h3 id="representative-invitation-title">Ask a little<br /><em>more directly.</em></h3><p>A portfolio guide for questions about my projects, contribution, and engineering choices.</p><button className={styles.openAssistant} onClick={() => start()}>Meet my representative<ArrowUpRight size={18} /></button><small>Hosted AI assistant with a local portfolio guide as fallback.</small></div>
      <div className={styles.invitationQuestions}><span>A FEW PLACES TO START</span>{["What did Nasir contribute to BrainBee?", "Explain NIZAAM’s offline architecture", "What is documented about CVFlow?"].map((item) => <button key={item} onClick={() => start(item)}>{item}<ArrowUpRight size={17} /></button>)}<p>Conversation history stays in this tab’s session. The guide says when a detail isn’t documented.</p></div>
      <noscript><p>The conversation interface needs JavaScript. You can also <a href="mailto:dev.nasirbhutta@gmail.com">email Nasir directly ↗</a>.</p></noscript>
      <AssistantDialog key={question} isOpen={open} onClose={() => setOpen(false)} initialQuestion={question} />
    </section>
  );
}
