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

      if (parts[0] === "view" && parts[1] === "menu") {
        const menuResource = parts.slice(2).join("-");

        return {
          action: "view",
          resource: menuResource ? `menu-${menuResource}` : "menu",
        };
      }

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

    permissions.forEach((permission: Permission) => {
      const { action, resource } = normalizeAction(permission.name);

      if (!byGroup.has(resource)) {
        byGroup.set(resource, new Map());
      }

      byGroup.get(resource)?.set(action, permission);
    });

    const columns = ["create", "update", "delete", "view", "view-any"];

    const rows = Array.from(byGroup.entries()).map(([resource, actions]) => ({
      resource,
      label: resource.startsWith("menu-")
        ? `${resource
            .slice("menu-".length)
            .split("-")
            .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join(" ")} (Menu)`
        : resource
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
    <AppDialog
      open={open}
      onClose={handleClose}
      title={role ? `Assign Permission to ${role.name}` : "Assign Permission"}
      className="sm:max-w-5xl"
    >
      <div className="space-y-4">
        <div className="max-h-[min(65vh,640px)] overflow-auto rounded-md border">
          {isLoading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading permissions...</div>
          ) : permissions.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">No permissions found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                    <TableHead className="sticky left-0 top-0 z-40 min-w-[200px] border-r bg-popover">
                      Module
                    </TableHead>
                  {groupedPermissions.columns.map((column) => (
                    <TableHead key={column} className="sticky top-0 z-30 min-w-[120px] bg-popover text-center uppercase">
                      {column.replace(/-/g, " ")}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {groupedPermissions.rows.map((row) => (
                  <TableRow key={row.resource}>
                    <TableCell className="sticky left-0 z-20 border-r bg-popover font-medium">
                      {row.label}
                    </TableCell>

                    {groupedPermissions.columns.map((column) => {
                      const permission = row.actions.get(column);
                      const checked = permission ? selectedPermissionIds.includes(permission.uuid) : false;

                      return (
                        <TableCell key={`${row.resource}-${column}`} className="text-center">
                          {permission ? (
                            <Checkbox
                              className="mx-auto"
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
