import { permanentRedirect } from "next/navigation";

/** The selected design is now the main portfolio. Keep existing bookmarks working. */
export default function PreviousPrototypePage() {
  permanentRedirect("/");
}
