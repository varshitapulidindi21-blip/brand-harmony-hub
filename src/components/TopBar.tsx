import { Link } from "@tanstack/react-router";
import { Search, Settings, ChevronDown } from "lucide-react";
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
          <div className="group hidden md:flex flex-1 items-center gap-3 rounded-full border border-border/70 bg-card/70 px-5 py-2.5 text-sm text-muted-foreground shadow-soft transition-all duration-300 focus-within:border-primary/40 hover:border-primary/40 hover:bg-card">
            <Search className="h-4 w-4 transition-colors group-focus-within:text-primary" />
            <input
              className="flex-1 bg-transparent font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder="Search modules, departments, pages…"
              aria-label="Search the platform"
            />
          </div>
        )}

        <div className="ml-auto flex items-center gap-1">
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
