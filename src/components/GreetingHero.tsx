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

      <div className="relative grid grid-cols-[1fr_auto] gap-3 px-5 py-4 sm:gap-5 sm:px-7 sm:py-6 md:px-9 md:py-7">
        <div className="self-center min-w-0">
          <h1 className="text-[1.35rem] sm:text-[1.8rem] md:text-[2.25rem]">
            <span className="text-primary dark:text-white">Good Morning,</span>{" "}
            <span className="text-accent">{name}</span>
          </h1>
        </div>

        <div className="flex items-end gap-2 sm:gap-4">
          <div
            className="clip-diagonal h-20 w-20 bg-cover bg-center shadow-elev transition-transform duration-700 hover:scale-[1.02] sm:h-28 sm:w-32 md:h-32 md:w-36"
            style={{ backgroundImage: `url(${heroTurbine})` }}
          />
          <div
            className="clip-diagonal h-20 w-20 bg-cover bg-center shadow-elev transition-transform duration-700 hover:scale-[1.02] sm:h-28 sm:w-32 md:h-32 md:w-36"
            style={{ backgroundImage: `url(${heroSolar})` }}
          />
        </div>
      </div>
    </div>
  );
}
