import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { SignInForm } from "~/features/auth/components/sign-in-form";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <SignInForm />
    </div>
  );
}
