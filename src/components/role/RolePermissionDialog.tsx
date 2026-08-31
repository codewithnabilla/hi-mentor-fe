import { useAllPermissions } from "@/hooks/usePermission";
import { useAssignPermissionsToRole } from "@/hooks/useRole";
import type { Permission } from "@/types/permission.type";
import type { Role } from "@/types/role.type";
import { useEffect, useMemo, useState } from "react";
import AppDialog from "../common/AppDialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface RolePermissionDialogProps {
  open: boolean;
  role?: Role;
  onClose: () => void;
}

export default function RolePermissionDialog({
  open,
  role,
  onClose,
}: RolePermissionDialogProps) {
  const { data, isLoading } = useAllPermissions();
  const assignPermissionsMutation = useAssignPermissionsToRole();

  const permissions = useMemo(() => data?.data ?? data ?? [], [data]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);

  const groupedPermissions = useMemo(() => {
    const actionOrder: Record<string, number> = {
      create: 1,
      update: 2,
      delete: 3,
      view: 4,
      "view-any": 5,
      approve: 6,
      reject: 7,
      restore: 8,
      import: 9,
      export: 10,
      manage: 11,
      list: 12,
    };

    const normalizeAction = (name: string) => {
      const parts = name.toLowerCase().split("-");
      const keywords = [
        "create",
        "update",
        "delete",
        "view",
        "approve",
        "reject",
        "restore",
        "import",
        "export",
        "manage",
        "list",
      ];

      const actionParts: string[] = [];
      const resourceParts: string[] = [];

      parts.forEach((part) => {
        if (keywords.includes(part)) {
          actionParts.push(part);
          return;
        }

        if (part === "any" && actionParts.length > 0) {
          actionParts.push(part);
          return;
        }

        resourceParts.push(part);
      });

      return {
        action: actionParts.join("-") || "other",
        resource: resourceParts.join("-") || "general",
      };
    };

    const byGroup = new Map<string, Map<string, Permission>>();
    const actionSet = new Set<string>();

    permissions.forEach((permission: Permission) => {
      const { action, resource } = normalizeAction(permission.name);
      actionSet.add(action);

      if (!byGroup.has(resource)) {
        byGroup.set(resource, new Map());
      }

      byGroup.get(resource)?.set(action, permission);
    });

    const columns = Array.from(actionSet).sort((a, b) => {
      const aScore = actionOrder[a] ?? 999;
      const bScore = actionOrder[b] ?? 999;
      return aScore - bScore || a.localeCompare(b);
    });

    const rows = Array.from(byGroup.entries()).map(([resource, actions]) => ({
      resource,
      label: resource
        .split("-")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" "),
      actions,
    }));

    return { columns, rows };
  }, [permissions]);

  useEffect(() => {
    if (!open || !role) return;

    const currentIds = (role.permissions ?? []).map((permission) => permission.uuid);
    setSelectedPermissionIds(currentIds);
  }, [open, role]);

  const togglePermission = (permissionId: string) => {
    setSelectedPermissionIds((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async () => {
    if (!role) return;

    try {
      await assignPermissionsMutation.mutateAsync({
        roleUuid: role.uuid,
        permissionIds: selectedPermissionIds,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setSelectedPermissionIds([]);
    onClose();
  };

  return (
    <AppDialog open={open} onClose={handleClose} title={role ? `Assign Permission to ${role.name}` : "Assign Permission"}>
      <div className="space-y-4">
        <div className="max-h-[480px] overflow-auto rounded-md border">
          {isLoading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading permissions...</div>
          ) : permissions.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">No permissions found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[160px]">Module</TableHead>
                  {groupedPermissions.columns.map((column) => (
                    <TableHead key={column} className="min-w-[120px] text-center uppercase">
                      {column.replace(/-/g, " ")}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {groupedPermissions.rows.map((row) => (
                  <TableRow key={row.resource}>
                    <TableCell className="font-medium">{row.label}</TableCell>

                    {groupedPermissions.columns.map((column) => {
                      const permission = row.actions.get(column);
                      const checked = permission ? selectedPermissionIds.includes(permission.uuid) : false;

                      return (
                        <TableCell key={`${row.resource}-${column}`} className="text-center">
                          {permission ? (
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => togglePermission(permission.uuid)}
                            />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={assignPermissionsMutation.isPending} type="button">
            {assignPermissionsMutation.isPending ? "Saving..." : "Save Permissions"}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
