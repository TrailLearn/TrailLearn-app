import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { DvpPrintView } from "~/features/dvp/components/dvp-print-view";

export default async function PrintPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <DvpPrintView dvpId={id} />;
}

