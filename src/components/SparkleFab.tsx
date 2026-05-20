import { Link } from "@tanstack/react-router";
import { BotMessageSquare } from "lucide-react";

export function SparkleFab() {
  return (
    <Link
      to="/resolven-ai"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-glow transition-all duration-500 hover:scale-[1.06] hover:shadow-elev"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-green) 100%)",
      }}
      aria-label="Open Resolven AI"
    >
      <span
        className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-green) 100%)",
        }}
      />
      <BotMessageSquare
        className="relative h-6 w-6 transition-transform duration-500 group-hover:scale-110"
        strokeWidth={1.6}
      />
    </Link>
  );
}
