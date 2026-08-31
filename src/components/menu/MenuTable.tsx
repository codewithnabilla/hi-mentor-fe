import type { Menu } from "@/types/menu.type";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CornerDownRight, MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";

interface MenuRowProps {
  menu: Menu
  level: number
  canUpdate: boolean
  canDelete: boolean
  onEdit: (menu: Menu) => void
  onDelete: (menu: Menu) => void
}

interface MenuTableProps {
  menus: Menu[];
  loading?: boolean;
  onEdit: (menu: Menu) => void;
  onDelete: (menu: Menu) => void;
  canUpdate: boolean;
  canDelete: boolean;
}

function MenuRow({
  menu,
  level,
  onEdit,
  onDelete,
  canUpdate,
  canDelete,
}: MenuRowProps) {
  return (
    <>
      <TableRow>
        <TableCell>
          <div
            className="flex items-center"
            style={{
              paddingLeft: `${level * 24}px`,
            }}
          >
            {level > 0 && (
              <CornerDownRight
                className="mr-2 h-4 w-4 text-muted-foreground"
              />
            )}

            {menu.name}

          </div>
        </TableCell>
        <TableCell>{menu.route}</TableCell>

        <TableCell>{menu.permission ?? "-"}</TableCell>

        <TableCell>{menu.order}</TableCell>

        <TableCell>
          <Badge
            variant={menu.is_active ? "default" : "secondary"}
          >
            {menu.is_active ? "Active" : "Inactive"}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {canUpdate && <DropdownMenuItem
                onClick={() => onEdit(menu)}
              >
                Edit
              </DropdownMenuItem>}

              {canDelete && <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(menu)}
              >
                Delete
              </DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {menu.children?.map((child) => (
        <MenuRow
          key={child.uuid}
          menu={child}
          level={level + 1}
          onEdit={onEdit}
          onDelete={onDelete}
          canUpdate={canUpdate}
          canDelete={canDelete}
        />
      ))}
    </>
  )
}


export default function MenuTable({
  menus,
  loading = false,
  onEdit,
  onDelete,
  canUpdate,
  canDelete,
}: MenuTableProps) {
  if (loading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Loading menus...
      </div>
    )
  }

  if (menus.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No menu found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[280px]">
            Menu
          </TableHead>

          <TableHead>Route</TableHead>

          <TableHead>Permission</TableHead>

          <TableHead className="w-[80px]">
            Order
          </TableHead>

          <TableHead className="w-[120px]">
            Status
          </TableHead>

          <TableHead className="w-[60px]" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {menus.map((menu) => (
          <MenuRow
            key={menu.uuid}
            menu={menu}
            level={0}
            onEdit={onEdit}
            onDelete={onDelete}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}