"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function FormErrorBanner({ message = "Something went wrong — please try again or email us directly." }: { message?: string }) {
  const params = useSearchParams();
  if (params.get("error") !== "1") return null;

  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-5 py-4 text-sm mb-6">
      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
}
