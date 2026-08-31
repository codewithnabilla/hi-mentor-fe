import AppLayout from "@/components/layout/AppLayout";
import RoleForm from "@/components/role/RoleForm";
import RolePermissionDialog from "@/components/role/RolePermissionDialog";
import RoleTable from "@/components/role/RoleTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteRole, useRoles } from "@/hooks/useRole";
import type { Role } from "@/types/role.type";
import { useState } from "react";

export default function RolePage() {
  const { data, isLoading } = useRoles();
  const deleteRole = useDeleteRole();

  const [open, setOpen] = useState(false);
  const [openPermissionDialog, setOpenPermissionDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  const handleCreate = () => {
    setSelectedRole(undefined);
    setOpen(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setOpen(true);
  };

  const handleDelete = (role: Role) => {
    if (confirm(`Delete "${role.name}"?`)) {
      deleteRole.mutate(role.uuid);
    }
  };

  const handleAssignPermissions = (role: Role) => {
    setSelectedRole(role);
    setOpenPermissionDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRole(undefined);
  };

  const handlePermissionDialogClose = () => {
    setOpenPermissionDialog(false);
    setSelectedRole(undefined);
  };

  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Role Management</CardTitle>
          <Button onClick={handleCreate}>Add Role</Button>
        </CardHeader>

        <CardContent>
          <RoleTable
            roles={data?.data ?? []}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAssignPermissions={handleAssignPermissions}
          />
        </CardContent>
      </Card>

      <RoleForm open={open} onClose={handleClose} role={selectedRole} />
      <RolePermissionDialog
        open={openPermissionDialog}
        role={selectedRole}
        onClose={handlePermissionDialogClose}
      />
    </AppLayout>
  );
}
