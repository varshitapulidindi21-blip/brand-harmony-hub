import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SparkleFab() {
  return (
    <Link
      to="/resolven-ai"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform hover:scale-105"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-green) 100%)",
      }}
      aria-label="Open Resolven AI"
    >
      <Sparkles className="h-6 w-6" />
    </Link>
  );
}
