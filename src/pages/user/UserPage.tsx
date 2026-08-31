import AppLayout from "@/components/layout/AppLayout";
import SearchBar from "@/components/common/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserForm from "@/components/user/UserForm";
import UserTable from "@/components/user/UserTable";
import { useDeleteUser, useUsers } from "@/hooks/useUser";
import { useCan } from "@/hooks/useAuthorization";
import type { User } from "@/types/user.type";
import { useState } from "react";

export default function UserPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useUsers(page, search);
  const deleteUser = useDeleteUser();
  const can = useCan();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  // const handleCreate = () => {
  //   setSelectedUser(undefined);
  //   setOpen(true);
  // };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDelete = (user: User) => {
    if (confirm(`Delete "${user.name}"?`)) {
      deleteUser.mutate(user.uuid);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(undefined);
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
          <CardTitle>User Management</CardTitle>

          <div className="flex w-full max-w-md items-center md:ml-auto">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              placeholder="Search user..."
            />
          </div>
        </CardHeader>

        <CardContent>
          <UserTable
            users={data?.data ?? []}
            links={data?.meta?.links ?? []}
            currentPage={data?.meta?.current_page ?? page}
            onPageChange={handlePageChange}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canUpdate={can("update-user")}
            canDelete={can("delete-user")}
          />
        </CardContent>
      </Card>

      <UserForm open={open} onClose={handleClose} user={selectedUser} />
    </AppLayout>
  );
}
