import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { AiNavigator as AiNavigatorComponent } from "~/features/ai-wizard/components/ai-navigator";

export default async function OpportunitiesPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <AiNavigatorComponent />;
}
