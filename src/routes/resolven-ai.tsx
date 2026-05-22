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
  { title: "Quarterly report draft", time: "1d" },
  { title: "Vendor onboarding flow", time: "3d" },
];

function AIPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Ambient background — light mode */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 dark:hidden"
        style={{
          background:
            "radial-gradient(900px 560px at 12% -5%, color-mix(in oklab, var(--brand-lavender) 95%, transparent), transparent 60%), radial-gradient(720px 480px at 88% 15%, color-mix(in oklab, var(--brand-purple) 38%, transparent), transparent 65%), radial-gradient(900px 520px at 50% 115%, color-mix(in oklab, var(--brand-green) 32%, transparent), transparent 65%)",
        }}
      />
      {/* Ambient background — dark mode */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
        style={{
          background:
            "radial-gradient(1200px 800px at 30% 0%, color-mix(in oklab, var(--brand-purple) 20%, transparent), transparent 70%), radial-gradient(1000px 700px at 80% 100%, color-mix(in oklab, var(--brand-green) 10%, transparent), transparent 75%)",
        }}
      />

      <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
        <div className="mx-auto flex h-14 sm:h-16 w-full max-w-[1400px] items-center px-2 sm:px-4">
          {/* Hamburger — aligned with sidebar icon column on desktop */}
          <button
            onClick={() => {
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                setMobileSidebarOpen(true);
              } else {
                setSidebarExpanded((v) => !v);
              }
            }}
            aria-label="Toggle sidebar"
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-foreground/80 transition-all duration-200 hover:bg-secondary/70 hover:text-foreground hover:scale-[1.04] active:scale-95"
          >
            <Menu className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.85} />
          </button>
          <Link to="/" className="ml-3 sm:ml-5 flex items-center">
            <span
              className="text-lg sm:text-2xl md:text-[1.65rem] font-display italic tracking-tight"
              style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
            >
              <span className="text-primary dark:text-white">Resolven</span>{" "}
              <span className="text-accent">AI</span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <Link
              to="/"
              aria-label="Home"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl text-foreground/80 transition-all duration-200 hover:bg-secondary/70 hover:text-foreground hover:scale-[1.04]"
            >
              <Home className="h-[1.05rem] w-[1.05rem]" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px]">
        {/* Desktop collapsible sidebar */}
        <aside
          className={`relative hidden md:flex shrink-0 flex-col border-r border-border/50 transition-[width] duration-300 ease-out ${
            sidebarExpanded ? "w-[260px]" : "w-[60px]"
          }`}
        >
          <SidebarContent
            expanded={sidebarExpanded}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-in fade-in"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-[320px] flex-col border-r border-border/60 bg-background/95 backdrop-blur-xl shadow-elev md:hidden animate-in slide-in-from-left duration-300">
              <div className="flex h-14 items-center justify-end px-3 border-b border-border/40">
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground/70 hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SidebarContent
                expanded={true}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            </aside>
          </>
        )}

        {/* Main chat area */}
        <section className="relative flex min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex-1 flex-col">
          {/* Greeting */}
          <div className="flex flex-1 items-center justify-center px-5 sm:px-10 md:px-16 pt-8 sm:pt-10 pb-32 sm:pb-10">
            <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
              <div
                className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-[1.2rem] text-white ring-1 ring-white/20"
                style={{
                  background:
                    "linear-gradient(140deg, var(--brand-purple) 0%, var(--brand-purple-deep) 55%, var(--brand-green) 130%)",
                  boxShadow:
                    "0 1px 0 oklch(1 0 0 / 0.25) inset, 0 18px 50px -18px oklch(0.378 0.180 295 / 0.55), 0 8px 30px -10px oklch(0.682 0.180 148 / 0.30)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute -inset-3 -z-10 rounded-[1.8rem] opacity-60 blur-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-purple), var(--brand-green))",
                  }}
                />
                <BotMessageSquare className="h-7 w-7 sm:h-9 sm:w-9" strokeWidth={1.4} />
                {/* Green sparkle accent */}
                <span
                  aria-hidden
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center"
                >
                  <span
                    className="absolute inset-0 rounded-full blur-[6px] opacity-80"
                    style={{ background: "var(--brand-green)" }}
                  />
                  <span
                    className="relative h-2.5 w-2.5 rounded-full ring-2 ring-background"
                    style={{ background: "var(--brand-green)" }}
                  />
                </span>
              </div>
              <h1
                className="mt-6 sm:mt-8 text-[2rem] sm:text-[2.6rem] md:text-[3rem] tracking-tight leading-[1.1]"
                style={{ fontFamily: "Montserrat, system-ui, sans-serif", fontWeight: 700, fontStyle: "normal" }}
              >
                <span className="text-primary dark:text-white">Hi,</span>{" "}
                <span className="text-accent">Samarth</span>
              </h1>
              <p
                className="mt-3 text-base sm:text-lg font-light text-muted-foreground"
                style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
              >
                How can I help you today?
              </p>
              <p className="mt-1 text-sm font-light text-muted-foreground/80">
                Ask anything, or pick up where you left off.
              </p>

              {/* Desktop input bar — inline */}
              <div className="hidden sm:flex relative mt-8 w-full items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2.5 shadow-elev backdrop-blur-2xl transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-glow">
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
            </div>
          </div>

          {/* Mobile input bar — sticky at bottom */}
          <div className="sm:hidden fixed inset-x-0 bottom-0 z-20 border-t border-border/50 bg-background/85 backdrop-blur-xl px-3 pt-2.5 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
            <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 px-2 py-1.5 shadow-elev focus-within:border-primary/40">
              <button
                aria-label="Attach files"
                className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition active:scale-95"
              >
                <Paperclip className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
              </button>
              <input
                className="flex-1 bg-transparent px-1 text-[0.95rem] font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
                placeholder="Ask Resolven AI…"
              />
              <button
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--brand-purple), var(--brand-green))" }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SidebarContent({
  expanded,
  openMenu,
  setOpenMenu,
}: {
  expanded: boolean;
  openMenu: number | null;
  setOpenMenu: (v: number | null) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-4">
      <ul className="space-y-0.5">
        <SidebarItem icon={Edit3} label="New chat" expanded={expanded} />
        <SidebarItem icon={Search} label="Search chats" expanded={expanded} />
      </ul>

      {expanded && (
        <div>
          <div className="mb-2 px-3 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
            Conversations
          </div>
          <ul className="space-y-0.5">
            {conversations.map((c, i) => (
              <li
                key={i}
                className="group relative flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-secondary/70"
              >
                <button className="flex flex-1 items-center gap-2 truncate text-left text-sm font-light text-foreground">
                  <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
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
      )}
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  expanded,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  expanded: boolean;
}) {
  return (
    <li>
      <button
        title={!expanded ? label : undefined}
        className={`group relative flex w-full items-center gap-2.5 rounded-lg py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-secondary/70 hover:text-foreground ${
          expanded ? "px-3" : "px-0 justify-center h-10"
        }`}
      >
        <span className={`flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${expanded ? "" : "h-10 w-10"}`}>
          <Icon className="h-[1.05rem] w-[1.05rem] text-muted-foreground transition-colors group-hover:text-foreground" />
        </span>
        {expanded && <span>{label}</span>}
      </button>
    </li>
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
