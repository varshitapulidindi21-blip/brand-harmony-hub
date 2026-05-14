import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckSquare, LifeBuoy, FilePlus, FileText, HeartPulse, Plane, Receipt, Lightbulb,
  Cloud, Database, Sheet, Users, FileSignature, Settings2, Shield, Megaphone, Brain, Cog,
  Briefcase, Wrench, FlaskConical, Calculator, ShoppingCart, Megaphone as MegIcon,
  Scale, Cpu, BadgeCheck, HardHat, Truck, BarChart3, Building2, Headphones, GraduationCap,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { GreetingHero } from "@/components/GreetingHero";
import { AnnouncementsBar } from "@/components/AnnouncementsBar";
import { SectionHeading } from "@/components/SectionHeading";
import { ModuleTile } from "@/components/ModuleTile";
import { SparkleFab } from "@/components/SparkleFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Resolven Hub" },
      { name: "description", content: "Your Resolven workspace: modules, announcements, and AI." },
    ],
  }),
  component: HomePage,
});

const selfService = [
  { icon: CheckSquare, title: "My Tasks", subtitle: "Every pending action across modules", tone: "purple" as const },
  { icon: LifeBuoy, title: "IT Support", subtitle: "Raise a ticket · Service Desk", tone: "green" as const },
  { icon: FilePlus, title: "Raise IT Ticket", subtitle: "Report issue, request service or view history", tone: "lavender" as const },
  { icon: FileText, title: "Policies", subtitle: "Browse all published policies across departments", tone: "green-light" as const },
  { icon: HeartPulse, title: "Medical & Benefits", subtitle: "Insurance, wellness, reimbursement claims", tone: "purple" as const },
  { icon: Plane, title: "Travel Request", subtitle: "Raise domestic + international travel", tone: "grey" as const },
  { icon: Receipt, title: "Expense Claims", subtitle: "Submit + track reimbursement claims", tone: "green" as const },
  { icon: Lightbulb, title: "Idea", subtitle: "Share ideas, track reviews + outcomes", tone: "lavender" as const },
];

const business = [
  { icon: Cloud, title: "Zelestra SharePoint", subtitle: "Intranet docs, team sites, shared drives", tone: "green" as const, pinned: true },
  { icon: Database, title: "Zelestra SAP", subtitle: "Enterprise resource planning (Hana cloud)", tone: "purple" as const, pinned: true },
  { icon: Sheet, title: "Smartsheets", subtitle: "Project plans, trackers, team workspaces", tone: "green-light" as const },
  { icon: Users, title: "Taxcon HRMS", subtitle: "Payroll, attendance, HR letters (India)", tone: "purple" as const, pinned: true },
  { icon: FileSignature, title: "DocuSign", subtitle: "e-Signature for contracts + approvals", tone: "lavender" as const },
  { icon: Cog, title: "HOTO", subtitle: "Handover, takeover and maintenance operations", tone: "grey" as const },
  { icon: Shield, title: "Permit System", subtitle: "Permit to Work — S1, S2, S3 workflow", tone: "lavender" as const },
  { icon: Megaphone, title: "Announcements", subtitle: "Corporate updates and visibility windows", tone: "purple" as const },
  { icon: Brain, title: "Resolven AI", subtitle: "Contextual insights and copilot actions", tone: "green" as const, pinned: true },
  { icon: Settings2, title: "Admin Hub", subtitle: "Global masters, RBAC, module config", tone: "grey" as const },
];

const departments = [
  { icon: Users, label: "Human Resources", tone: "purple" as const },
  { icon: Calculator, label: "Finance", tone: "lavender" as const },
  { icon: Wrench, label: "Engineering", tone: "lavender" as const },
  { icon: ShoppingCart, label: "Procurement", tone: "lavender" as const },
  { icon: MegIcon, label: "Marketing", tone: "lavender" as const },
  { icon: Scale, label: "Legal", tone: "lavender" as const },
  { icon: Cpu, label: "IT", tone: "lavender" as const },
  { icon: BadgeCheck, label: "Quality", tone: "lavender" as const },
  { icon: HardHat, label: "HSE", tone: "green-light" as const },
  { icon: Truck, label: "Supply Chain", tone: "lavender" as const },
  { icon: FlaskConical, label: "R&D", tone: "lavender" as const },
  { icon: Briefcase, label: "Operations", tone: "lavender" as const },
  { icon: BarChart3, label: "Strategy", tone: "lavender" as const },
  { icon: Building2, label: "Business Dev", tone: "lavender" as const },
  { icon: Headphones, label: "Customer Care", tone: "lavender" as const },
  { icon: GraduationCap, label: "Learning", tone: "lavender" as const },
];

const toneBg: Record<string, string> = {
  purple: "tile-purple",
  green: "tile-green",
  lavender: "tile-lavender",
  "green-light": "tile-green-light",
  grey: "tile-grey",
};

function HomePage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="mx-auto w-full max-w-[1400px] space-y-8 px-6 py-8">
        <GreetingHero name="Samarth Sachdeva" />
        <AnnouncementsBar />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-border bg-card p-6">
            <SectionHeading
              eyebrow="PERSONAL"
              primary="Employee"
              accent="Self-Service"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selfService.map((m) => (
                <ModuleTile key={m.title} {...m} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <SectionHeading
              eyebrow="WORKSPACES"
              primary="Business"
              accent="Modules"
              right={
                <Link to="/modules" className="text-xs font-medium tracking-[0.18em] uppercase text-accent hover:underline">
                  View all ↗
                </Link>
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {business.slice(0, 8).map((m) => (
                <ModuleTile key={m.title} {...m} />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6">
          <SectionHeading
            eyebrow="SHAREPOINT"
            primary="Department"
            accent="Folders"
            right={<span className="text-xs font-light text-muted-foreground">16 departments</span>}
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {departments.map((d) => (
              <div
                key={d.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background/40 p-3 transition-colors hover:border-primary/40"
              >
                <div className={`tile ${toneBg[d.tone]} h-10 w-10 rounded-lg`}>
                  <d.icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-medium text-foreground text-center">{d.label}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-6 text-center text-xs font-light text-muted-foreground">
          © 2026 Resolve In Action · Built with the Resolven Design System
        </footer>
      </main>
      <SparkleFab />
    </div>
  );
}
