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
import { EditRuleDialog } from "./edit-rule-dialog";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function RulesTable() {
  const { data: rules, isLoading } = api.admin.getAllRules.useQuery();

  if (isLoading) return <div>Chargement des règles...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Référentiel des Règles Métier</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Catégorie</TableHead>
              <TableHead>Clé</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Dernière màj</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules?.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">
                  <Badge variant="outline">{rule.category}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{rule.key}</TableCell>
                <TableCell>{JSON.stringify(rule.value)}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(rule.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <EditRuleDialog rule={rule} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
