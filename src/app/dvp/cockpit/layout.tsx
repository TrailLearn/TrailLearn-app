import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MapPin, 
  Wallet, 
  Home, 
  Languages,
  Menu
} from "lucide-react";
import { AppNavbar } from "~/components/shared/app-navbar";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

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

function CockpitNavigation() {
  return (
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
  );
}

export default async function CockpitLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppNavbar user={session.user} />
      
      {/* 
        Container wrapper to align sidebar with the centered AppNavbar content. 
        This fixes the "décalage visuel" issue.
      */}
      <div className="container mx-auto flex flex-1 px-4 md:px-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 border-r bg-muted/10 md:block pr-6">
          <div className="flex h-full flex-col gap-2 py-6">
            <CockpitNavigation />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Mobile Menu Trigger */}
          <div className="md:hidden py-4 border-b mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Menu className="h-4 w-4" />
                  Menu Cockpit
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 pt-6">
                 <div className="px-6 mb-6">
                    <span className="text-lg font-bold text-blue-600">TrailLearn</span>
                 </div>
                 <CockpitNavigation />
              </SheetContent>
            </Sheet>
          </div>

          <div className="py-6 lg:py-10 pl-0 md:pl-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


