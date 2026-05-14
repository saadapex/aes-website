/**
 * Studio redirect — manage content at sanity.io/manage
 * or run `npx sanity dev` locally on port 3333
 */
import { redirect } from "next/navigation";

export default function StudioPage() {
  redirect("https://sanity.io/manage");
}
