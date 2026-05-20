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
        <section className="surface animate-rise relative flex min-h-[calc(100vh-140px)] flex-col rounded-3xl p-8 md:p-10">
          <div className="m-auto flex flex-col items-center text-center">
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-2xl text-white shadow-md"
              style={{ background: "linear-gradient(135deg, var(--brand-purple), var(--brand-purple-deep))" }}
            >
              <Bot className="h-10 w-10" />
              <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
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

          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 shadow-soft backdrop-blur transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-elev">
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-secondary">
              <Globe className="h-5 w-5" />
            </button>
            <input
              className="flex-1 bg-transparent text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="Ask Resolven AI anything…"
            />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-white"
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
