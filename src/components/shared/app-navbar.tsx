import Link from "next/link";
import { UserDropdown } from "~/features/auth/components/user-dropdown";
import { type Session } from "next-auth";
import { MessageSquare } from "lucide-react";

interface AppNavbarProps {
  user?: Session["user"];
}

export function AppNavbar({ user }: AppNavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-primary font-mono">TrailLearn</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Dashboard
            </Link>
            <Link href="/dvp/wizard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Mon DVP
            </Link>
            <Link href="/dashboard/focus" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Focus
            </Link>
            <Link href="/dashboard/chat" className="transition-colors hover:text-foreground/80 text-blue-600 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Coach IA
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search placeholder */}
          </div>
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}