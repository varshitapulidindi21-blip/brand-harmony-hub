export function SectionHeading({
  eyebrow,
  primary,
  accent,
  right,
}: {
  eyebrow?: string;
  primary: string;
  accent: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="mb-1 text-[11px] font-medium tracking-[0.18em] text-accent">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-2xl md:text-3xl leading-none">
          <span className="text-foreground">{primary}</span>{" "}
          <span className="text-accent">{accent}</span>
        </h2>
      </div>
      {right}
    </div>
  );
}
