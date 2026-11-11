"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./ai.module.css";

const examples = [
  { question: "How does BrainBee find relevant study material?", source: "BrainBee uses textbook embeddings, FAISS semantic retrieval, and retrieval-augmented learning features. It was co-developed as a COMSATS undergraduate capstone.", href: "/work/brainbee", label: "BrainBee case study", answer: "BrainBee combines textbook embeddings with a FAISS index to retrieve material relevant to a learning question. This is a prepared summary of the supplied passage, not model-generated text." },
  { question: "Can NIZAAM keep working without a connection?", source: "NIZAAM uses Drift / SQLite offline queues with a Flutter / Riverpod client and a Supabase / PostgreSQL backend. It is an independent retail-management product.", href: "/work/nizaam", label: "NIZAAM case study", answer: "NIZAAM persists work locally using Drift / SQLite queues and synchronizes with its backend. This prepared answer is limited to the supplied portfolio context." },
  { question: "Which LLM provider does CVFlow use?", source: "CVFlow is described as AI-enabled CV processing and automation. Its model provider and implementation are not documented in this portfolio.", href: "/#ai-engineering", label: "AI project documentation", answer: "There is not enough documented context to identify CVFlow’s model provider. A grounded system should state that limit rather than invent an answer." },
];
const steps = ["Question", "Retrieval", "Context", "LLM boundary", "Answer"];

export function RetrievalWalkthrough() {
  const [example, setExample] = useState(0);
  const [step, setStep] = useState(0);
  const current = examples[example];
  const descriptions = [
    { title: "Start with a real question.", body: "The question defines the information needed. Choose an example to follow its evidence through the same workflow." },
    { title: "Find the relevant evidence.", body: "This demonstration selects a curated portfolio passage locally. In a deployed semantic pipeline, an embedding model encodes the question and a vector index returns candidate passages. No embeddings or vector search run in this demo." },
    { title: "Make the context inspectable.", body: "Keep the retrieved passage and its source alongside the question. Relevant context constrains the answer; it does not guarantee correctness." },
    { title: "A model is an integration boundary.", body: "A real service would send the question and selected context to an LLM with instructions to stay within that evidence. No LLM is connected here, and this step makes no network request." },
    { title: "Answer, or acknowledge the gap.", body: "These are prepared example answers. The final example deliberately withholds an undocumented detail. Source attribution and uncertainty matter as much as a fluent response." },
  ];

  return (
    <div className={styles.workflow}>
      <div className={styles.workflowHeading}><span>ONE QUESTION / A TRACEABLE PATH</span><span>LOCAL, ILLUSTRATIVE WALKTHROUGH</span></div>
      <label className={styles.questionLabel} htmlFor="rag-example">Follow a question</label>
      <select id="rag-example" className={styles.questionSelect} value={example} onChange={(event) => { setExample(Number(event.target.value)); setStep(0); }}>{examples.map((item, index) => <option value={index} key={item.question}>{item.question}</option>)}</select>
      <nav className={styles.workflowSteps} aria-label="RAG workflow stages">{steps.map((label, index) => <button key={label} onClick={() => setStep(index)} aria-pressed={step === index} aria-controls="rag-stage-content"><span>0{index + 1}</span>{label}{index !== steps.length - 1 && <ArrowRight size={14} aria-hidden="true" />}</button>)}</nav>
      <div id="rag-stage-content" className={styles.workflowContent} aria-live="polite" aria-atomic="true">
        <div><span className={styles.eyebrow}>0{step + 1} / {steps[step].toUpperCase()}</span><h3>{descriptions[step].title}</h3><p>{descriptions[step].body}</p></div>
        <div className={styles.evidence}><span>{step === 4 ? "PREPARED EXAMPLE ANSWER" : step === 0 ? "THE QUESTION" : step === 3 ? "WOULD BE SENT TO A MODEL" : "CURATED SOURCE PASSAGE"}</span><blockquote>{step === 0 ? current.question : step === 4 ? current.answer : current.source}</blockquote>{step > 0 && <a href={current.href}>{current.label}<ArrowUpRight size={13} /></a>}</div>
      </div>
      <div className={styles.workflowFooter}><p>Illustrative flow. No live retrieval, embeddings, or generation.</p><div><button onClick={() => setStep(step - 1)} disabled={step === 0} aria-label="Previous workflow stage"><ArrowLeft size={16} /></button><span>{step + 1} / {steps.length}</span><button onClick={() => setStep(step + 1)} disabled={step === steps.length - 1} aria-label="Next workflow stage"><ArrowRight size={16} /></button></div></div>
    </div>
  );
}
