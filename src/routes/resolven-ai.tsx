import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  BotMessageSquare, Paperclip, Send, Home, MessageSquare,
  Search, MoreHorizontal, Edit3, Trash2, Pin, Share2, Menu, X, Clock,
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

type PopupKind = "new" | "search" | "recents" | null;

function AIPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [popup, setPopup] = useState<PopupKind>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopup(null);
      }
    }
    if (popup) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [popup]);

  return (
    <div className="min-h-screen relative">
      {/* Ambient background — light mode (dreamy lavender/green) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 dark:hidden"
        style={{
          background:
            "radial-gradient(1200px 760px at 5% -8%, color-mix(in oklab, var(--brand-lavender) 95%, transparent), transparent 62%), radial-gradient(900px 620px at 95% 5%, color-mix(in oklab, var(--brand-purple) 60%, transparent), transparent 65%), radial-gradient(1100px 720px at 100% 100%, color-mix(in oklab, var(--brand-green-light) 80%, transparent), transparent 65%), radial-gradient(880px 600px at 12% 105%, color-mix(in oklab, var(--brand-green) 50%, transparent), transparent 65%), radial-gradient(900px 600px at 48% 55%, color-mix(in oklab, var(--brand-lavender) 70%, transparent), transparent 72%), linear-gradient(180deg, color-mix(in oklab, var(--brand-lavender) 35%, white) 0%, color-mix(in oklab, var(--brand-green-light) 25%, white) 100%)",
        }}
      />
      {/* Soft cloudy overlay for dreamy blending — light mode */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 dark:hidden opacity-70"
        style={{
          background:
            "radial-gradient(600px 380px at 70% 30%, color-mix(in oklab, white 70%, transparent), transparent 70%), radial-gradient(500px 320px at 25% 75%, color-mix(in oklab, white 60%, transparent), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* Ambient background — dark mode */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
        style={{
          background:
            "radial-gradient(1200px 800px at 30% 0%, color-mix(in oklab, var(--brand-purple) 22%, transparent), transparent 70%), radial-gradient(1000px 700px at 80% 100%, color-mix(in oklab, var(--brand-green) 12%, transparent), transparent 75%)",
        }}
      />

      <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/45">
        <div className="mx-auto flex h-14 sm:h-16 w-full max-w-[1400px] items-center px-2 sm:px-4">
          {/* Mobile-only hamburger in header */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open menu"
            className="md:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-foreground/80 transition-all duration-200 hover:bg-secondary/70 active:scale-95"
          >
            <Menu className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.85} />
          </button>
          <Link to="/" className="ml-2 md:ml-1 flex items-center">
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
            sidebarExpanded ? "w-[260px]" : "w-[64px]"
          }`}
        >
          {/* Hamburger at top of sidebar */}
          <div className={`flex h-12 items-center ${sidebarExpanded ? "px-2 justify-end" : "justify-center"}`}>
            <RailIconButton
              label={sidebarExpanded ? "Collapse" : "Expand"}
              onClick={() => { setSidebarExpanded((v) => !v); setPopup(null); }}
              hideTooltip={sidebarExpanded}
            >
              <Menu className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.85} />
            </RailIconButton>
          </div>

          <DesktopSidebar
            expanded={sidebarExpanded}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            popup={popup}
            setPopup={setPopup}
            popupRef={popupRef}
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
              <ExpandedList openMenu={openMenu} setOpenMenu={setOpenMenu} />
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
                className="mt-6 sm:mt-8 text-[2rem] sm:text-[2.6rem] md:text-[3rem] tracking-tight leading-[1.05]"
                style={{ fontFamily: "Montserrat, system-ui, sans-serif", fontWeight: 700, fontStyle: "italic" }}
              >
                <span className="text-primary dark:text-white">Hi,</span>{" "}
                <span className="text-accent">Samarth</span>
              </h1>
              <p
                className="mt-4 text-base sm:text-lg font-light text-muted-foreground"
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

function RailIconButton({
  label, onClick, children, hideTooltip,
}: { label: string; onClick?: () => void; children: React.ReactNode; hideTooltip?: boolean }) {
  return (
    <div className="group/rail relative">
      <button
        onClick={onClick}
        aria-label={label}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground/80 transition-all duration-200 hover:bg-secondary/70 hover:text-foreground active:scale-95"
      >
        {children}
      </button>
      {!hideTooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-border/60 bg-popover/95 px-2.5 py-1 text-[11px] font-medium text-popover-foreground opacity-0 shadow-elev backdrop-blur transition-all duration-200 group-hover/rail:translate-x-0 group-hover/rail:opacity-100"
        >
          {label}
        </span>
      )}
    </div>
  );
}

function DesktopSidebar({
  expanded, openMenu, setOpenMenu, popup, setPopup, popupRef,
}: {
  expanded: boolean;
  openMenu: number | null;
  setOpenMenu: (v: number | null) => void;
  popup: PopupKind;
  setPopup: (p: PopupKind) => void;
  popupRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  if (expanded) {
    return <ExpandedList openMenu={openMenu} setOpenMenu={setOpenMenu} />;
  }
  return (
    <div className="relative flex flex-col items-center gap-1 py-2">
      <RailIconButton label="New chat" onClick={() => setPopup(popup === "new" ? null : "new")}>
        <Edit3 className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} />
      </RailIconButton>
      <RailIconButton label="Search chats" onClick={() => setPopup(popup === "search" ? null : "search")}>
        <Search className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} />
      </RailIconButton>
      <RailIconButton label="Recents" onClick={() => setPopup(popup === "recents" ? null : "recents")}>
        <Clock className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} />
      </RailIconButton>

      {popup && (
        <div
          ref={popupRef}
          className="absolute left-full top-2 z-40 ml-3 w-72 rounded-2xl border border-border/60 bg-popover/85 p-3 shadow-elev backdrop-blur-2xl animate-in fade-in slide-in-from-left-2 duration-200"
        >
          {popup === "new" && (
            <div>
              <div className="px-2 pb-2 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">New chat</div>
              <button
                onClick={() => setPopup(null)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary/70"
              >
                <Edit3 className="h-4 w-4" /> Start a new conversation
              </button>
            </div>
          )}
          {popup === "search" && (
            <div>
              <div className="px-2 pb-2 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">Search</div>
              <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/70 px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  autoFocus
                  placeholder="Search chats…"
                  className="flex-1 bg-transparent text-sm font-light placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
          )}
          {popup === "recents" && (
            <div>
              <div className="px-2 pb-2 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">Recents</div>
              <ul className="space-y-0.5">
                {conversations.map((c, i) => (
                  <li key={i}>
                    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-light text-foreground hover:bg-secondary/70">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{c.title}</span>
                      <span className="ml-auto text-[11px] text-muted-foreground">{c.time}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ExpandedList({
  openMenu, setOpenMenu,
}: {
  openMenu: number | null;
  setOpenMenu: (v: number | null) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-4">
      <ul className="space-y-0.5">
        <ExpandedItem icon={Edit3} label="New chat" />
        <ExpandedItem icon={Search} label="Search chats" />
      </ul>
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
    </div>
  );
}

function ExpandedItem({
  icon: Icon, label,
}: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <li>
      <button className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-secondary/70">
        <Icon className="h-[1.05rem] w-[1.05rem] text-muted-foreground transition-colors group-hover:text-foreground" />
        <span>{label}</span>
      </button>
    </li>
  );
}

function MenuItem({
  icon: Icon, label, danger,
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
