import { useState } from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, ClipboardList, PlusCircle, Inbox, ShieldCheck, ScrollText,
  Plane, Hotel, Wallet, Paperclip, FileCheck2, Trash2, Pencil, Plus,
  Calendar, Clock, MapPin, Search, ChevronRight, Home, X, Save, Send,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { SparkleFab } from "@/components/SparkleFab";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/travel-request")({
  head: () => ({
    meta: [
      { title: "Travel Requests — Resolven" },
      { name: "description", content: "Raise, approve and track domestic and international travel requests." },
    ],
  }),
  component: TravelRequestPage,
});

type TabKey = "dashboard" | "my" | "new" | "queue" | "rules" | "audit";

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "my",        label: "My Requests", icon: ClipboardList },
  { key: "new",       label: "New Request", icon: PlusCircle },
  { key: "queue",     label: "Approval Queue", icon: Inbox },
  { key: "rules",     label: "Approval Rules", icon: ShieldCheck },
  { key: "audit",     label: "Audit Log", icon: ScrollText },
];

function TravelRequestPage() {
  const [tab, setTab] = useState<TabKey>("dashboard");

  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="mx-auto w-full max-w-[1400px] space-y-5 px-4 py-5 sm:space-y-7 sm:px-6 sm:py-8">
        <Breadcrumbs />
        <BrandedHero />
        <TabBar tab={tab} onChange={setTab} />

        <div className="animate-rise">
          {tab === "dashboard" && <DashboardTab onNew={() => setTab("new")} />}
          {tab === "my"        && <MyRequestsTab />}
          {tab === "new"       && <NewRequestTab onCancel={() => setTab("dashboard")} />}
          {tab === "queue"     && <ApprovalQueueTab />}
          {tab === "rules"     && <ApprovalRulesTab />}
          {tab === "audit"     && <AuditLogTab />}
        </div>
      </main>
      <SparkleFab />
    </div>
  );
}

/* ---------- Shared chrome ---------- */

function Breadcrumbs() {
  return (
    <nav className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <Link to="/" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
        <Home className="h-3.5 w-3.5" /> Home
      </Link>
      <ChevronRight className="h-3 w-3 opacity-60" />
      <span className="text-foreground">Travel Requests</span>
    </nav>
  );
}

function BrandedHero() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl sm:rounded-[1.4rem] border border-border/60 shadow-elev"
      style={{
        background:
          "linear-gradient(120deg, oklch(0.32 0.17 295) 0%, oklch(0.38 0.18 295) 38%, oklch(0.42 0.12 240) 70%, oklch(0.55 0.16 158) 100%)",
      }}
    >
      {/* soft glass overlay */}
      <div className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "radial-gradient(600px 220px at 12% 0%, oklch(1 0 0 / 0.18), transparent 60%), radial-gradient(500px 240px at 100% 100%, oklch(0.682 0.180 148 / 0.30), transparent 60%)" }} />
      <div className="relative flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8">
        <div className="min-w-0">
          <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-white/75">
            Resolven · Employee Self-Service
          </div>
          <h1 className="mt-1.5 text-2xl sm:text-3xl md:text-[2.1rem] text-white">
            Travel Requests
          </h1>
          <p className="mt-1.5 max-w-xl text-[12px] sm:text-sm font-light text-white/80">
            Raise, route and track domestic and international travel with policy-aware approvals.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/20 backdrop-blur">
            <Plane className="h-5 w-5 text-white" strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TabBar({ tab, onChange }: { tab: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <div className="surface rounded-2xl p-1.5 sm:p-2 overflow-x-auto scrollbar-hide">
      <div className="flex gap-1 min-w-max sm:min-w-0 sm:justify-start">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={cn(
                "group relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[12.5px] sm:text-sm font-medium whitespace-nowrap transition-all duration-300",
                active
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
              )}
            >
              <Icon className="h-4 w-4 opacity-90" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Reusable bits ---------- */

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("surface rounded-2xl p-5 sm:p-6", className)}>{children}</div>
  );
}

