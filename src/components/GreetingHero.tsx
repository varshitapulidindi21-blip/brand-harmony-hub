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

      <div className="relative grid grid-cols-1 gap-5 px-7 py-6 md:grid-cols-[1fr_auto] md:px-9 md:py-7">
        <div className="self-center">
          <h1 className="text-[1.8rem] md:text-[2.25rem]">
            <span className="text-primary dark:text-white">Good Morning,</span>{" "}
            <span className="text-accent">{name}</span>
          </h1>
        </div>

        <div className="hidden items-end gap-4 md:flex">
          <div
            className="clip-diagonal h-32 w-36 bg-cover bg-center shadow-elev transition-transform duration-700 hover:scale-[1.02]"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80)",
            }}
          />
          <div
            className="clip-diagonal h-32 w-36 bg-cover bg-center shadow-elev transition-transform duration-700 hover:scale-[1.02]"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
