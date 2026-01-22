import { RulesTable } from "~/features/admin/components/rules-table";
import { UsersTable } from "~/features/admin/components/users-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Shield, Settings } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Administration</h2>
        <p className="text-muted-foreground">
          Gérez les utilisateurs et les règles métier de l'application.
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Shield className="w-4 h-4" />
            Utilisateurs & Rôles
          </TabsTrigger>
          <TabsTrigger value="rules" className="gap-2">
            <Settings className="w-4 h-4" />
            Règles Métier
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
             <h3 className="text-lg font-medium">Liste des utilisateurs</h3>
          </div>
          <UsersTable />
        </TabsContent>
        
        <TabsContent value="rules" className="space-y-4">
           <div className="flex justify-between items-center">
             <h3 className="text-lg font-medium">Référentiel des règles</h3>
          </div>
          <RulesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