function StatusPill({ status }: { status: "approved" | "pending" | "rejected" | "draft" | "completed" }) {
  const map: Record<typeof status, string> = {
    approved:  "bg-accent/15 text-accent ring-accent/25",
    completed: "bg-accent/15 text-accent ring-accent/25",
    pending:   "bg-amber-500/15 text-amber-600 ring-amber-500/25 dark:text-amber-300",
    rejected:  "bg-destructive/12 text-destructive ring-destructive/25",
    draft:     "bg-muted text-muted-foreground ring-border",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wider ring-1", map[status])}>
      {status}
    </span>
  );
}

function Field({ label, hint, children, required }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}{required && <span className="text-destructive">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] font-light text-muted-foreground">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border/70 bg-card/60 px-3.5 py-2.5 text-sm font-light text-foreground placeholder:text-muted-foreground/70 shadow-soft transition-all duration-200 focus:border-primary/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur";

/* ---------- Dashboard ---------- */

function DashboardTab({ onNew }: { onNew: () => void }) {
  const stats = [
    { label: "All Requests",      value: 0, icon: Plane },
    { label: "Awaiting My Approval", value: 0, icon: Inbox, accent: true },
    { label: "Pending Approval",  value: 0, icon: MapPin },
    { label: "Approved + Completed", value: 0, icon: FileCheck2 },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <button
            key={s.label}
            className={cn(
              "group relative overflow-hidden rounded-2xl border bg-card/70 p-4 sm:p-5 text-left shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elev",
              s.accent ? "border-primary/30 ring-1 ring-primary/20" : "border-border/70",
            )}
          >
            <div className="flex items-center gap-2.5">
              <span className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg ring-1",
                s.accent ? "bg-primary/12 text-primary ring-primary/20" : "bg-secondary/60 text-secondary-foreground ring-border/60",
              )}>
                <s.icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </span>
            </div>
            <div className="mt-3 text-3xl sm:text-[2rem] font-display italic text-foreground">{s.value}</div>
          </button>
        ))}
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg text-foreground">Recent requests</h3>
            <p className="mt-0.5 text-[11.5px] font-light text-muted-foreground">Your latest activity at a glance.</p>
          </div>
          <button onClick={onNew} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-primary-foreground shadow-soft transition hover:shadow-elev">
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>
        <EmptyState
          title="No travel requests yet"
          description="Click New Request to raise your first travel request."
        />
      </Card>
    </div>
  );
}

/* ---------- My Requests ---------- */

