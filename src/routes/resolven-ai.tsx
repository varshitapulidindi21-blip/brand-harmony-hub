import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BotMessageSquare, Paperclip, Send, Home, MessageSquare,
  Search, MoreHorizontal, Edit3, Trash2, Pin, Share2, Menu, X,
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
        <div className="mx-auto flex h-14 sm:h-16 w-full max-w-[1400px] items-center gap-2 sm:gap-4 px-4 sm:px-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary"
            aria-label="Open chats"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <span
              className="text-lg sm:text-2xl md:text-[1.65rem] font-display italic tracking-tight"
              style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
            >
              <span className="text-primary dark:text-white">Resolven</span>{" "}
              <span className="text-accent">AI</span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <button
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary"
              aria-label="New chat"
            >
              <Edit3 className="h-4.5 w-4.5" />
            </button>
            <ThemeToggle />
            <Link to="/" className="ml-1 sm:ml-2 flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border bg-card px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium hover:border-primary/40">
              <Home className="h-4 w-4" /> <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] overflow-y-auto border-r border-border bg-background p-4 shadow-elev animate-rise">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold tracking-tight">Chats</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-secondary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarContent
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          </aside>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-[280px_1fr] gap-4 sm:gap-6 px-3 sm:px-6 py-3 sm:py-6">
        <aside className="hidden md:block space-y-4">
          <SidebarContent openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </aside>

        <section className="ai-panel animate-rise relative flex min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-140px)] flex-col overflow-hidden rounded-2xl sm:rounded-[1.6rem] p-4 sm:p-8 md:p-12">
          {/* Light-mode ambient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 dark:hidden"
            style={{
              background:
                "radial-gradient(720px 420px at 12% -5%, color-mix(in oklab, var(--brand-lavender) 95%, transparent), transparent 65%), radial-gradient(640px 380px at 88% 15%, color-mix(in oklab, var(--brand-purple) 38%, transparent), transparent 70%), radial-gradient(720px 420px at 50% 115%, color-mix(in oklab, var(--brand-green) 28%, transparent), transparent 70%), radial-gradient(420px 260px at 70% 60%, color-mix(in oklab, var(--brand-lavender) 55%, transparent), transparent 75%)",
            }}
          />
          {/* Dark-mode ambient */}
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

          <div className="relative m-auto flex flex-col items-center text-center px-2">
            <div
              className="relative flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-[1rem] sm:rounded-[1.4rem] text-white ring-1 ring-white/20"
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
              <BotMessageSquare className="h-7 w-7 sm:h-11 sm:w-11" strokeWidth={1.4} />
              <span className="absolute -bottom-1.5 -right-1.5 flex h-4.5 w-4.5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent text-[10px] sm:text-[11px] text-white shadow-soft">
                ✦
              </span>
            </div>
            <h1 className="mt-4 sm:mt-7 text-xl sm:text-3xl md:text-4xl">
              <span className="text-foreground">Hello,</span>{" "}
              <span className="text-accent">Samarth Sachdeva</span>
            </h1>
            <p className="mt-2 sm:mt-3 max-w-md text-[12px] sm:text-sm font-light text-muted-foreground px-2">
              I can search internal data, analyze documents, and browse the web for you.
            </p>

            {/* Mobile suggestion chips */}
            <div className="mt-5 grid w-full grid-cols-2 gap-2 sm:hidden">
              {["Summarize a document", "Find a policy", "Draft an email", "Search SharePoint"].map((s) => (
                <button
                  key={s}
                  className="rounded-xl border border-border/60 bg-background/60 px-3 py-2.5 text-left text-[12px] font-light text-foreground backdrop-blur-md hover:border-primary/40"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input — sticky bottom on mobile, inline on desktop */}
          <div className="relative mt-6 sm:mt-8 flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-2.5 sm:px-3 py-2 sm:py-2.5 shadow-elev backdrop-blur-2xl transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-glow">
            <button
              aria-label="Attach files"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-primary transition hover:bg-secondary"
            >
              <Paperclip className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.6} />
            </button>
            <input
              className="flex-1 bg-transparent px-1 text-[13px] sm:text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="Ask Resolven AI…"
            />
            <button
              aria-label="Send"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-white shadow-soft transition hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--brand-purple), var(--brand-green))" }}
            >
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function SidebarContent({
  openMenu,
  setOpenMenu,
}: {
  openMenu: number | null;
  setOpenMenu: (n: number | null) => void;
}) {
  return (
    <div className="space-y-4">
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
