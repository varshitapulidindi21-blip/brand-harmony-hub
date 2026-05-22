import type { ComponentType, SVGProps } from "react";
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
  brand,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number | string }>;
  title: string;
  subtitle?: string;
  tone?: Tone;
  pinned?: boolean;
  large?: boolean;
  brand?: boolean;
}) {
  return (
    <div
      className={cn(
        "module-card group flex gap-2.5 sm:gap-4 p-3 sm:p-4 md:p-5",
        large ? "flex-col items-start" : "items-center",
      )}
    >
      {brand ? (
        <div className="brand-tile shrink-0">
          <Icon className="h-7 w-7 sm:h-9 sm:w-9" />
        </div>
      ) : (
        <div className={cn("tile shrink-0 h-9 w-9 sm:h-12 sm:w-12 rounded-[0.75rem] sm:rounded-[0.95rem]", toneClass[tone])}>
          <Icon className="h-[1.05rem] w-[1.05rem] sm:h-[1.35rem] sm:w-[1.35rem]" strokeWidth={1.75} />
        </div>
      )}
      <div className={cn("min-w-0 flex-1", pinned && (large ? "pr-0" : "pr-6"))}>
        <div className={cn(
          "font-medium text-[0.85rem] sm:text-[0.95rem] leading-tight tracking-tight truncate",
          large && pinned && "pr-7",
        )}>
          {title}
        </div>
        {subtitle && (
          <div className="mc-sub mt-0.5 sm:mt-1 text-[0.7rem] sm:text-xs font-light leading-snug sm:leading-relaxed text-muted-foreground line-clamp-2">
            {subtitle}
          </div>
        )}
      </div>
      {pinned && (
        <span
          className={cn(
            "absolute flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent",
            large ? "right-3 top-3" : "right-2.5 top-2.5",
          )}
          aria-label="Pinned"
        >
          <Pin className="h-3 w-3" />
        </span>
      )}
    </div>
  );
}
