import "server-only";
import { open } from "node:fs/promises";
import path from "node:path";

export interface ResumeAsset { href: string; filename: string }

/** Resolve only the explicitly named local asset; never use the legacy contact anchor. */
export async function getResumeAsset(): Promise<ResumeAsset | null> {
  "use cache";
  const filename = "nasir-bhutta-resume.pdf";
  const resumePath = path.join(process.cwd(), "public", "resume", filename);
  try {
    const file = await open(resumePath, "r");
    try {
      const header = Buffer.alloc(5);
      await file.read(header, 0, 5, 0);
      const stat = await file.stat();
      if (!stat.isFile() || stat.size <= 5 || header.toString("ascii") !== "%PDF-") return null;
      return { href: `/resume/${filename}`, filename };
    } finally { await file.close(); }
  } catch { return null; }
}
