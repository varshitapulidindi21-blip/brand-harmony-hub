import heroTurbine from "@/assets/hero-turbine.jpg";
import heroSolar from "@/assets/hero-solar.jpg";

export function GreetingHero({ name }: { name: string }) {
  return (
    <div className="animate-rise relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-soft backdrop-blur-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(600px 280px at 0% 0%, color-mix(in oklab, var(--brand-purple) 14%, transparent), transparent 60%), radial-gradient(500px 260px at 100% 100%, color-mix(in oklab, var(--brand-green) 12%, transparent), transparent 60%)",
        }}
      />

      {/* Mobile hero — compact, app-like */}
      <div className="relative sm:hidden px-5 pt-5 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Welcome
            </div>
            <h1 className="mt-1 text-[1.4rem] leading-tight">
              <span className="text-primary dark:text-white">Good Morning,</span>
            </h1>
            <div className="mt-0.5 text-[1.4rem] leading-tight">
              <span className="text-accent">{name}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-end gap-1.5">
            <div
              className="clip-diagonal h-20 w-10 bg-cover bg-center shadow-elev"
              style={{ backgroundImage: `url(${heroTurbine})` }}
            />
            <div
              className="clip-diagonal h-20 w-10 bg-cover bg-center shadow-elev"
              style={{ backgroundImage: `url(${heroSolar})` }}
            />
          </div>
        </div>
      </div>

      {/* Desktop / tablet hero */}
      <div className="relative hidden sm:grid grid-cols-[1fr_auto] gap-5 px-7 py-6 md:px-9 md:py-7">
        <div className="self-center min-w-0">
          <h1 className="text-[1.8rem] md:text-[2.25rem]">
            <span className="text-primary dark:text-white">Good Morning,</span>{" "}
            <span className="text-accent">{name}</span>
          </h1>
        </div>

        <div className="flex items-end gap-3">
          <div
            className="clip-diagonal h-28 w-16 bg-cover bg-center shadow-elev transition-transform duration-700 hover:scale-[1.02] md:h-32 md:w-20"
            style={{ backgroundImage: `url(${heroTurbine})` }}
          />
          <div
            className="clip-diagonal h-28 w-16 bg-cover bg-center shadow-elev transition-transform duration-700 hover:scale-[1.02] md:h-32 md:w-20"
            style={{ backgroundImage: `url(${heroSolar})` }}
          />
        </div>
      </div>
    </div>
  );
}
