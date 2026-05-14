import type { LucideIcon } from "lucide-react";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "purple" | "green" | "lavender" | "green-light" | "grey";

const toneClass: Record<Tone, string> = {
  purple: "tile-purple",
  green: "tile-green",
  lavender: "tile-lavender",
  "green-light": "tile-green-light",
  grey: "tile-grey",
};

export function ModuleTile({
  icon: Icon,
  title,
  subtitle,
  tone = "purple",
  pinned,
  large,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  tone?: Tone;
  pinned?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm",
        large ? "flex-col items-start" : "items-center",
      )}
    >
      <div className={cn("tile shrink-0", toneClass[tone])}>
        <Icon className="h-6 w-6" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div className="font-medium text-sm md:text-base text-foreground truncate">{title}</div>
        {subtitle && (
          <div className="mt-0.5 text-xs font-light text-muted-foreground line-clamp-2">
            {subtitle}
          </div>
        )}
      </div>
      <span
        className={cn(
          "absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full",
          pinned ? "bg-accent text-white" : "bg-secondary text-muted-foreground",
        )}
      >
        <Pin className="h-3 w-3" />
      </span>
    </div>
  );
}
