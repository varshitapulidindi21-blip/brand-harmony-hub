import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, BotMessageSquare, Paperclip, Send, Home, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/resolven-logo.png";
import logoWhite from "@/assets/resolven-logo-white.png";

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
  return (
    <div className="min-h-screen">
      {/* Slim top bar specific to AI page */}
      <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Resolven" className="logo-light h-12 w-auto" />
            <img src={logoWhite} alt="Resolven" className="logo-dark h-12 w-auto" />
            <span className="hidden md:inline text-sm font-medium text-foreground">Resolven AI</span>
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
        {/* Left rail */}
        <aside className="space-y-6">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
            <Plus className="h-4 w-4" /> New chat
          </button>
          <div>
            <div className="mb-2 px-1 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Conversations
            </div>
            <ul className="space-y-1">
              {conversations.map((c, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary cursor-pointer">
                  <span className="flex items-center gap-2 text-sm font-light text-foreground">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" /> {c.title}
                  </span>
                  <span className="text-[11px] font-light text-muted-foreground">{c.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Chat panel */}
        <section className="surface animate-rise relative flex min-h-[calc(100vh-140px)] flex-col overflow-hidden rounded-3xl p-8 md:p-10">
          {/* Ambient gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background:
                "radial-gradient(700px 360px at 15% 0%, color-mix(in oklab, var(--brand-lavender) 55%, transparent), transparent 65%), radial-gradient(620px 340px at 85% 20%, color-mix(in oklab, var(--brand-purple) 18%, transparent), transparent 70%), radial-gradient(680px 380px at 50% 110%, color-mix(in oklab, var(--brand-green) 12%, transparent), transparent 70%)",
            }}
          />
          <div className="relative m-auto flex flex-col items-center text-center">
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-[1.4rem] text-white shadow-elev ring-1 ring-white/15"
              style={{ background: "linear-gradient(135deg, var(--brand-purple), var(--brand-purple-deep))" }}
            >
              <BotMessageSquare className="h-9 w-9" strokeWidth={1.5} />
              <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] text-white shadow-soft">
                ✦
              </span>
            </div>
            <h1 className="mt-6 text-3xl md:text-4xl">
              <span className="text-foreground">Hello,</span>{" "}
              <span className="text-accent">Samarth Sachdeva</span>
            </h1>
            <p className="mt-3 max-w-md text-sm font-light text-muted-foreground">
              I can search internal data, analyze documents, and browse the web for you.
            </p>
          </div>

          <div className="relative mt-6 flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-3 py-2.5 shadow-soft backdrop-blur-xl transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-elev">
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
              className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-soft"
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
