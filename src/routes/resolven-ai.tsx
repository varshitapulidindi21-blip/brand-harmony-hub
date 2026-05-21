import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus, BotMessageSquare, Paperclip, Send, Home, MessageSquare,
  Search, MoreHorizontal, Edit3, Trash2, Pin, Share2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/resolven-ai")({
  head: () => ({
    meta: [
      { title: "Resolven AI — Resolven Hub" },
      { name: "description", content: "Search internal data, analyze documents, and browse the web." },
    ],
  }),
  component: AIPage,
});

const conversations = [
  { title: "hello", time: "1d ago" },
  { title: "hello", time: "1d ago" },
];

function AIPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-6">
          <Link to="/" className="flex items-center gap-3">
            <span
              className="text-2xl md:text-[1.65rem] font-display italic tracking-tight"
              style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
            >
              <span className="text-primary dark:text-white">Resolven</span>{" "}
              <span className="text-accent">AI</span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <Link to="/" className="ml-2 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary/40">
              <Home className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-[280px_1fr] gap-6 px-6 py-6">
        <aside className="space-y-4">
          {/* ChatGPT-style action rows */}
          <ul className="space-y-1">
            <li>
              <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                <Edit3 className="h-4 w-4 text-muted-foreground" /> New chat
              </button>
            </li>
            <li>
              <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                <Search className="h-4 w-4 text-muted-foreground" /> Search chats
              </button>
            </li>
          </ul>

          <div>
            <div className="mb-2 px-3 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Conversations
            </div>
            <ul className="space-y-0.5">
              {conversations.map((c, i) => (
                <li
                  key={i}
                  className="group relative flex items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary"
                >
                  <button className="flex flex-1 items-center gap-2 truncate text-left text-sm font-light text-foreground">
                    <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{c.title}</span>
                  </button>
                  <span className="ml-2 text-[11px] font-light text-muted-foreground transition-opacity group-hover:opacity-0">
                    {c.time}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === i ? null : i);
                    }}
                    aria-label="Chat options"
                    className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-foreground group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {openMenu === i && (
                    <div
                      className="absolute right-2 top-9 z-20 w-40 overflow-hidden rounded-lg border border-border bg-popover shadow-elev"
                      onMouseLeave={() => setOpenMenu(null)}
                    >
                      <MenuItem icon={Edit3} label="Rename" />
                      <MenuItem icon={Pin} label="Pin" />
                      <MenuItem icon={Share2} label="Share" />
                      <MenuItem icon={Trash2} label="Delete" danger />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="ai-panel animate-rise relative flex min-h-[calc(100vh-140px)] flex-col overflow-hidden rounded-[1.6rem] p-8 md:p-12">
          {/* Light-mode ambient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 dark:hidden"
            style={{
              background:
                "radial-gradient(720px 420px at 12% -5%, color-mix(in oklab, var(--brand-lavender) 95%, transparent), transparent 65%), radial-gradient(640px 380px at 88% 15%, color-mix(in oklab, var(--brand-purple) 38%, transparent), transparent 70%), radial-gradient(720px 420px at 50% 115%, color-mix(in oklab, var(--brand-green) 28%, transparent), transparent 70%), radial-gradient(420px 260px at 70% 60%, color-mix(in oklab, var(--brand-lavender) 55%, transparent), transparent 75%)",
            }}
          />
          {/* Dark-mode ambient — softer, more diffused, single cohesive wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 hidden dark:block"
            style={{
              background:
                "radial-gradient(1200px 800px at 30% 0%, color-mix(in oklab, var(--brand-purple) 22%, transparent), transparent 70%), radial-gradient(1000px 700px at 80% 100%, color-mix(in oklab, var(--brand-green) 10%, transparent), transparent 75%)",
              filter: "blur(8px)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 opacity-60"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, white 10%, transparent), transparent 35%, transparent 70%, color-mix(in oklab, var(--brand-purple) 8%, transparent))",
            }}
          />

          <div className="relative m-auto flex flex-col items-center text-center">
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-[1.4rem] text-white ring-1 ring-white/20"
              style={{
                background:
                  "linear-gradient(140deg, var(--brand-purple) 0%, var(--brand-purple-deep) 55%, var(--brand-green) 130%)",
                boxShadow:
                  "0 1px 0 oklch(1 0 0 / 0.25) inset, 0 18px 50px -18px oklch(0.378 0.180 295 / 0.55), 0 8px 30px -10px oklch(0.682 0.180 148 / 0.30)",
              }}
            >
              <span
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-[1.8rem] opacity-70 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-purple), var(--brand-green))",
                }}
              />
              <BotMessageSquare className="h-11 w-11" strokeWidth={1.4} />
              <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] text-white shadow-soft">
                ✦
              </span>
            </div>
            <h1 className="mt-7 text-3xl md:text-4xl">
              <span className="text-foreground">Hello,</span>{" "}
              <span className="text-accent">Samarth Sachdeva</span>
            </h1>
            <p className="mt-3 max-w-md text-sm font-light text-muted-foreground">
              I can search internal data, analyze documents, and browse the web for you.
            </p>
          </div>

          <div className="relative mt-8 flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2.5 shadow-elev backdrop-blur-2xl transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-glow">
            <button
              aria-label="Attach files"
              className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition hover:bg-secondary"
            >
              <Paperclip className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <input
              className="flex-1 bg-transparent px-1 text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="Ask Resolven AI anything…"
            />
            <button
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-soft transition hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--brand-purple), var(--brand-green))" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  danger,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-secondary ${
        danger ? "text-destructive" : "text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
