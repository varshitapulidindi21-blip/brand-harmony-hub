import { Link } from "@tanstack/react-router";
import { Bell, Search, Settings, ChevronDown } from "lucide-react";
import logo from "@/assets/resolven-logo.png";
import logoWhite from "@/assets/resolven-logo-white.png";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar({ showSearch = true }: { showSearch?: boolean }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-6">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Resolven" className="logo-light h-14 w-auto" />
          <img src={logoWhite} alt="Resolven" className="logo-dark h-14 w-auto" />
        </Link>

        {showSearch && (
          <Link
            to="/resolven-ai"
            className="group hidden md:flex flex-1 items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground hover:border-primary/40 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="font-light">Ask Resolven AI — search modules, documents, people…</span>
          </Link>
        )}

        <div className="ml-auto flex items-center gap-1">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
          <ThemeToggle />
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary">
            <Settings className="h-5 w-5" />
          </button>
          <button className="ml-2 flex items-center gap-1 rounded-lg bg-primary p-1 pr-1.5 text-primary-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
              SS
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
