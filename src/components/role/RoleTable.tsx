import type { Role } from "@/types/role.type";
import { MoreHorizontal, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface RoleTableProps {
  roles: Role[];
  loading?: boolean;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onAssignPermissions: (role: Role) => void;
}

export default function RoleTable({
  roles,
  loading = false,
  onEdit,
  onDelete,
  onAssignPermissions,
}: RoleTableProps) {
  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading roles...</div>;
  }

  if (roles.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No roles found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Guard</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead className="w-[60px]" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.uuid}>
            <TableCell className="font-medium">{role.name}</TableCell>
            <TableCell>
              <Badge variant="secondary">{role.guard_name}</Badge>
            </TableCell>
            <TableCell className="max-w-xs truncate">{role.description ?? "-"}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <span>{role.permissions?.length ?? 0}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onAssignPermissions(role)}>
                    Assign Permission
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(role)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => onDelete(role)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
