import { getAssistantProvider } from "@/lib/assistant/server-provider";
import { ASSISTANT_CONTEXTS } from "@/lib/assistant/knowledge";
import { isAssistantRequest } from "@/lib/assistant/types";

export const maxDuration = 30;

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "JSON required" }, { status: 415, headers });
  if (Number(request.headers.get("content-length")) > 24000) return Response.json({ error: "Request too large" }, { status: 413, headers });
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 24000) return Response.json({ error: "Request too large" }, { status: 413, headers });
    input = JSON.parse(body);
  } catch { return Response.json({ error: "Invalid JSON" }, { status: 400, headers }); }
  if (!isAssistantRequest(input) || (input.projectSlug && !ASSISTANT_CONTEXTS.some((context) => context.slug === input.projectSlug))) return Response.json({ error: "Invalid assistant request" }, { status: 400, headers });
  try {
    return Response.json(await getAssistantProvider().respond(input, request.signal), { headers });
  } catch { return Response.json({ error: "Assistant unavailable; use the local guide" }, { status: 503, headers }); }
}
