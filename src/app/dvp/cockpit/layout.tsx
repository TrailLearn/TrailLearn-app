import { type ReactNode } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MapPin, 
  Wallet, 
  Home, 
  Languages, 
  ArrowLeft 
} from "lucide-react";
import { cn } from "~/lib/utils";

interface SidebarItemProps {
  href: string;
  icon: any;
  label: string;
}

function SidebarItem({ href, icon: Icon, label }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export default function CockpitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r bg-muted/40 md:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl font-bold text-blue-600">TrailLearn</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mon Cockpit
              </div>
              <SidebarItem href="/dvp/cockpit" icon={LayoutDashboard} label="Synthèse" />
              
              <div className="mt-8 mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Piliers DVP
              </div>
              <SidebarItem href="/dvp/wizard/project" icon={MapPin} label="1. Projet" />
              <SidebarItem href="/dvp/wizard/budget" icon={Wallet} label="2. Budget" />
              <SidebarItem href="/dvp/wizard/housing" icon={Home} label="3. Logement" />
              <SidebarItem href="/dvp/wizard/language" icon={Languages} label="4. Langue" />
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <Link 
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour Accueil
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        <div className="container mx-auto p-6 lg:p-10 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
