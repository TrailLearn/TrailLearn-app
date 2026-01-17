import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { AppNavbar } from "~/components/shared/app-navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppNavbar user={session.user} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}