function MyRequestsTab() {
  const [scope, setScope] = useState<"mine" | "org">("mine");
  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-xl bg-secondary/60 p-1">
          {(["mine", "org"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-[12px] font-medium transition",
                scope === s ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s === "mine" ? "My requests" : "All in org"}
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input className={cn(inputClass, "pl-9")} placeholder="Search by ref no or purpose…" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select className={inputClass}><option>All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option></select>
        <select className={inputClass}><option>All types</option><option>Domestic</option><option>International</option></select>
      </div>

      <div className="mt-5">
        <DataTable
          headers={["Ref no", "Purpose", "Type", "From → To", "Dates", "Cost", "Status", "Submitted"]}
          emptyText="No travel requests match the current filters."
        />
      </div>
    </Card>
  );
}

/* ---------- New Request ---------- */

type Leg = { id: string; from: string; to: string; departDate: string; departTime: string; returnDate: string; returnTime: string; airline: string };

function NewRequestTab({ onCancel }: { onCancel: () => void }) {
  const [section, setSection] = useState<"travel" | "stay" | "expense" | "files" | "summary">("travel");
  const [legs, setLegs] = useState<Leg[]>([
    { id: crypto.randomUUID(), from: "", to: "", departDate: "", departTime: "", returnDate: "", returnTime: "", airline: "" },
  ]);

  const addLeg = () =>
    setLegs((p) => [...p, { id: crypto.randomUUID(), from: "", to: "", departDate: "", departTime: "", returnDate: "", returnTime: "", airline: "" }]);
  const removeLeg = (id: string) => setLegs((p) => p.filter((l) => l.id !== id));
  const updateLeg = (id: string, patch: Partial<Leg>) =>
    setLegs((p) => p.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const sections = [
    { key: "travel" as const,  label: "Travel",            icon: Plane },
    { key: "stay" as const,    label: "Accommodation",     icon: Hotel },
    { key: "expense" as const, label: "Expense & Advance", icon: Wallet },
    { key: "files" as const,   label: "Attachments",       icon: Paperclip },
    { key: "summary" as const, label: "Summary",           icon: FileCheck2 },
  ];

  return (
    <div className="space-y-5 pb-24 sm:pb-6">
      {/* Employee card */}
      <Card>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ProfileField label="Employee"        value="Varshita P" />
          <ProfileField label="Employee ID"     value="varshita.p"  sub="varshita.pulidindi@partner.resolven.com" />
          <ProfileField label="Contact number"  value="7550081799" />
          <ProfileField label="Department"      value="—" />
          <ProfileField label="Designation"     value="—" />
          <Field label="Cost Center / Project Name">
            <input className={inputClass} placeholder="e.g. ENG-CC-101 or Gorbea Solar" />
          </Field>
        </div>
      </Card>

      {/* Inner section nav */}
      <div className="surface rounded-2xl p-1.5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 min-w-max">
          {sections.map(({ key, label, icon: Icon }) => {
            const active = section === key;
            return (
              <button
                key={key}
                onClick={() => setSection(key)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[12.5px] font-medium whitespace-nowrap transition",
                  active ? "bg-accent text-accent-foreground shadow-soft" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            );
          })}
        </div>
      </div>

      {section === "travel" && (
        <>
          <Card>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Travel type"><select className={inputClass}><option>Domestic</option><option>International</option></select></Field>
              <Field label="Mode"><select className={inputClass}><option>Air</option><option>Rail</option><option>Road</option></select></Field>
              <Field label="Priority"><select className={inputClass}><option>Normal</option><option>Urgent</option><option>Emergency</option></select></Field>
              <Field label="Air class"><select className={inputClass}><option>Economy</option><option>Premium Economy</option><option>Business</option></select></Field>
            </div>
            <div className="mt-4">
              <Field label="Travel purpose" required>
                <textarea rows={3} className={cn(inputClass, "resize-none")} placeholder="e.g. Customer kickoff for Gorbea Solar Project — week-long workshop with the operations team." />
              </Field>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg text-foreground">Travel legs</h3>
                <p className="mt-0.5 text-[11.5px] font-light text-muted-foreground">Multi-city trips: add a leg per hop. Returns can be entered as the last leg or via Return date.</p>
              </div>
              <button onClick={addLeg} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card/80 px-3.5 py-2 text-[11.5px] font-medium uppercase tracking-[0.14em] text-foreground shadow-soft transition hover:border-primary/40 hover:shadow-elev">
                <Plus className="h-3.5 w-3.5" /> Add leg
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {legs.map((leg, i) => (
                <div key={leg.id} className="relative rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5 shadow-soft backdrop-blur">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-primary">
                      <Plane className="h-3.5 w-3.5" /> Leg {i + 1}
                    </span>
                    {legs.length > 1 && (
                      <button onClick={() => removeLeg(leg.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive" aria-label="Remove leg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="From"><input className={inputClass} value={leg.from} onChange={(e) => updateLeg(leg.id, { from: e.target.value })} placeholder="Mumbai" /></Field>
                    <Field label="To"><input className={inputClass} value={leg.to} onChange={(e) => updateLeg(leg.id, { to: e.target.value })} placeholder="Bengaluru" /></Field>
                    <Field label="Departure date">
                      <div className="relative">
                        <input type="date" className={cn(inputClass, "pr-10")} value={leg.departDate} onChange={(e) => updateLeg(leg.id, { departDate: e.target.value })} />
                        <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </Field>
                    <Field label="Preferred departure time">
                      <div className="relative">
                        <input type="time" className={cn(inputClass, "pr-10")} value={leg.departTime} onChange={(e) => updateLeg(leg.id, { departTime: e.target.value })} />
                        <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </Field>
                    <Field label="Return date (optional)">
                      <div className="relative">
                        <input type="date" className={cn(inputClass, "pr-10")} value={leg.returnDate} onChange={(e) => updateLeg(leg.id, { returnDate: e.target.value })} />
                        <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </Field>
                    <Field label="Preferred return time">
                      <div className="relative">
                        <input type="time" className={cn(inputClass, "pr-10")} value={leg.returnTime} onChange={(e) => updateLeg(leg.id, { returnTime: e.target.value })} />
                        <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </Field>
                    <Field label="Preferred airline"><input className={inputClass} value={leg.airline} onChange={(e) => updateLeg(leg.id, { airline: e.target.value })} placeholder="Indigo" /></Field>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {section === "stay" && (
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="City"><input className={inputClass} placeholder="Bengaluru" /></Field>
            <Field label="Hotel preference"><input className={inputClass} placeholder="Any 4-star" /></Field>
            <Field label="Check-in"><input type="date" className={inputClass} /></Field>
            <Field label="Check-out"><input type="date" className={inputClass} /></Field>
            <Field label="Room type"><select className={inputClass}><option>Standard</option><option>Deluxe</option><option>Suite</option></select></Field>
            <Field label="Nightly budget (₹)"><input type="number" className={inputClass} placeholder="6000" /></Field>
          </div>
        </Card>
      )}

      {section === "expense" && (
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Estimated cost (₹)"><input type="number" className={inputClass} placeholder="45000" /></Field>
            <Field label="Advance required (₹)"><input type="number" className={inputClass} placeholder="0" /></Field>
            <Field label="Currency"><select className={inputClass}><option>INR</option><option>USD</option><option>EUR</option></select></Field>
            <Field label="Cost category"><select className={inputClass}><option>Project travel</option><option>Training</option><option>Sales</option></select></Field>
          </div>
        </Card>
      )}

      {section === "files" && (
        <Card>
          <div className="rounded-2xl border border-dashed border-border/80 bg-card/50 p-8 text-center">
            <Paperclip className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-foreground">Drop files or click to upload</p>
            <p className="mt-0.5 text-[11.5px] font-light text-muted-foreground">Invitations, agendas, quotes — PDF, PNG, JPG up to 10MB.</p>
          </div>
        </Card>
      )}

      {section === "summary" && (
        <Card>
          <h3 className="text-base sm:text-lg text-foreground">Review & submit</h3>
          <p className="mt-1 text-[12px] font-light text-muted-foreground">Verify your details below. You can return to any section to edit before submitting.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["Employee", "Varshita P"],
              ["Travel type", "Domestic · Air · Economy"],
              ["Legs", `${legs.length} configured`],
              ["Priority", "Normal"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border/70 bg-card/60 px-4 py-3">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
                <div className="mt-1 text-sm font-medium text-foreground">{v}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Sticky action bar */}
      <div className="sticky bottom-3 sm:bottom-4 z-20 mt-4">
        <div className="surface flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 sm:px-4">
          <button onClick={onCancel} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12.5px] font-medium text-muted-foreground transition hover:bg-secondary/60 hover:text-foreground">
            <X className="h-4 w-4" /> Cancel
          </button>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-[12.5px] font-medium text-foreground shadow-soft transition hover:border-primary/40">
              <Save className="h-4 w-4" /> Save draft
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[12.5px] font-medium text-primary-foreground shadow-soft transition hover:shadow-elev">
              <Send className="h-4 w-4" /> Submit for approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
      {sub && <div className="text-[11px] font-light text-accent">{sub}</div>}
    </div>
  );
}

/* ---------- Approval Queue ---------- */

function ApprovalQueueTab() {
  const [filter, setFilter] = useState<"all" | "awaiting" | "approved" | "rejected">("all");
  const filters = [
    { key: "all" as const,      label: "All" },
    { key: "awaiting" as const, label: "Awaiting me" },
    { key: "approved" as const, label: "Approved by me" },
    { key: "rejected" as const, label: "Rejected by me" },
  ];
  return (
    <Card>
      <div className="inline-flex flex-wrap gap-1 rounded-xl bg-secondary/60 p-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-[12px] font-medium transition",
              filter === f.key ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <DataTable
          headers={["Ref no", "Requester", "Purpose", "Type", "From → To", "Cost", "Submitted", "Status"]}
          emptyText="No travel requests in your organisation yet."
        />
      </div>
    </Card>
  );
}

/* ---------- Approval Rules ---------- */

type Rule = { id: string; level: "L1" | "L2" | "L3"; name: string; travel: string; urgency: string; minCost?: number; approver: string; sla: number; active: boolean };

function ApprovalRulesTab() {
  const [rules, setRules] = useState<Rule[]>([
    { id: "1", level: "L1", name: "Manager / HOD approval (always required)", travel: "ANY", urgency: "ANY", approver: "TRAVEL_MANAGER", sla: 24, active: true },
    { id: "2", level: "L1", name: "Emergency — straight to CXO (24h SLA)",   travel: "ANY", urgency: "ANY", approver: "TRAVEL_CXO",    sla: 24, active: true },
    { id: "3", level: "L2", name: "Finance approval for cost > ₹50,000",       travel: "ANY", urgency: "ANY", minCost: 50000, approver: "TRAVEL_FINANCE", sla: 48, active: true },
    { id: "4", level: "L3", name: "CXO approval for International travel",     travel: "INTERNATIONAL", urgency: "ANY", approver: "TRAVEL_CXO", sla: 72, active: true },
  ]);
  const remove = (id: string) => setRules((p) => p.filter((r) => r.id !== id));

  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-base sm:text-lg text-foreground">Add rule</h3>
        <p className="mt-0.5 text-[11.5px] font-light text-muted-foreground">Define an approval level with optional travel/urgency/cost gates.</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Field label="Name"><input className={inputClass} placeholder="Rule name" /></Field>
          <Field label="Travel type"><select className={inputClass}><option>Any</option><option>Domestic</option><option>International</option></select></Field>
          <Field label="Urgency"><select className={inputClass}><option>Any</option><option>Normal</option><option>Urgent</option><option>Emergency</option></select></Field>
          <Field label="Min cost (₹)"><input className={inputClass} placeholder="—" /></Field>
          <Field label="Approver"><select className={inputClass}><option>Select approver</option><option>TRAVEL_MANAGER</option><option>TRAVEL_FINANCE</option><option>TRAVEL_CXO</option></select></Field>
          <Field label="Level"><input type="number" min={1} max={5} defaultValue={1} className={inputClass} /></Field>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-6">
          <Field label="SLA (hrs)"><input type="number" defaultValue={48} className={inputClass} /></Field>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[12.5px] font-medium text-primary-foreground shadow-soft transition hover:shadow-elev">
            <Plus className="h-4 w-4" /> Add rule
          </button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/40 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {["Level", "Name", "Travel", "Urgency", "Min cost", "Approver", "SLA", "Active", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rules.map((r, i) => (
                <tr key={r.id} className={cn("border-t border-border/60 transition-colors hover:bg-secondary/30", i % 2 && "bg-card/40")}>
                  <td className="px-4 py-3"><span className="inline-flex h-7 min-w-[2.25rem] items-center justify-center rounded-lg bg-primary/12 px-2 text-[11px] font-medium text-primary ring-1 ring-primary/15">{r.level}</span></td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.travel}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.urgency}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.minCost ? `₹ ${r.minCost.toLocaleString()}` : "—"}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.approver}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.sla}h</td>
                  <td className="px-4 py-3"><StatusPill status={r.active ? "approved" : "draft"} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => remove(r.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Audit Log ---------- */

function AuditLogTab() {
  const [type, setType] = useState("all");
  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select value={type} onChange={(e) => setType(e.target.value)} className={cn(inputClass, "sm:max-w-md")}>
          <option value="all">All event types</option>
          <option>Created</option><option>Approved</option><option>Rejected</option><option>Edited</option>
        </select>
        <div className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">0 events</div>
      </div>
      <div className="mt-5">
        <DataTable headers={["When", "Event", "Request", "Actor", "Details"]} emptyText="No events match the current filter." />
      </div>
    </Card>
  );
}

/* ---------- Shared table / empty ---------- */

function DataTable({ headers, emptyText }: { headers: string[]; emptyText: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40">
            <tr className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 text-left whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={headers.length} className="px-4 py-12 text-center text-sm font-light text-muted-foreground">
                {emptyText}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 px-6 py-10 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
        <Plane className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-[12px] font-light text-muted-foreground">{description}</p>
    </div>
  );
}
