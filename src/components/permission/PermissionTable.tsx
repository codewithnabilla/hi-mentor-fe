import type { Permission, PermissionPageLink } from "@/types/permission.type";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface PermissionTableProps {
  permissions: Permission[];
  loading?: boolean;
  links?: PermissionPageLink[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onEdit: (permission: Permission) => void;
  onDelete: (permission: Permission) => void;
  canUpdate: boolean;
  canDelete: boolean;
}

const normalizeLabel = (label: string) =>
  label
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»");

export default function PermissionTable({
  permissions,
  loading = false,
  links = [],
  currentPage = 1,
  onPageChange,
  onEdit,
  onDelete,
  canUpdate,
  canDelete,
}: PermissionTableProps) {
  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading permissions...</div>;
  }

  if (permissions.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No permission found.</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Guard</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[60px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.uuid}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.guard_name}</TableCell>
              <TableCell>{permission.description ?? "-"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {canUpdate && <DropdownMenuItem onClick={() => onEdit(permission)}>Edit</DropdownMenuItem>}
                    {canDelete && <DropdownMenuItem className="text-destructive" onClick={() => onDelete(permission)}>
                      Delete
                    </DropdownMenuItem>}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          {links.map((link, index) => {
            const isDisabled = !link.url || !link.page;

            return (
              <Button
                key={`${link.label}-${index}`}
                type="button"
                size="sm"
                variant={link.active ? "default" : "outline"}
                disabled={isDisabled}
                onClick={() => {
                  if (link.page && onPageChange) onPageChange(link.page);
                }}
              >
                {normalizeLabel(link.label)}
              </Button>
            );
          })}
        </div>
      )}

      {links.length === 0 && (
        <div className="mt-4 text-right text-sm text-muted-foreground">
          Page {currentPage}
        </div>
      )}
    </>
  );
}
