import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft,
  CheckSquare, LifeBuoy, FilePlus, FileText, HeartPulse, Plane, Receipt, Lightbulb,
  Cloud, Database, Sheet, Users, FileSignature, Cog, Shield, Megaphone, Brain, Settings2,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { SectionHeading } from "@/components/SectionHeading";
import { ModuleTile } from "@/components/ModuleTile";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "All Modules — Resolven Hub" },
      { name: "description", content: "Pin and access every Resolven module." },
    ],
  }),
  component: ModulesPage,
});

const personal = [
  { icon: CheckSquare, title: "My Tasks", subtitle: "Every pending action across modules", tone: "purple" as const },
  { icon: LifeBuoy, title: "IT Support", subtitle: "Raise a ticket · Service Desk", tone: "green" as const },
  { icon: FilePlus, title: "Raise IT Ticket", subtitle: "Report issue, request service or view history", tone: "lavender" as const },
  { icon: FileText, title: "Policies", subtitle: "Browse all published policies across departments", tone: "green-light" as const },
  { icon: HeartPulse, title: "Medical & Benefits", subtitle: "Insurance, wellness, reimbursement claims", tone: "purple" as const },
  { icon: Plane, title: "Travel Request", subtitle: "Raise domestic + international travel requests", tone: "grey" as const },
  { icon: Receipt, title: "Expense Claims", subtitle: "Submit + track reimbursement claims", tone: "green" as const },
  { icon: Lightbulb, title: "Idea", subtitle: "Share ideas, track reviews + outcomes", tone: "lavender" as const },
];

const workspaces = [
  { icon: Cloud, title: "Zelestra SharePoint", subtitle: "Intranet docs, team sites, shared drives", tone: "green" as const, pinned: true },
  { icon: Database, title: "Zelestra SAP", subtitle: "Enterprise resource planning (Hana cloud)", tone: "purple" as const, pinned: true },
  { icon: Sheet, title: "Smartsheets", subtitle: "Project plans, trackers, team workspaces", tone: "green-light" as const },
  { icon: Users, title: "Taxcon HRMS", subtitle: "Payroll, attendance, HR letters (India)", tone: "purple" as const, pinned: true },
  { icon: FileSignature, title: "DocuSign", subtitle: "e-Signature for contracts + approvals", tone: "lavender" as const },
  { icon: Cog, title: "HOTO", subtitle: "Handover, takeover and maintenance operations", tone: "grey" as const },
  { icon: Shield, title: "Permit System", subtitle: "Permit to Work — S1, S2, S3 workflow management", tone: "lavender" as const },
  { icon: Megaphone, title: "Announcements", subtitle: "Corporate updates and visibility windows", tone: "purple" as const },
  { icon: Brain, title: "Resolven AI", subtitle: "Contextual insights and copilot actions", tone: "green" as const, pinned: true },
  { icon: Settings2, title: "Admin Hub", subtitle: "Global masters, RBAC, module config and platform admin", tone: "grey" as const },
];

function ModulesPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="mx-auto w-full max-w-[1400px] space-y-10 px-6 py-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card hover:border-primary/40">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl md:text-4xl">
              <span className="text-foreground">All</span>{" "}
              <span className="text-accent">Modules</span>
            </h1>
          </div>
          <p className="hidden md:block max-w-md text-right text-xs font-light text-muted-foreground">
            Pin tiles to anchor them on your home · unpinned tiles appear only when frequently used
          </p>
        </div>

        <section className="rounded-3xl border border-border bg-card p-6">
          <SectionHeading
            eyebrow="PERSONAL"
            primary="Employee"
            accent="Self-Service"
            right={<span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">8 modules</span>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {personal.map((m) => <ModuleTile key={m.title} {...m} large />)}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6">
          <SectionHeading
            eyebrow="WORKSPACES"
            primary="Business"
            accent="Modules"
            right={<span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">10 modules</span>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {workspaces.map((m) => <ModuleTile key={m.title} {...m} large />)}
          </div>
        </section>
      </main>
    </div>
  );
}
