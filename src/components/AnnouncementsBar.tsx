import { Megaphone } from "lucide-react";

export function AnnouncementsBar() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-accent text-white dark:bg-primary">
      <div className="flex items-center gap-4 px-5 py-3">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase opacity-90">
          <Megaphone className="h-4 w-4" />
          Announcements
        </div>
        <div className="flex items-center gap-2 text-sm font-light">
          <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
          <span className="font-medium">Corporate announcement:</span>
          <span className="opacity-90">Planned release window on Friday 10 PM IST.</span>
        </div>
      </div>
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 sm:flex">
        {[0.25, 0.4, 0.55, 0.75, 1].map((o, i) => (
          <span
            key={i}
            className="block h-7 w-2.5 -skew-x-12 bg-white"
            style={{ opacity: o }}
          />
        ))}
      </div>
    </div>
  );
}
