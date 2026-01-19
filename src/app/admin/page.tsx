import { RulesTable } from "~/features/admin/components/rules-table";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Gestion des Référentiels</h2>
        <p className="text-muted-foreground">
          Modifiez les seuils et paramètres du moteur de calcul. Chaque modification est auditée.
        </p>
      </div>
      <RulesTable />
    </div>
  );
}
