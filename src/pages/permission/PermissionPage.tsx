import AppLayout from "@/components/layout/AppLayout";
import PermissionForm from "@/components/permission/PermissionForm";
import PermissionTable from "@/components/permission/PermissionTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeletePermission, usePermissions } from "@/hooks/usePermission";
import type { Permission } from "@/types/permission.type";
import { useState } from "react";

export default function PermissionPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePermissions(page);
  const deletePermission = useDeletePermission();

  const [open, setOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>();

  const handleCreate = () => {
    setSelectedPermission(undefined);
    setOpen(true);
  };

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setOpen(true);
  };

  const handleDelete = (permission: Permission) => {
    if (confirm(`Delete "${permission.name}"?`)) {
      deletePermission.mutate(permission.uuid);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPermission(undefined);
  };

  const handlePageChange = (nextPage: number) => {
    if (!nextPage || nextPage < 1) return;
    setPage(nextPage);
  };

  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Permission Management</CardTitle>

          <Button onClick={handleCreate}>Add Permission</Button>
        </CardHeader>

        <CardContent>
          <PermissionTable
            permissions={data?.data ?? []}
            links={data?.meta?.links ?? []}
            currentPage={data?.meta?.current_page ?? page}
            onPageChange={handlePageChange}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <PermissionForm open={open} onClose={handleClose} permission={selectedPermission} />
    </AppLayout>
  );
}
