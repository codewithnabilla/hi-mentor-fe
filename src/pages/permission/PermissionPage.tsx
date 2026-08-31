import AppLayout from "@/components/layout/AppLayout";
import SearchBar from "@/components/common/SearchBar";
import PermissionForm from "@/components/permission/PermissionForm";
import PermissionTable from "@/components/permission/PermissionTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeletePermission, usePermissions } from "@/hooks/usePermission";
import { useCan } from "@/hooks/useAuthorization";
import type { Permission } from "@/types/permission.type";
import { useState } from "react";

export default function PermissionPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = usePermissions(page, search);
  const deletePermission = useDeletePermission();
  const can = useCan();

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

  const handleSearch = (nextSearch: string) => {
    setSearch(nextSearch);
    setPage(1);
  };

  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle>Permission Management</CardTitle>

          <div className="flex w-full max-w-md items-center gap-3 md:ml-auto">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              placeholder="Search permission..."
            />
            {can("create-permission") && <Button onClick={handleCreate}>Add Permission</Button>}
          </div>
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
            canUpdate={can("update-permission")}
            canDelete={can("delete-permission")}
          />
        </CardContent>
      </Card>

      <PermissionForm open={open} onClose={handleClose} permission={selectedPermission} />
    </AppLayout>
  );
}
