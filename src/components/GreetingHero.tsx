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

      {/* Mobile layout: stacked, app-like card */}
      <div className="relative flex flex-col gap-4 px-5 py-5 sm:hidden">
        <div className="flex items-center gap-2">
          <span className="inline-block h-px w-6 bg-accent/70" />
          <span className="text-[10.5px] font-medium tracking-[0.22em] uppercase text-accent">
            Welcome
          </span>
        </div>
        <h1 className="font-display text-[1.45rem] leading-[1.15]">
          <span className="text-primary dark:text-white">Good Morning,</span>
          <br />
          <span className="text-accent">{name}</span>
        </h1>
        <div className="relative -mx-1 mt-1 flex gap-2 overflow-hidden">
          <div
            className="clip-diagonal h-24 flex-1 bg-cover bg-center shadow-elev"
            style={{ backgroundImage: `url(${heroTurbine})` }}
          />
          <div
            className="clip-diagonal h-24 flex-1 bg-cover bg-center shadow-elev"
            style={{ backgroundImage: `url(${heroSolar})` }}
          />
        </div>
      </div>

      {/* Desktop / tablet layout */}
      <div className="relative hidden sm:grid sm:grid-cols-[1fr_auto] sm:gap-5 sm:px-7 sm:py-6 md:px-9 md:py-7">
        <div className="self-center min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-accent/70" />
            <span className="text-[10.5px] font-medium tracking-[0.22em] uppercase text-accent">
              Welcome
            </span>
          </div>
          <h1 className="font-display text-[1.8rem] md:text-[2.25rem]">
            <span className="text-primary dark:text-white">Good Morning,</span>{" "}
            <span className="text-accent">{name}</span>
          </h1>
        </div>

        <div className="flex items-end gap-4">
          <div
            className="clip-diagonal h-28 w-44 bg-cover bg-center shadow-elev transition-transform duration-700 hover:scale-[1.02] md:h-32 md:w-56"
            style={{ backgroundImage: `url(${heroTurbine})` }}
          />
          <div
            className="clip-diagonal h-28 w-44 bg-cover bg-center shadow-elev transition-transform duration-700 hover:scale-[1.02] md:h-32 md:w-56"
            style={{ backgroundImage: `url(${heroSolar})` }}
          />
        </div>
      </div>
    </div>
  );
}
