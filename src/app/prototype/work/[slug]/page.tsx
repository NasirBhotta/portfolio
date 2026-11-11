import { permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import { PROJECT_STUDIES } from "@/data/projectShowcase";

export function generateStaticParams() {
  return PROJECT_STUDIES.map(({ slug }) => ({ slug }));
}

export default function PreviousProjectPage(props: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={<p>Opening project…</p>}><RedirectProject {...props} /></Suspense>;
}

async function RedirectProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return permanentRedirect(`/work/${encodeURIComponent(slug)}`);
}
