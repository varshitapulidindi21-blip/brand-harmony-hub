import { Link } from "@tanstack/react-router";
import { Bell, Search, Settings, ChevronDown } from "lucide-react";
import logo from "@/assets/resolven-logo.png";
import logoWhite from "@/assets/resolven-logo-white.png";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar({ showSearch = true }: { showSearch?: boolean }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center gap-5 px-6">
        <Link to="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
          <img src={logo} alt="Resolven" className="logo-light h-14 w-auto" />
          <img src={logoWhite} alt="Resolven" className="logo-dark h-14 w-auto" />
        </Link>

        {showSearch && (
          <Link
            to="/resolven-ai"
            className="group hidden md:flex flex-1 items-center gap-3 rounded-full border border-border/70 bg-card/70 px-5 py-2.5 text-sm text-muted-foreground shadow-soft transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-elev"
          >
            <Search className="h-4 w-4 transition-colors group-hover:text-primary" />
            <span className="font-light">Ask Resolven AI — search modules, documents, people…</span>
          </Link>
        )}

        <div className="ml-auto flex items-center gap-1">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-foreground/80 transition-all duration-300 hover:bg-secondary/70 hover:text-foreground">
            <Bell className="h-[1.1rem] w-[1.1rem]" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_var(--color-background)]" />
          </button>
          <ThemeToggle />
          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground/80 transition-all duration-300 hover:bg-secondary/70 hover:text-foreground">
            <Settings className="h-[1.1rem] w-[1.1rem]" />
          </button>
          <button className="ml-2 flex items-center gap-1.5 rounded-xl bg-primary/95 p-1 pr-2 text-primary-foreground shadow-soft transition-all duration-300 hover:bg-primary hover:shadow-elev">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-xs font-medium text-secondary-foreground">
              SS
            </span>
            <ChevronDown className="h-4 w-4 opacity-80" />
          </button>
        </div>
      </div>
    </header>
  );
}
