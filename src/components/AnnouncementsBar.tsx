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
    <div className="relative flex items-stretch gap-3 rounded-2xl border border-border bg-accent/95 text-white shadow-soft dark:bg-primary/95">
      {/* Fixed pill */}
      <div className="relative z-20 flex shrink-0 items-center gap-2 rounded-l-2xl bg-black/15 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm dark:bg-white/10">
        <Megaphone className="h-4 w-4" />
        <span>Announcements</span>
      </div>

      {/* Marquee viewport */}
      <div
        className="marquee relative flex-1 overflow-hidden py-3 pr-6"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 48px), transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 48px), transparent 100%)",
        }}
      >
        <div className="marquee-track flex whitespace-nowrap text-sm font-light">
          {loop.map((text, i) => (
            <span key={i} className="inline-flex items-center gap-3 pr-12">
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
              <span className="opacity-95">{text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
