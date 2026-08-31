import AppLayout from "@/components/layout/AppLayout";
import MenuForm from "@/components/menu/MenuForm";
import MenuTable from "@/components/menu/MenuTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteMenu, useMenus } from "@/hooks/useMenu";
import { useCan } from "@/hooks/useAuthorization";
import type { Menu } from "@/types/menu.type";
import { useState } from "react";

export default function MenuPage() {
  const { data, isLoading } = useMenus()
  const deleteMenu = useDeleteMenu()
  const can = useCan();

  const [open, setOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Menu | undefined>()

  const handleCreate = () => {
    setSelectedMenu(undefined)
    setOpen(true)
  }

  const handleEdit = (menu: Menu) => {
    setSelectedMenu(menu);
    setOpen(true);
  };

  const handleDelete = (menu: Menu) => {
    if (confirm(`Delete "${menu.name}"?`)) {
      deleteMenu.mutate(menu.uuid);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMenu(undefined);
  };


  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Menu Management</CardTitle>

          {can("create-menu") && <Button onClick={handleCreate}>Add Menu</Button>}
        </CardHeader>

        <CardContent>
          <MenuTable
            menus={data?.data ?? []}
            loading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canUpdate={can("update-menu")}
            canDelete={can("delete-menu")}
          />
        </CardContent>
      </Card>
      <MenuForm
        open={open}
        onClose={handleClose}
        menu={selectedMenu}
        menus={data?.data ?? []}
      />
    </AppLayout>
  );
}