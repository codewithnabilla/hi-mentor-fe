import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import UserForm from "@/components/user/UserForm";
import UserTable from "@/components/user/UserTable";
import { useDeleteUser, useUsers } from "@/hooks/useUser";
import type { User } from "@/types/user.type";
import { useState } from "react";

export default function UserPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUsers(page);
  const deleteUser = useDeleteUser();

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

  return (
    <AppLayout>
      <Card>
        {/* <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Permission Management</CardTitle>

          <Button onClick={handleCreate}>Add Permission</Button>
        </CardHeader> */}

        <CardContent>
          <UserTable
            users={data?.data ?? []}
            links={data?.meta?.links ?? []}
            currentPage={data?.meta?.current_page ?? page}
            onPageChange={handlePageChange}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <UserForm open={open} onClose={handleClose} user={selectedUser} />
    </AppLayout>
  );
}
