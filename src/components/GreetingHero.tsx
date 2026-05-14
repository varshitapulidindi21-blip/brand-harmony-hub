export function GreetingHero({ name }: { name: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/60 dark:bg-card">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 p-7 md:p-9">
        <div>
          <h1 className="text-3xl md:text-4xl">
            <span className="text-foreground">Good Morning,</span>{" "}
            <span className="text-accent">{name}</span>
          </h1>
          <div className="mt-3 text-sm font-medium text-primary">Welcome back</div>
          <div className="mt-1 text-xs font-light text-muted-foreground">
            Last login 4/6/2026, 9:53:46 AM
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div
            className="clip-diagonal h-32 w-28 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80)",
            }}
          />
          <div
            className="clip-diagonal h-32 w-44 bg-cover bg-center"
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
