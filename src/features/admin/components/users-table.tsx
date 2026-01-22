"use client";

import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Loader2, Shield, ShieldAlert, User } from "lucide-react";
import { useSession } from "next-auth/react";

export function UsersTable() {
  const { data: users, isLoading, refetch } = api.admin.getUsers.useQuery();
  const toggleRole = api.admin.toggleUserRole.useMutation({
    onSuccess: () => refetch(),
  });
  const { data: session } = useSession();

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Dernière activité</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-1 rounded-full">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  {user.name || "Sans nom"}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge 
                  variant={user.role === "ADMIN" ? "destructive" : "secondary"}
                  className="gap-1"
                >
                  {user.role === "ADMIN" ? <ShieldAlert className="w-3 h-3" /> : null}
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(user.lastActiveAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {user.id !== session?.user?.id && (
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleRole.mutate({ userId: user.id })}
                        disabled={toggleRole.isPending}
                        className={user.role === "ADMIN" ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"}
                    >
                        {toggleRole.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            user.role === "ADMIN" ? "Rétrograder" : "Promouvoir Admin"
                        )}
                    </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
