"use client";

import { useEffect, useRef } from "react";

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "saadapex/aes-website");
    script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "");
    script.setAttribute("data-category", "Blog Comments");
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  return (
    <div className="mt-12 pt-10 border-t border-gray-100">
      <h2 className="text-[#06284C] text-xl font-bold mb-6">Comments</h2>
      <div ref={ref} />
      <p className="text-xs text-[#4E6575] mt-4">
        Comments powered by{" "}
        <a href="https://giscus.app" target="_blank" rel="noopener noreferrer"
          className="text-[#006FB9] hover:underline">
          Giscus
        </a>{" "}
        — sign in with GitHub to comment.
      </p>
    </div>
  );
}
