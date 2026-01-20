import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { AppNavbar } from "~/components/shared/app-navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/"); // Or 404/403 page
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppNavbar user={session.user} />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Administration</h1>
        {children}
      </div>
    </div>
  );
}
