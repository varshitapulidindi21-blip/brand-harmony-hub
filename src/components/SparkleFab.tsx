import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BotMessageSquare, X, Minus, Maximize2, Paperclip, Send } from "lucide-react";

export function SparkleFab() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
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
        </button>
      )}

      {open && minimized && (
        <button
          onClick={() => setMinimized(false)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-elev transition hover:scale-[1.03]"
        >
          <BotMessageSquare className="h-4 w-4" />
          Resolven AI
        </button>
      )}

      {open && !minimized && (
        <div className="animate-rise fixed inset-x-3 bottom-3 z-40 flex h-[min(80vh,520px)] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-elev backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[520px] sm:w-[360px]">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-purple-deep) 60%, var(--brand-green) 130%)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
                <BotMessageSquare className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <span className="text-sm font-medium tracking-tight">Resolven AI</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Link
                to="/resolven-ai"
                aria-label="Expand"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/85 transition hover:bg-white/15 hover:text-white"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={() => setMinimized(true)}
                aria-label="Minimize"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/85 transition hover:bg-white/15 hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/85 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="rounded-2xl bg-secondary/60 px-4 py-3 text-sm font-light text-foreground">
              Hi Samarth — how can I help you today? Ask about modules, documents, or workflows.
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border/60 p-3">
            <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2 py-1.5 shadow-soft focus-within:border-primary/40">
              <button
                aria-label="Attach files"
                className="flex h-8 w-8 items-center justify-center rounded-full text-primary transition hover:bg-secondary"
              >
                <Paperclip className="h-4 w-4" strokeWidth={1.6} />
              </button>
              <input
                className="flex-1 bg-transparent px-1 text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
                placeholder="Ask Resolven AI…"
              />
              <button
                aria-label="Send"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-purple), var(--brand-green))",
                }}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
