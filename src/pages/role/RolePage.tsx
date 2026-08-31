import AppLayout from "@/components/layout/AppLayout";
import SearchBar from "@/components/common/SearchBar";
import RoleForm from "@/components/role/RoleForm";
import RolePermissionDialog from "@/components/role/RolePermissionDialog";
import RoleTable from "@/components/role/RoleTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteRole, useRoles } from "@/hooks/useRole";
import { useCan, useCanAny } from "@/hooks/useAuthorization";
import type { Role } from "@/types/role.type";
import { useState } from "react";

export default function RolePage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useRoles(page, search);
  const deleteRole = useDeleteRole();
  const can = useCan();
  const canAny = useCanAny();

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

  const handlePageChange = (nextPage: number) => {
    if (!nextPage || nextPage < 1) return;
    setPage(nextPage);
  };

  const handleSearch = (nextSearch: string) => {
    setSearch(nextSearch);
    setPage(1);
  };

  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle>Role Management</CardTitle>
          <div className="flex w-full max-w-md items-center gap-3 md:ml-auto">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              placeholder="Search role..."
            />
            {can("create-role") && <Button onClick={handleCreate}>Add Role</Button>}
          </div>
        </CardHeader>

        <CardContent>
          <RoleTable
            roles={data?.data ?? []}
            links={data?.meta?.links ?? []}
            currentPage={data?.meta?.current_page ?? page}
            onPageChange={handlePageChange}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAssignPermissions={handleAssignPermissions}
            canUpdate={can("update-role")}
            canDelete={can("delete-role")}
            canAssignPermissions={canAny("manage-role", "update-role")}
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
