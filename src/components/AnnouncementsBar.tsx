import { Megaphone } from "lucide-react";

const items = [
  "Corporate announcement: Planned release window on Friday 10 PM IST.",
  "HR: Open enrollment for medical benefits closes May 30.",
  "IT: Scheduled VPN maintenance Saturday 2–4 AM IST.",
  "Finance: Q2 expense submissions due by month-end.",
  "Resolven AI: New document analysis features now available.",
];

export function AnnouncementsBar() {
  const loop = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden rounded-2xl border border-border bg-accent/95 text-white shadow-soft dark:bg-primary/95">
      <div className="absolute inset-y-0 left-0 z-10 flex items-center gap-2 bg-gradient-to-r from-accent via-accent/95 to-transparent px-5 py-3 text-[11px] font-medium tracking-[0.18em] uppercase dark:from-primary dark:via-primary/95">
        <Megaphone className="h-4 w-4" />
        <span>Announcements</span>
      </div>
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-accent to-transparent dark:from-primary" />

      <div className="overflow-hidden whitespace-nowrap py-3 pl-44 pr-6">
        <div className="marquee-track text-sm font-light">
          {loop.map((text, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
              <span className="opacity-95">{text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
